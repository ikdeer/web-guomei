<template>
    <div class="userlist">
      <!-- 面包屑导航栏 -->
      <nav class="nav-Type">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </nav>
        <h3>用户列表</h3>
        <div class="userlist_content">
            <div class="user_list_form">
                <el-form :inline="true" ref="userlistform">
                    <el-form-item label="手机号">
                        <el-input :maxlength="200" v-model="formData.phoneNums" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input :maxlength="200" v-model="formData.mails" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="账号状态">
                        <el-select v-model="formData.disenable"  class="user_list_form_status" placeholder="请选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="使用中" value="1"></el-option>
                            <el-option label="已停用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            class="user_list_form_time"
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="user_list_btn">
                    <div>
                        <el-button type="primary" @click="adduser">创建用户</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">清空</el-button>
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
                        prop="phoneNum"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="mail"
                        label="邮箱">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="创建时间">
                        <template slot-scope="scope">
                            {{formatTimes(scope.row.regTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="最近一次登录">
                        <template slot-scope="scope">
                            {{formatTimes(scope.row.lastLoginTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="账号状态">
                        <template slot-scope="scope">
                            {{scope.row.state | accountState}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="userInfo.groupID ==1 || userInfo.groupID==10 " @click="see(scope.row)">查看</el-button>
                            <el-button type="text" v-if="scope.row.state === 1" style="color: #E56565;" @click="down(scope.row)">停用</el-button>
                            <el-button type="text" v-if="scope.row.state === 0" style="color: #67C23A;" @click="on(scope.row)">启用</el-button>
                            <el-button type="text" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="user_list_footer">
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

        <el-dialog
            title="创建用户"
            class="user_list_add_dialog"
            :visible.sync="userListAddDialog"
            width="460px">
            <el-form :model="dataDialogForm"  :rules="addDialogRules" ref="dataDialogForm" label-width="80px">
                <el-form-item label="用户名" prop="username" required>
                    <el-input type="text" v-model="dataDialogForm.username" :maxlength="20" placeholder="请输入用户名(6-20位字母数字)" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNum" required>
                    <el-input type="tel" :maxlength="11" v-model.number="dataDialogForm.phoneNum" placeholder="请输入手机号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail" required>
                    <el-input type="email" v-model="dataDialogForm.mail" placeholder="请输入邮箱（XXX@XXXX）" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设置密码" prop="passwordstart" required>
                    <el-input type="password" :maxlength="16" v-model="dataDialogForm.passwordstart" show-password placeholder="请设置登录密码（8-16位字母和数字）" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordend" required>
                    <el-input type="password" :maxlength="16" v-model="dataDialogForm.passwordend" show-password placeholder="请确认登录密码" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="createUser">确 定</el-button>
                <el-button @click="userListAddDialog = false">取 消</el-button>
            </span>
        </el-dialog>


        <!--table表格弹窗信息-->
        <el-dialog
            title="提示"
            class="user_list_table_dialog"
            :visible.sync="userListTableDialog"
            width="500px">
            <div>
                <span>{{userListTableInfo.title}}</span>
            </div>
            <span slot="footer">
                <el-button type="primary" @click="submitTableDialog">{{userListTableInfo.btnInfo}}</el-button>
                <el-button v-if="userListTableInfo.type" @click="userListTableDialog = false">取 消</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    import {formatTimes} from '@/lib/utils'
    import { getUserList,createUser,removeUser,enableUser,phoneNumCheck } from '@/HttpApi/user/user';
    export default {
        name: "userList",
        data() {
            let username = (rule, value, callback) => {
                if(value){
                    if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)){
                        return callback(new Error('请输入6-20位字母数字'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请输入用户名'))
                }
            };
            let phone = (rule, value, callback) => {
                if(value){
                    if(!/^(13|14|15|16|17|18|19)\d{9}$/.test(value)){
                        return callback(new Error('手机号不符合规则'));
                    }else{
                        phoneNumCheck({phoneNum:value}).then(({data})=>{
                            if(data.success){
                                return callback()
                            }else{
                                return callback(new Error(data.errorInfo));
                            }
                        });

                    }
                }else{
                    return callback(new Error('请输入手机号'))
                }
            };
            let email = (rule, value, callback) => {
                if(value){
                    if(!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)){
                        console.log(value)
                        return callback(new Error('邮箱不符合规则'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请输入邮箱'))
                }
            };
            let passwordstart = (rule, value, callback) => {
                if(value){
                    if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value)){
                        return callback(new Error('密码不符合规则'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请设置密码'))
                }
            };

            let passwordend = (rule, value, callback) => {
                if(value){
                    if(String(value) !== String(this.dataDialogForm.passwordstart)){
                        return callback(new Error('两次密码设置不一致'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请确认设置登录密码'))
                }
            };

            return {
                formatTimes:formatTimes,
                formData:{ //查询信息
                    phoneNums:'',
                    mails:'',
                    disenable:'',
                    dataTime:null
                },
                tableData:[],//用户列表
                page:{
                    page:1,
                    pageSize:10,
                    total:0
                },
                userListAddDialog:false,//新增用户弹窗
                dataDialogForm:{ //弹窗创建用户信息
                    username:'',
                    phoneNum:'',
                    mail:'',
                    passwordstart:'',
                    passwordend:'',
                },
                userListTableDialog:false,//提示信息弹窗
                userListTableInfo:{
                    title:'',
                    btnInfo:'',
                    type:true,
                    statys:0,
                    id:''
                },
                addDialogRules:{
                    username:[
                        {validator:username,trigger:['blur','change']}
                    ],
                    phoneNum:[
                        {validator:phone,trigger:['blur','change']}
                    ],
                    mail:[
                        {validator:email,trigger:['blur','change']}
                    ],
                    passwordstart:[
                        {validator:passwordstart,trigger:['blur','change']}
                    ],
                    passwordend:[
                        {validator:passwordend,trigger:['blur','change']}
                    ]
                },
                userInfo:{
                    userName:'',//用户姓名
                    userImg:'',//用户头头像
                    uid:'',//用户ID
                    groupID:'',//用户身份
                }
            }
        },
        methods: {
            adduser(){//新增用户
                this.userListAddDialog = true;
                this.$refs['dataDialogForm'].resetFields();
            },
            search(){
                let phoneArr = this.formData.phoneNums.replace('，',',').split(',');
                let emailArr = this.formData.mails.replace('，',',').split(',');
                if(!phoneArr[0]==''){
                    let phoneFlag = false;
                    phoneArr.forEach((item)=>{
                        if(!/^(13|14|15|16|17|18|19)\d{9}$/.test(item)){
                            phoneFlag = true;
                        }
                    });
                    if(phoneFlag){
                        this.$message.warning('手机号不符合规则')
                        return;
                    }
                }
                if(!emailArr[0]==''){
                    let emailFlag = false;
                    emailArr.forEach((item)=>{
                        if(!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(item)){
                            emailFlag = true;
                        }
                    });
                    if(emailFlag){
                        this.$message.warning('邮箱不符合规则')
                        return;
                    }
                }
                let params = {
                    ...this.formData,...this.page,
                    createTimeStart:this.formData.dataTime?this.formData.dataTime[0]:'',
                    createTimeEnd:this.formData.dataTime?this.formData.dataTime[1]:''
                };
                if(this.formData.disenable) params.enable = this.formData.disenable;

                getUserList(params).then(({data})=>{
                    if(data.success){
                        this.tableData = data.data ? data.data.list : [];
                        this.page.total = data.pagerManager?data.pagerManager.totalResults:0;
                    }else{
                        this.tableData = [];
                        this.page.total = 0;
                        // this.$message.warning(data.errorInfo)
                    }
                });
            },
            reset(form){
                this.formData = {
                    phoneNums:'',
                    mails:'',
                    disenable:'',
                    dataTime:null
                };
                this.search();
            },
            see(row){
                this.$router.push({ path: '/Index/userInfo', query: { id: row.id }})
            },
            down(row){
                this.userListTableInfo = {
                    title:'停用后该账户下所有应用API接口将无法调用，是否要停用！',
                    btnInfo:'停用',
                    type:true,
                    status:1,
                    id:row.id
                };
                this.userListTableDialog = true;
            },
            on(row){
                this.userListTableInfo = {
                    title:'将在启用XXX分后该账户下所有应用API接口恢复调用!',
                    btnInfo:'知道了',
                    type:false,
                    status:2,
                    id:row.id
                };
                this.userListTableDialog = true;
            },
            remove(row){
                this.userListTableInfo = {
                    title:'删除后该账户及账户下所有数据将清除，请谨慎操作，是否要删除!',
                    btnInfo:'删除',
                    type:true,
                    status:3,
                    id:row.id
                };
                this.userListTableDialog = true;
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search()
            },
            createUser(){
                this.$refs['dataDialogForm'].validate((valid) => {
                    if (valid) {
                        let params = {
                            ...this.dataDialogForm,
                            password:this.dataDialogForm.passwordend
                        };
                        createUser(params).then(({data})=>{
                            if(data.success){
                                this.$message.success('添加成功');
                                this.search();
                                this.userListAddDialog = false;
                            }else{
                                this.$message.warning(data.errorInfo)
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            submitTableDialog(){
                /*
                * 提交 停用/禁用/删除 操作
                * this.userListTableInfo.status 标识点击的是那种形式  1-停用操作  2-启用操作 3-删除操作
                * */
                let params = {
                    id:this.userListTableInfo.id
                };
                if(this.userListTableInfo.status===1){
                    params.enable = 0
                }
                if(this.userListTableInfo.status===2){
                    params.enable = 1
                }
                if(this.userListTableInfo.status===3){
                    removeUser({id:this.userListTableInfo.id}).then(({data})=>{
                        if(data.success){
                            this.search();
                            this.$message.success('删除成功');
                            this.userListTableDialog = false;
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }else{
                    enableUser(params).then(({data})=>{
                        if(data.success){
                            this.search();
                            this.$message.success(this.userListTableInfo.status===1?'停用成功':'启用成功');
                            this.userListTableDialog = false;
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }
            },
        },
        mounted(){
            this.userInfo = JSON.parse(this.Cookies.get('userInfo'));
            this.search();
        },
        filters:{
            accountState(val){
                if(val==0){
                    return '已停用'
                }
                if(val == 1){
                    return '使用中'
                }
                return ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userlist{
        font-size: .16rem;
        .userlist_content{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding: 30px;
            box-sizing: border-box;
            .user_list_form{
                .el-form{
                    border-bottom: 1px solid #eeeeee;
                    .user_list_form_status{
                        width: 120px;
                    }
                    .user_list_form_time{
                        width: 300px;
                    }
                }
                .user_list_btn{
                  height: 50px;
                  line-height: 50px;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: space-between;
                }
            }
            .user_list_table{
                width: 100%;
            }
            .user_list_footer{
                margin-top: 10px;
                text-align: right;
            }
        }
    }
    .user_list_add_dialog{
        .el-form{
            padding: 0 30px;
        }
    }
    .user_list_table_dialog{
        div{
            text-align: center;
            display: flex;
            height: 1rem;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            color: #333333;
            font-weight: 600;
        }
    }

</style>
