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
                        <el-input :maxlength="20" :disabled="userInfo.groupID==20" v-model="formData.username" placeholder="请输入操作人"></el-input>
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
                <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
                    <el-table-column align="center" label="用户名">
                      <template slot-scope="scope">
                          <span>{{scope.row.username}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column  align="center" label="操作记录">
                      <template slot-scope="scope">
                        <span>{{scope.row.txt}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作时间">
                      <template slot-scope="scope">
                        <span>{{scope.row.createTime}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="访问IP">
                      <template slot-scope="scope">
                        <span>{{scope.row.ip}}</span>
                      </template>
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
                    username:'',
                    ip:'',
                    dataTime:null,
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
                },
                userInfo:{
                    userName:'',//用户姓名
                    userImg:'',//用户头头像
                    uid:'',//用户ID
                    groupID:'',//用户身份
                },
            }
        },
        methods:{
            search(page){
                if(page==1){
                    this.page.page = 1;
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
                this.page.page = 1;
                this.search()
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search()
            },
        },
        mounted(){
            this.userInfo = JSON.parse(this.Cookies.get('userInfo'));
            if(this.userInfo.groupID==20){
                this.formData.username = this.userInfo.userName;
            }
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
