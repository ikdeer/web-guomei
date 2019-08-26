<template>
    <div class="facelist">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <div class="face_top">
            <h3>人脸分组列表</h3>
            <el-button type="primary" @click="updateFace">上传人脸图片</el-button>
        </div>
        <div class="content">
            <div class="face_list_form">
                <el-form :inline="true">
                    <el-form-item label="人脸分组名称">
                        <el-input :maxlength="11" v-model="formData.name" placeholder="请输入人脸分组名称"></el-input>
                    </el-form-item>
                    <el-form-item label="人脸分组ID">
                        <el-input :maxlength="20" v-model="formData.id" placeholder="请输入人脸分组ID"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input :maxlength="20" v-model="formData.user" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            class="user_list_form_time"
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="face_list_btn">
                    <div>
                        <el-button type="primary" @click="addGroup">创建分组</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">清空</el-button>
                    </div>
                </div>
            </div>
            <div class="face_list_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="username"
                        label="人脸分组名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="telphone"
                        label="人脸分组ID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="email"
                        label=" 创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createTime"
                        label="修改时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updateTime"
                        label="创建人">
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="see(scope.row)">查看</el-button>
                            <el-button type="text" @click="editGroup(scope.row)">修改分组</el-button>
                            <el-button type="text" @click="addFace(scope.row)">添加人像</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <el-dialog
            title="提示"
            class="user_list_add_dialog"
            :visible.sync="userListAddDialog"
            width="80%">
            <el-form :model="dataDialogForm"  :rules="addDialogRules" ref="dataDialogForm" label-width="80px">
                <el-form-item label="用户名" prop="username" required>
                    <el-input type="phone" v-model="dataDialogForm.username" :maxlength="20" placeholder="请输入用户名(6-20位字母数字)" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号" prop="phone" required>
                    <el-input type="phone" :maxlength="11" v-model.number="dataDialogForm.phone" placeholder="请输入手机号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" required>
                    <el-input type="phone" v-model="dataDialogForm.email" placeholder="请输入邮箱（XXX@XXXX）" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设置密码" prop="passwordstart" required>
                    <el-input type="phone" :maxlength="16" v-model="dataDialogForm.passwordstart" show-password placeholder="请设置登录密码（8-16位字母和数字）" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordend" required>
                    <el-input type="phone" :maxlength="16" v-model="dataDialogForm.passwordend" show-password placeholder="请确认登录密码" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
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
                    name:'',
                    id:'',
                    user:'',
                    dataTime:''
                },
                tableData:[{}],
            }
        },
        methods: {
            updateFace(){

            },
            addGroup(){

            },
            search(){

            },
            reset(){
                this.formData = {
                    tel:'',
                    email:'',
                    status:'',
                    dataTime:''
                };
                this.search();
            },
            see(){

            },
            editGroup(){

            },
            addFace(){

            }
        },
    }
</script>

<style lang="scss" scoped>
    .facelist{
        font-size: .16rem;
        .face_top{
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px;
        }
        .content{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding: 30px;
            box-sizing: border-box;
            .face_list_form{
                position: relative;
                .el-form{
                    border-bottom: 1px solid #eeeeee;
                    .el-form-item__label{
                        color: #666666;
                    }
                    .user_list_form_status{
                        width: 120px;
                    }
                    .user_list_form_time{
                        width: 300px;
                    }
                }
            }
            .face_list_btn{
                height: 50px;
                line-height: 50px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
            }
        }
    }
</style>
