<template>
    <div class="application_detail">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>应用详情</h3>
        <div class="application_detail_top">
            <div class="application_detail_top_listone" v-for="item in InfoOne">
                <div>{{item.title}}</div>
                <div>{{item.content}}</div>
            </div>
            <div class="application_detail_top_listtwo" v-for="item in InfoTwo">
                <div>{{item.title}}</div>
                <div>{{item.content}}</div>
            </div>
            <div style="clear: both"></div>
        </div>
        <h3>API列表</h3>
        <div class="application_detail_content">
            <div class="application_list_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="username"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="telphone"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="email"
                        label="邮箱">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createTime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updateTime"
                        label="最近一次登录">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="status"
                        label="账号状态">
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="down(scope.row)">停用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="application_list_footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page.pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
        </div>
        <h3>应用描述</h3>
        <div class="application_detail_button">
            测试应用测试应用测试应用测试应用测试应用测试应用测试应用测试应用
        </div>
    </div>
</template>

<script>
    export default {
        name: "applicationDetail",
        data(){
            return{
                InfoOne:[{
                    title:'应用名称',
                    content:'人脸检测测试'
                },{
                    title:'应用类型',
                    content:'人脸考勤'
                },{
                    title:'AppID',
                    content:'15742488'
                },{
                    title:'API Key',
                    content:'LbMWyASnkAorE0jNuv2G'
                },{
                    title:'Secret Key',
                    content:'5fQEelBmRVRyDw9Ua45L'
                }],
                InfoTwo:[{
                    title:'应用状态',
                    content:'启用'
                },{
                    title:'审核状态',
                    content:'审核通过'
                },{
                    title:'创建时间',
                    content:'2019-07-09 11:20:35'
                },{
                    title:'修改时间',
                    content:'2019-07-09 11:20:35'
                },{
                    title:'QPS限制',
                    content:'10'
                },{
                    title:'创建人',
                    content:'admin'
                }],
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
            down(){

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
    .application_detail {
        font-size: 0.16rem;
        .application_detail_top {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;
            .application_detail_top_listone{
                width: 20%;
                float: left;
                text-align: center;
                color: #666666;
                div{
                    height: .5rem;
                    line-height: .5rem;
                    box-sizing: border-box;
                    &:nth-child(1){
                        background: #F1F1F1;
                        border-right: 1px solid white;
                    }
                }
            }
            .application_detail_top_listtwo{
                width: 16.666666%;
                float: left;
                text-align: center;
                color: #666666;
                div{
                    height: .5rem;
                    line-height: .5rem;
                    box-sizing: border-box;
                    &:nth-child(1){
                        background: #F1F1F1;
                        border-right: 1px solid white;
                    }
                }
            }
        }
        .application_detail_content{
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;
            .application_list_table{
                width: 100%;
            }
            .application_list_footer{
                margin-top: 10px;
                text-align: right;
            }
        }
        .application_detail_button{
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;
        }
    }
</style>