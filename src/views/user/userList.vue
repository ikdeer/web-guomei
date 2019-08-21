<template>
    <div class="userlist">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
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

        <el-dialog
            title="提示"
            class="user_list_add_dialog"
            :visible.sync="userListAddDialog"
            width="30%"
            :before-close="handleClose">
            <el-form :model="dateDialogForm" ref="dateDialogForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" required>
                    <el-input type="phone" size="small" v-model="dateDialogForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号"
                    prop="phone"
                    required
                    :rules="[
                        {pattern:/^(13|14|15|16|17|18|19)\d{9}$/,message:'请输入正确的手机号码',trigger: 'change'}
                    ]">
                    <el-input type="phone" size="small" :maxlength="11" v-model.number="dateDialogForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" required>
                    <el-input type="phone" size="small" v-model="dateDialogForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设置密码" required>
                    <el-input type="phone" size="small" :maxlength="20" v-model="dateDialogForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" required>
                    <el-input type="phone" size="small" :maxlength="20" v-model="dateDialogForm.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userListAddDialog = false">取 消</el-button>
                <el-button type="primary" @click="userListAddDialog = false">确 定</el-button>
            </span>
        </el-dialog>

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
                },
                userListAddDialog:false,
                dateDialogForm:{

                }
            }
        },
        methods: {
            adduser(){
                this.userListAddDialog = true;
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
    .overIew-nav{
        width: 100%;
        height: 70px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        border-bottom: 1px dashed #979797;
        .el-breadcrumb{
            font-size: 20px;
        }
        .el-breadcrumb__inner{
            color: #333333;
        }
    }
    h3{
        color: #333333;
        font-weight: 600;
        font-size: 16px;
        margin: 0;
        padding: 0;
        height: 50px;
        line-height: 50px;
    }
    /*h3{
        width:80px;
        height:20px;
        font-size:20px;
        font-family:PingFangSC;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:20px;
    }*/
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


.user_list_add_dialog{
    .el-form{
        padding: 0 30px;
    }
}
</style>