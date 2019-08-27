<template>
    <div class="userInfo">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>用户基本信息</h3>
        <div class="info">
            <div class="info_title">
                <img src="/static/images/touxiang.jpeg" alt="">
                <div>你好<br/>欢迎使用国美人脸认证开放平台</div>
            </div>
            <div class="info_list">&emsp;用户名：{{info.name}}</div>
            <div class="info_list">手机绑定：
                <div class="info_list_inp">
                    <span v-if="info.phoneStatus">{{info.phoneNum}}</span>
                    <el-button v-if="info.phoneStatus" type="text" @click="info.phoneStatus = false" style="margin-left: 15px">编辑</el-button>
                    <el-input v-if="!info.phoneStatus" v-model="input" :maxlength="11" placeholder="请输入内容"></el-input>
                </div>
                <div class="info_list_btn" v-if="!info.phoneStatus">
                    <el-button type="primary" @click="info.phoneStatus = true">确定</el-button>
                    <el-button @click="info.phoneStatus = true">取消</el-button>
                </div>
            </div>
            <div class="info_list">邮箱绑定：
                <div class="info_list_inp">
                    <span v-if="info.emailStatus">{{info.mail}}</span>
                    <el-button v-if="info.emailStatus" type="text" @click="info.emailStatus = false" style="margin-left: 15px">编辑</el-button>
                    <el-input v-if="!info.emailStatus" v-model="input" :maxlength="11" placeholder="请输入内容"></el-input>
                </div>
                <div class="info_list_btn" v-if="!info.emailStatus">
                    <el-button type="primary" @click="info.emailStatus = true">确定</el-button>
                    <el-button @click="info.emailStatus = true">取消</el-button>
                </div>
            </div>
            <div class="info_list">账号状态：{{info.status | status }}</div>
        </div>
        <h3>联系人</h3>
        <div class="user_table">
            <div class="user_table_btn">
                <el-button type="primary" size="small" @click="adduser"> 新增 </el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="phoneNum"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="mail"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="edit(scope.row)">修改</el-button>
                        <el-button type="text" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <el-dialog
            :title="dataDialogForm.isEdit?'编辑联系人':'新增联系人'"
            class="user_info_add_dialog"
            :visible.sync="userInfoAddDialog"
            width="30%">
            <el-form :model="dataDialogForm" :rules="adduserDialogRules" ref="dataDialogForm" label-width="80px">
                <el-form-item label="姓名" prop="name" required>
                    <el-input type="phone" v-model="dataDialogForm.name" placeholder="请输入姓名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号" prop="phone" required>
                    <el-input type="phone" :maxlength="11" v-model.number="dataDialogForm.phone" placeholder="请输入手机号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" required>
                    <el-input type="phone" v-model="dataDialogForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="addContact">确 定</el-button>
                <el-button @click="userInfoAddDialog = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {formatTimes} from '@/lib/utils'
    import {userDetail,userContactList,delContactInfo,addUserContact,editUserContact,editUserInfo} from '@/HttpApi/user/user';
    export default {
        name: "userInfo",
        data(){
            let name = (rule, value, callback) => {
                if(value){
                    /* if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)){
                         return callback(new Error('请输入6-20位字母数字'));
                     }else{*/
                    return callback()
                    // }
                }else{
                    return callback(new Error('请输入姓名'))
                }
            };
            let phone = (rule, value, callback) => {
                if(value){
                    if(!/^(13|14|15|16|17|18|19)\d{9}$/.test(value)){
                        return callback(new Error('手机号错误，请输入11位手机号'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请输入手机号'))
                }
            };
            let email = (rule, value, callback) => {
                if(value){
                    if(!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)){
                        console.log(value)
                        return callback(new Error('邮箱格式错误'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请输入邮箱'))
                }
            };

            return {
                formatTimes:formatTimes,
                id:'',
                input:'15738668129',
                info:{
                    name:'',
                    phoneNum:'',
                    phoneStatus:true,
                    mail:'',
                    emailStatus:true,
                    status:1,
                },
                tableData:[],
                userInfoAddDialog:false,
                dataDialogForm:{
                    name:'',
                    phone:'',
                    email:'',
                    id:'',
                    isEdit:false
                },
                adduserDialogRules:{
                    name:[
                        {validator:name,trigger:['blur','change']}
                    ],
                    phone:[
                        {validator:phone,trigger:['blur','change']}
                    ],
                    email:[
                        {validator:email,trigger:['blur','change']}
                    ],
                }
            }
        },
        methods:{
            edit(row){
                this.dataDialogForm={
                    name:row.name,
                    phone:row.phoneNum,
                    email:row.mail,
                    id:row.id,
                    isEdit:true,
                };
                this.userInfoAddDialog = true;
            },
            remove(row){
                delContactInfo({id:row.id}).then(({data})=>{
                    if(data.success){
                        this.$message.success('删除成功');
                        this.getContactList()
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            adduser(){
                this.dataDialogForm={
                    name:'',
                    phone:'',
                    email:'',
                    id:this.id,
                    isEdit:false,
                };
                this.userInfoAddDialog = true;
            },
            addContact(){
                this.$refs['dataDialogForm'].validate((valid) => {
                    if (valid) {
                        let params = {
                            id:this.dataDialogForm.id,
                            name:this.dataDialogForm.name,
                            mail:this.dataDialogForm.email,
                            phoneNum:this.dataDialogForm.phone,
                        };
                        if(this.dataDialogForm.isEdit){
                            //编辑联系人
                            editUserContact(params).then(({data})=>{
                                if(data.success){
                                    this.$message.success('编辑成功');
                                    this.getContactList();
                                    this.userInfoAddDialog = false;
                                }else{
                                    this.$message.warning(data.errorInfo)
                                }
                            })
                        }else{
                            //新增联系人
                            addUserContact(params).then(({data})=>{
                                if(data.success){
                                    this.$message.success('添加成功');
                                    this.getContactList();
                                    this.userInfoAddDialog = false;
                                }else{
                                    this.$message.warning(data.errorInfo)
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            getUserDetail(){
                userDetail({id:this.id}).then(({data})=>{
                    if(data.success){
                        this.info.name = data.data.name;
                        this.info.mail = data.data.mail;
                        this.info.phoneNum = data.data.phoneNum;
                        this.info.name = data.data.name;
                        this.info.status = data.data.accountState;
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            getContactList(){
                userContactList({id:this.id}).then(({data})=>{
                    if(data.success){
                        this.tableData = data.data
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            this.getUserDetail();
            this.getContactList();
        },

        filters:{
            status(val){
                if(val==1){
                    return '已启用'
                }
                if(val==2){
                    return '未启用'
                }
                return '没有'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userInfo{
        font-size: 0.16rem;
        .info{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding: 30px;
            box-sizing: border-box;
            .info_title{
                display: flex;
                display: -webkit-flex;
                align-items: center;
                img{
                    width: 60px;
                    height: 60px;
                    margin-right: 15px;
                    display: inline-block;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
            }
            .info_list{
                color: #333333;
                height: 50px;
                line-height: 50px;
                border-bottom:1px solid rgba(238,238,238,1);
                position: relative;
                .info_list_inp{
                    display: inline-block;
                }
                .info_list_btn{
                    margin-left: 15px;
                    display: inline-block;
                }
            }
        }

        .user_table{
            width: 100%;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding:10px 30px 30px 30px;
            box-sizing: border-box;
            .user_table_btn{
                height: 50px;
                line-height: 50px;
                text-align: right;
            }
        }
    }
    .user_info_add_dialog{
        .el-form{
            padding: 0 30px;
        }
    }
</style>
