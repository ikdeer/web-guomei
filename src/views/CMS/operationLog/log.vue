<template>
    <div class="log">
        <!-- 面包屑导航栏 -->
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
        <h3>日志信息</h3>
        <div class="log_content">
            <div class="log_form">
                <el-form :inline="true">
                    <el-form-item label="操作人">
                        <el-input :maxlength="20" v-model="formData.user" placeholder="请输入操作人"></el-input>
                    </el-form-item>
                    <el-form-item label="IP">
                        <el-input :maxlength="20" v-model="formData.ip" placeholder="请输入IP"></el-input>
                    </el-form-item>
                    <el-form-item label="操作时间">
                        <el-date-picker
                            class="user_list_form_time"
                            v-model="formData.dataTime"
                            :picker-options="pickerOptions"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search(1)">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="log_table">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    tooltip-effect="dark">
                    <el-table-column
                        prop="name"
                        align="center"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        prop="createBy"
                        align="center"
                        label="操作记录">
                    </el-table-column>
                    <el-table-column
                        prop="lastModifyTime"
                        align="center"
                        label="操作时间">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        align="center"
                        label="访问IP">
                    </el-table-column>
                </el-table>
            </div>
            <div class="log_footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.page"
                    :page-sizes="[10, 20, 30, 50, 100]"
                    :page-size="page.pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import {formatTimes} from '@/lib/utils'
    import { getLogList } from '@/HttpApi/log/log'
    export default {
        name: "log",
        data(){
            return {
                formData:{
                    user:'',
                    ip:'',
                    dataTime:[formatTimes(new Date(),true)+' 00:00:00',formatTimes(new Date(),true)+' 23:59:59'],
                },
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 1);
                                end = new Date(new Date(end).getTime() - 3600 * 1000 * 24 * 1);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '近7天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 7);
                                end = new Date(new Date(end));
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '近30天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 30);
                                end = new Date(new Date(end));
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                tableData:[],
                page:{
                    page:1,
                    pageSize:10,
                    total:0
                }
            }
        },
        methods:{
            search(page){
                if(page==1){
                    this.page = {
                        page: 1,
                        pageSize: 10,
                        total: 0
                    }
                }
                let params = {
                    ...this.formData,...this.page,
                    createTimeStart:this.formData.dataTime?this.formData.dataTime[0]:'',
                    createTimeEnd:this.formData.dataTime?this.formData.dataTime[1]:'',
                };
                getLogList(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.tableData = data.data?data.data.list:[];
                        this.page.total = data.pagerManager?data.pagerManager.totalResults:0;
                    }else{
                        this.tableData =[];
                        this.page.total = 0;
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search()
            },
        },
        mounted(){
            this.search()
        }
    }
</script>

<style lang="scss" scoped>
    .log{
        font-size: 0.16rem;
        .log_content{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding: 30px;
            box-sizing: border-box;


            .log_footer{
                margin-top: 10px;
                text-align: right;
            }

        }
    }
</style>
