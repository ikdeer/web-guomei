<template>
    <div class="userlist">
        <nav class="overIew-nav">
            <breadcrumb></breadcrumb>
        </nav>
        <h3>用户列表</h3>
        <div class="userlist_content">
            <div class="user_list_form">
                <el-form :inline="true">
                    <el-form-item label="手机号">
                        <el-input :maxlength="11" v-model="formData.phoneNumList" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input :maxlength="20" v-model="formData.mailList" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="账号状态">
                        <el-select v-model="formData.accountState"  class="user_list_form_status" placeholder="请选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已停用" value="0"></el-option>
                            <el-option label="使用中" value="1"></el-option>
                        </el-select>
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
                            {{GetTimeStr(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="最近一次登录">
                        <template slot-scope="scope">
                            {{GetTimeStr(scope.row.lastLoginTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="账号状态">
                        <template slot-scope="scope">
                            {{scope.row.accountState | accountState}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="see(scope.row)">查看</el-button>
                            <el-button type="text" v-if="scope.row.accountState === 1" style="color: #E56565;" @click="down(scope.row)">停用</el-button>
                            <el-button type="text" v-if="scope.row.accountState === 0" style="color: #67C23A;" @click="on(scope.row)">启用</el-button>
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
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page.pageCount"
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
            width="30%">
            <el-form :model="dataDialogForm"  :rules="addDialogRules" ref="dataDialogForm" label-width="80px">
                <el-form-item label="用户名" prop="username" required>
                    <el-input type="phone" v-model="dataDialogForm.username" :maxlength="20" placeholder="请输入用户名(6-20位字母数字)" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号" prop="phoneNum" required>
                    <el-input type="phone" :maxlength="11" v-model.number="dataDialogForm.phoneNum" placeholder="请输入手机号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail" required>
                    <el-input type="phone" v-model="dataDialogForm.mail" placeholder="请输入邮箱（XXX@XXXX）" autocomplete="off"></el-input>
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
                <el-button type="primary" @click="createUser">确 定</el-button>
            </span>
        </el-dialog>


        <!--table表格弹窗信息-->
        <el-dialog
            title="提示"
            class="user_list_table_dialog"
            :visible.sync="userListTableDialog"
            width="30%">
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
    import breadcrumb from '@/views/CMS/component/header/BoxHeader';
    import { getUserList,createUser,removeUser,enableUser } from '@/HttpApi/user/user';
    export default {
        name: "userList",
        components:{breadcrumb},
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
            let passwordstart = (rule, value, callback) => {
                if(value){
                    if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value)){
                        return callback(new Error('密码设置错误'));
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
                    return callback(new Error('请确认登录密码'))
                }
            };

            return {
                formData:{
                    phoneNumList:'',
                    mailList:'',
                    accountState:'',
                    dataTime:null
                },
                tableData:[],
                page:{
                    page:1,
                    pageCount:10,
                    total:0
                },
                userListAddDialog:false,
                dataDialogForm:{ //弹窗创建用户信息
                    username:'',
                    phoneNum:'',
                    mail:'',
                    passwordstart:'',
                    passwordend:'',
                },
                userListTableDialog:false,
                userListTableInfo:{
                    title:'',
                    btnInfo:'',
                    type:true,
                    statys:0,
                    uid:''
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
                }
            }
        },
        methods: {
            adduser(){
                this.dataDialogForm = {
                    username:'',
                    phoneNum:'',
                    mail:'',
                    passwordstart:'',
                    passwordend:'',
                };
                this.userListAddDialog = true;
            },
            search(){
                let params = {
                    ...this.formData,...this.page,
                    creatTimeStart:this.formData.dataTime?this.GetTimeStr(this.formData.dataTime[0]):'',
                    creatTimeEnd:this.formData.dataTime?this.GetTimeStr(this.formData.dataTime[1]):''
                };
                getUserList(params).then(({data})=>{
                    if(data.success){
                        this.tableData = data.data;
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                });
            },
            reset(){
                this.formData = {
                    phoneNumList:'',
                    mailList:'',
                    accountState:'',
                    dataTime:null
                };
                this.search();
            },
            see(row){
                this.$router.push({ path: '/Index/userInfo', query: { id: '1' }})
            },
            down(row){
                this.userListTableInfo = {
                    title:'停用后该账户下所有应用API接口将无法调用，是否要停用！',
                    btnInfo:'停用',
                    type:true,
                    status:1,
                    uid:row.uid
                };
                this.userListTableDialog = true;
            },
            on(row){
                this.userListTableInfo = {
                    title:'将在启用XXX分后该账户下所有应用API接口恢复调用!',
                    btnInfo:'知道了',
                    type:false,
                    status:2,
                    uid:row.uid
                };
                this.userListTableDialog = true;
            },
            remove(row){
                this.userListTableInfo = {
                    title:'删除后该账户及账户下所有数据将清除，请谨慎操作，是否要删除!',
                    btnInfo:'删除',
                    type:true,
                    status:3,
                    uid:row.uid
                };
                this.userListTableDialog = true;
            },
            handleSizeChange(val){
                this.page.pageCount = val;
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
                            password:this.$md5(this.dataDialogForm.passwordend)
                        };
                        createUser(params).then(({data})=>{

                        })
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
                    uid:this.userListTableInfo.uid
                };
                if(this.userListTableInfo.status===1){
                    params.enable = 0
                }
                if(this.userListTableInfo.status===2){
                    params.enable = 1
                }
                if(this.userListTableInfo.status===3){
                    removeUser({uid:this.userListTableInfo.uid}).then(({data})=>{

                    })
                }else{
                    enableUser(params).then(({data})=>{

                    })
                }
                console.log(this.userListTableInfo)
            },
            GetTimeStr(inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            }
        },
        mounted(){
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
