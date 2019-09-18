<template>
    <div class="userInfo">
      <!-- 面包屑导航栏 -->
      <nav class="nav-Type">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/Index/userList'}">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户基本信息</el-breadcrumb-item>
        </el-breadcrumb>
      </nav>
        <h3>用户基本信息</h3>
        <div class="info">
            <div class="info_title">
                <img src="/static/images/sy_icon_me_64@2x.png" alt="">
                <div>您好<br/>欢迎使用国美人脸认证开放平台</div>
            </div>
            <div class="info_list">&emsp;用户名：{{info.name}}</div>
            <div class="info_list">手机绑定：
                <div class="info_list_inp">
                    <span v-if="info.phoneStatus">{{info.phoneNum}}</span>
                    <el-input v-if="!info.phoneStatus" v-model.number="info.phone" :maxlength="11" placeholder="请输入内容"></el-input>
                </div>
                <div class="info_list_btn">
                    <el-button v-if="info.phoneStatus" type="primary" @click="editPhone">编辑</el-button>
                    <el-button v-if="!info.phoneStatus" type="primary" @click="submitPhone">确定</el-button>
                    <el-button v-if="!info.phoneStatus" @click="info.phoneStatus = true">取消</el-button>
                </div>
            </div>
            <div class="info_list">邮箱绑定：
                <div class="info_list_inp">
                    <span v-if="info.emailStatus">{{info.mail}}</span>
                    <el-input v-if="!info.emailStatus" v-model="info.email" :maxlength="30" placeholder="请输入内容"></el-input>
                </div>
                <div class="info_list_btn">
                    <el-button v-if="info.emailStatus" type="primary" @click="editEmail">编辑</el-button>
                    <el-button v-if="!info.emailStatus" type="primary" @click="submitEmail">确定</el-button>
                    <el-button v-if="!info.emailStatus" @click="info.emailStatus = true">取消</el-button>
                </div>
            </div>
            <div class="info_list">账号状态：{{info.status | status }}</div>
        </div>
        <h3>联系人</h3>
        <div class="user_table">
            <div class="user_table_btn">
                <el-button type="primary" v-if="userInfo.groupID==1 || isActiveUser" size="small" @click="adduser"> 新增 </el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名">
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
            :title="dataDialogForm.isEdit?'修改联系人':'新增联系人'"
            class="user_info_add_dialog"
            :visible.sync="userInfoAddDialog"
            @close="closeDialog"
            width="30%">
            <el-form :model="dataDialogForm" :rules="adduserDialogRules" ref="dataDialogForm" label-width="80px">
                <el-form-item label="姓名" prop="name" required>
                    <el-input type="text" :maxlength="20" v-model="dataDialogForm.name" placeholder="请输入姓名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号" prop="phone" required>
                    <el-input type="tel" :maxlength="11" v-model.number="dataDialogForm.phone" placeholder="请输入手机号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" required>
                    <el-input type="email" v-model="dataDialogForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
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
                        return callback(new Error('手机号不符合规则'));
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
                        return callback(new Error('邮箱格式不符合规则'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请输入邮箱'))
                }
            };

            return {
                id:'',
                info:{
                    name:'',
                    phoneNum:'',
                    phoneStatus:true,
                    phone:'',
                    mail:'',
                    email:'',
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
                },
                userInfo:{
                    userName:'',//用户姓名
                    userImg:'',//用户头头像
                    uid:'',//用户ID
                    groupID:'',//用户身份
                }
            }
        },
        computed:{
            isActiveUser(){
                return this.info.name == this.userInfo.userName ? true : false;
            }
        },
        methods:{
            editPhone(){
                this.info.phone = this.info.phoneNum;
                this.info.phoneStatus = false;
            },
            submitPhone(){
                if(this.info.phone==''){
                    this.$message.warning('请输入手机号！');
                    return;
                }
                if(/^1[3456789]\d{9}$/.test(this.info.phone)){
                    //修改手机号
                    editUserInfo({
                        id:this.id,
                        phoneNum:this.info.phone
                    }).then(({data})=>{
                        if(data.errorCode ==200){
                            this.getUserDetail();
                            this.$message.success('修改成功');
                            this.info.phoneStatus = true;
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }else{
                    this.$message.warning('手机号不符合规则！');
                }
            },
            editEmail(){
                this.info.email = this.info.mail;
                this.info.emailStatus = false;
            },
            submitEmail(){
                if(this.info.email==''){
                    this.$message.warning('请输入邮箱！');
                    return;
                }
                if(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.info.email)){
                    //修改邮箱
                    editUserInfo({
                        id:this.id,
                        mail:this.info.email
                    }).then(({data})=>{
                        if(data.errorCode ==200){
                            this.getUserDetail();
                            this.$message.success('修改成功');
                            this.info.emailStatus = true;
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }else{
                    this.$message.warning('邮箱格式不符合规则！');
                }
            },
            closeDialog(){
                this.dataDialogForm = {
                    name: '',
                    phone: '',
                    email: '',
                    id: '',
                    isEdit: false,
                };
                this.$refs['dataDialogForm'].clearValidate();
            },
            edit(row){
                this.dataDialogForm = {
                    name:row.name,
                    phone:row.phoneNum,
                    email:row.mail,
                    id:row.id,
                    isEdit:true
                };
                this.userInfoAddDialog = true;
            },
            remove(row){
                this.$confirm('此操作将删除该联系人, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    delContactInfo({id:row.id}).then(({data})=>{
                        if(data.errorCode ==200){
                            this.$message.success('删除成功');
                            this.getContactList()
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }).catch(() => {});
            },
            adduser(){
                this.userInfoAddDialog = true;
            },
            addContact(){
                this.$refs['dataDialogForm'].validate((valid) => {
                    if (valid) {
                        let params = {
                            id:this.dataDialogForm.id,
                            userID:this.id,
                            name:this.dataDialogForm.name,
                            mail:this.dataDialogForm.email,
                            phoneNum:this.dataDialogForm.phone,
                        };
                        if(this.dataDialogForm.isEdit){
                            //编辑联系人
                            editUserContact(params).then(({data})=>{
                                if(data.errorCode ==200){
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
                                if(data.errorCode ==200){
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
            getUserDetail(){//获取用户详情
                userDetail({id:this.id}).then(({data})=>{
                    if(data.errorCode ==200){
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
            getContactList(){//获取联系人列表
                userContactList({userID:this.id,page:1,pageSize:200}).then(({data})=>{
                    if(data.errorCode ==200){
                        this.tableData = data.data?data.data.list:[];
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            this.userInfo = JSON.parse(this.Cookies.get('userInfo'));
            this.getUserDetail();
            this.getContactList();
        },

        filters:{
            status(val){
                if(val==1){
                    return '使用中'
                }
                if(val==0){
                    return '已停用'
                }
                return ''
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
            font-size: 13px;
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
                    float: right;
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
