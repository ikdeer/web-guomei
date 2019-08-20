<template>
    <div class="userlist">
        <h3>用户列表</h3>
        <div class="content">
            <div class="user_list_form">
                <el-form :inline="true">
                    <el-form-item label="手机号">
                        <el-input :maxlength="11" size="small"  v-model="formData.tel" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input :maxlength="20" size="small" v-model="formData.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="账号状态">
                        <el-select v-model="formData.status" size="small" placeholder="请选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未开始" value="1"></el-option>
                            <el-option label="进行中" value="2"></el-option>
                            <el-option label="已结束" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间" class="time_right">
                        <el-date-picker
                            size="small"
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="user_list_btn">
                    <div>
                        <el-button type="primary" size="small" @click="adduser">创建用户</el-button>
                    </div>
                    <div>
                        <el-button type="primary" size="small" @click="search">查询</el-button>
                        <el-button size="small" @click="reset">清空</el-button>
                    </div>
                </div>
            </div>
            <div class="user_list_table">
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
                            <el-button type="text" @click="see(scope.row)">查看</el-button>
                            <el-button type="text" style="color: #E56565;" @click="down(scope.row)">停用</el-button>
                            <el-button type="text" style="color: #67C23A;" @click="on(scope.row)">启用</el-button>
                            <el-button type="text" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "userList",
        data() {
            return {
                formData:{
                    tel:'',
                    email:'',
                    status:'',
                    dataTime:''
                },
                tableData:[],
                page:{
                    currentPage:1
                }
            }
        },
        methods: {
            adduser(){

            },
            search(){

            },
            reset(){

            },
            see(row){

            },
            down(row){

            },
            on(row){

            },
            remove(row){

            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            }
        },
    }
</script>

<style lang="scss" scoped>
.userlist{
    h3{
        width:80px;
        height:20px;
        font-size:20px;
        font-family:PingFangSC;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:20px;
    }
    .content{
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
        border-radius:10px;
        padding: 30px;
        box-sizing: border-box;
        .user_list_form{
            position: relative;
            .el-form{
                border-bottom: 1px solid #eeeeee;
                .el-form-item__label{
                    color: #666666;
                }
                .time_right{
                    position: absolute;
                    margin-right: 0;
                    right: 0;
                }
            }
        }
        .user_list_btn{
            height: 80px;
            line-height: 80px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
        }



    }
}
</style>