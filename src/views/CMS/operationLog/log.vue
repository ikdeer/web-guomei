<template>
    <div class="log">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
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
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
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
                        prop="userName"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        prop="logDesc"
                        label="操作记录">
                    </el-table-column>
                    <el-table-column
                        prop="createDate"
                        label="操作时间">
                    </el-table-column>
                    <el-table-column
                        prop="clientIp"
                        label="访问IP">
                    </el-table-column>
                </el-table>
            </div>
            <div class="log_footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
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
    export default {
        name: "log",
        data(){
            return {
                formData:{
                    user:'',
                    ip:'',
                    dataTime:'',
                },
                tableData:[],
                page:{
                    currentPage:1,
                    pageSize:10,
                    total:500
                }
            }
        },
        methods:{
            search(){

            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.currentPage = val;
                this.search()
            },
        },
        mounted(){

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