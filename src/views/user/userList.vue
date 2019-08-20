<template>
    <div class="userlist">
        <h3>用户列表</h3>
        <div class="user_list_form">
            <el-form :inline="true">
                <el-form-item label="手机号">
                    <el-input :maxlength="11" size="small"  v-model="formData.tel" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input :maxlength="20" size="small" v-model="formData.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未开始" value="1"></el-option>
                        <el-option label="进行中" value="2"></el-option>
                        <el-option label="已结束" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div class="user_list_btn">
                <el-button type="primary" @click="adduser">创建用户</el-button>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button class="user_list_btn_right" @click="reset">清空</el-button>
            </div>
        </div>
        <div class="user_list_table">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="username"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="telphone"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="最近一次登录">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="账号状态">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="see(scope.row)">查看</el-button>
                        <el-button type="text" style="color: #E56565;" @click="down(scope.row)">停用</el-button>
                        <el-button type="text" style="color: #67C23A;" @click="on(scope.row)">启用</el-button>
                        <el-button type="text" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
                tableData:[]
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

            }
        },
    }
</script>

<style scoped>

</style>