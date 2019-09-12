<template>
    <div class="application_list">
      <!-- 面包屑导航栏从概览过来  -->
      <template v-if="Breadcrumb == 'overview'">
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/Index/overview'}">概览</el-breadcrumb-item>
            <el-breadcrumb-item>应用列表</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
      <!-- 本级过来 -->
      <template v-if="Breadcrumb == null">
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item>应用列表</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
        <h3>应用列表</h3>
        <div class="application_list_content">
            <div class="application_list_form">
                <el-form :inline="true" label-width="80px">
                    <el-form-item label="应用名称">
                        <el-input :maxlength="400" v-model="formData.name" placeholder="请输入应用名称"></el-input>
                    </el-form-item>
                    <el-form-item label="APPID">
                        <el-input :maxlength="400" v-model="formData.id" placeholder="请输入APPID"></el-input>
                    </el-form-item>
                    <el-form-item label="应用状态">
                        <el-select v-model="formData.state" placeholder="请选择状态">
                            <el-option v-for="item in AapplicationState"
                                       :label="item.common"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="formData.reviewState" placeholder="请选择状态">
                            <el-option v-for="item in ApplicationReviewState"
                                       :label="item.common"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input :maxlength="400" :disabled="userInfo.groupID==20" v-model="formData.createrName" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            class="application_list_form_time"
                            v-model="formData.dataTime"
                            type="daterange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="application_list_btn">
                    <div>
                        <el-button type="primary" :disabled="userInfo.groupID!=20" @click="addapplication">创建应用</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="search(1)">查询</el-button>
                        <el-button @click="reset">清空</el-button>
                    </div>
                </div>
            </div>
            <div class="application_list_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        label="应用名称">
                        <template slot-scope="scope">
                            <el-tooltip placement="top">
                                <div slot="content">{{scope.row.name}}</div>
                                <span @click="see(scope.row)" style="color:#409EFF;cursor: pointer;">{{textLen(scope.row.name,10)}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="appTypeName"
                        width="80"
                        label="应用类型">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="id"
                        label="appID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createTime"
                        width="140"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="lastModifyTime"
                        width="140"
                        label="最后修改时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createrName"
                        width="80"
                        label="创建人">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="showState"
                        width="80"
                        label="应用状态">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="80"
                        label="审核状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.reviewState==20">
                                <el-tooltip placement="top">
                                    <div slot="content">{{scope.row.rejectReason}}</div>
                                    <span>{{scope.row.showReviewState}}</span>
                                </el-tooltip>
                            </div>
                            <div v-else>{{scope.row.showReviewState}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="statement(scope.row)">报表</el-button>
                            <el-button type="text" @click="see(scope.row)">查看</el-button>

                            <!--用户可操作-->
                            <el-button type="text" v-if="scope.row.reviewState == 1 && userInfo.groupID==20" @click="commitAudit(scope.row)">提交审核</el-button>
                            <el-button type="text" v-if="userInfo.groupID==20" @click="edit(scope.row)">修改</el-button>

                            <!--超管可操作-->
                            <el-button type="text" v-if="scope.row.reviewState ==10 && userInfo.groupID ==1" @click="audit(scope.row)">审核</el-button>
                            <el-button type="text" v-if="scope.row.enable == 0 && userInfo.groupID ==1" style="color: #67C23A;" @click="on(scope.row)">启用</el-button>
                            <el-button type="text" v-if="scope.row.enable === 1&& userInfo.groupID ==1" style="color: #E56565;" @click="off(scope.row)">禁用</el-button>
                            <el-button type="text" v-if="userInfo.groupID ==1" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="application_list_footer">
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
        <!--table表格弹窗信息-->
        <el-dialog
            :title="applicationInfo.title"
            class="application_list_table_dialog"
            :visible.sync="applicationTableDialog"
            width="460px">
            <div v-if="!applicationInfo.isAudit" class="info">
                <span>{{applicationInfo.info}}</span>
            </div>
            <div v-if="applicationInfo.isAudit" class="form">
                <el-form :inline="true" label-width="90px">
                    <el-form-item>
                        <el-radio-group v-model="auditInfo.radio">
                            <el-radio :label="0">审核通过</el-radio>
                            <el-radio :label="1">审核不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="原因描述" v-if="auditInfo.radio">
                        <el-input type="textarea" rows="4" show-word-limit :maxlength="50"
                                  v-model="auditInfo.info" placeholder="请输入原因描述"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer">
                <el-button type="primary" @click="submitTableDialog">{{applicationInfo.btnInfo}}</el-button>
                <el-button v-if="applicationInfo.type" @click="applicationTableDialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {textLen,formatTimes} from "../../../lib/utils";
    import {getAppList,disableApplication,delApplication,auditApplication,getAapplicationState,getApplicationReviewState } from '@/HttpApi/application/application';
    export default {
        name: "applicationList",
        data() {
            return {
                textLen:textLen,
                formData: {
                    name:'',
                    id:'',
                    state:'',
                    reviewState:'',
                    createrName:'',
                    dataTime:[formatTimes(new Date(),true)+' 00:00:00',formatTimes(new Date(),true)+' 23:59:59']
                },
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 1);
                                end = new Date(new Date(end).getTime() - 3600 * 1000 * 24 * 1);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '近7天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 7);
                                end = new Date(new Date(end));
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '近30天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 30);
                                end = new Date(new Date(end));
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                AapplicationState:[],//应用状态
                ApplicationReviewState:[],//应用审核状态

                tableData: [{}],
                page: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                applicationTableDialog:false,
                applicationInfo:{
                    title:'',//提示语标题
                    info:'',//提示语信息
                    btnInfo:'确定',//底部确认按钮文字
                    status:1,//来源状态 1-启用 2-禁用 3-删除
                    type:true,//取消按钮状态
                    isAudit:false,//是否是审核弹窗
                    id:1
                },
                auditInfo:{
                    radio:0,
                    info:''
                },
                userInfo:{
                    userName:'',//用户姓名
                    userImg:'',//用户头头像
                    uid:'',//用户ID
                    groupID:'',//用户身份
                },//用户登录信息
                Breadcrumb:null,//面包屑导航栏
            }
        },
        methods: {
            addapplication() {
                this.$router.push({path: '/Index/addApplication', query: {type: 'add',NavType:'VIS-A-VIS'}})
            },
            search(page) {
                //查询应用列表
                if(page==1){
                    this.page = {
                        page: 1,
                        pageSize: 10,
                        total: 0
                    }
                }
                let params = {
                    ...this.page,...this.formData,
                    creatTimeStart:this.formData.dataTime?this.formData.dataTime[0]:'',
                    creatTimeEnd:this.formData.dataTime?this.formData.dataTime[1]:''
                };
                getAppList(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.tableData = data.data?data.data.list:[];
                        this.page.total = data.pagerManager?data.pagerManager.totalResults:0;
                    }else{
                        this.tableData = [];
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            reset() {
                this.formData= {
                    name:'',
                    appID:'',
                    appState:'',
                    reviewState:'',
                    dataTime:null
                };
                if(this.userInfo.groupID==20){
                    this.formData.createrName = this.userInfo.userName;
                }
                this.search(1);
            },
            statement(row) {
                //查看报表
                this.$router.push({path: '/Index/statement', query: {id: row.id,NavType:'applicationList'}})
            },
            see(row) {
                //查看应用详情
                this.$router.push({path: '/Index/applicationDetail', query: {id: row.id}})
            },
            edit(row) {
                //编辑应用
                this.$router.push({path: '/Index/addApplication', query: {type: 'edit',id:row.id,NavType:'VIS-A-VIS'}})
            },
            audit(row){
                this.applicationInfo={
                    title:'审核应用',
                    info:'',
                    btnInfo:'确定',
                    type:true,
                    isAudit:true,
                    status:4,
                    id:row.id
                };
                this.auditInfo={
                    radio:0,
                    info:''
                };
                this.applicationTableDialog = true;
            },
            commitAudit(row){
                this.applicationInfo={
                    title:'提交审核',
                    info:'确认提交APPID为'+row.id+'的应用进行审核吗',
                    btnInfo:'提交',
                    type:true,
                    isAudit:false,
                    status:5,
                    id:row.id
                };
                this.applicationTableDialog = true;
            },
            on(row) {
                //启用
                disableApplication({
                    appID:row.id,
                    enable:1
                }).then(({data})=>{
                    if(data.errorCode ==200){
                        this.applicationInfo={
                            title:'启用应用',
                            info:'APPID为'+row.id+'的应用接口已启用',
                            btnInfo:'我知道了',
                            type:false,
                            isAudit:false,
                            status:1,
                            id:row.id
                        };
                        this.search();
                        this.applicationTableDialog = true;
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                });

            },
            off(row) {
                // 禁用
                this.applicationInfo={
                    title:'禁用应用',
                    info:'APPID为'+row.id+'的应用接口将无法调用，请谨慎操作！',
                    btnInfo:'禁用',
                    type:true,
                    isAudit:false,
                    status:2,
                    id:row.id
                };
                this.applicationTableDialog = true;
            },
            remove(row) {
                this.applicationInfo={
                    title:'删除应用',
                    info:'应用删除后APPID失效，数据将无法恢复，请谨慎操作！',
                    btnInfo:'删除',
                    type:true,
                    isAudit:false,
                    status:3,
                    id:row.id
                };
                this.applicationTableDialog = true;
            },
            submitTableDialog(){ //提交弹窗信息
                //启用直接过
                if(this.applicationInfo.status === 1){
                    // this.search();
                    this.applicationTableDialog = false;
                }

                //禁用接口调用
                if(this.applicationInfo.status === 2){
                    disableApplication({
                        appID:this.applicationInfo.id,
                        enable:0
                    }).then(({data})=>{
                        if(data.errorCode ==200){
                            this.$message.success('禁用成功');
                            this.search();
                            this.applicationTableDialog = false;
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    });
                }

                //删除调用
                if(this.applicationInfo.status === 3){
                    delApplication({
                        appID:this.applicationInfo.id
                    }).then(({data})=>{
                        if(data.errorCode ==200){
                            this.$message.success('删除成功');
                            this.search();
                            this.applicationTableDialog = false;
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }

                //审核接口调用
                if(this.applicationInfo.status === 4){
                    let params = {
                        appID:this.applicationInfo.id
                    };
                    if(this.auditInfo.radio === 0){
                        params.reviewState = 21
                    }
                    if(this.auditInfo.radio === 1){
                        params.reviewState = 20;
                        params.rejectReason = this.auditInfo.info;
                    }
                    auditApplication(params).then(({data})=>{
                        if(data.errorCode ==200){
                            this.$message.success('审核完成');
                            this.search();
                            this.applicationTableDialog = false;
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    });
                }
                //提交审核
                if(this.applicationInfo.status === 5){
                    auditApplication({
                        appID:this.applicationInfo.id,
                        reviewState:10
                    }).then(({data})=>{
                        if(data.errorCode ==200){
                            this.$message.success('提交成功');
                            this.search();
                            this.applicationTableDialog = false;
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }
            },
            handleSizeChange(val) {
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.search()
            },
            getAapplicationState(){
                //应用状态下拉
                getAapplicationState().then(({data})=>{
                    data.data.list.unshift({
                        id: '',
                        common: "全部"
                    });
                    this.AapplicationState = data.data.list;
                })
            },
            getApplicationReviewState(){
                //应用审核状态下拉
                getApplicationReviewState().then(({data})=>{
                    data.data.list.unshift({
                        id: '',
                        common: "全部"
                    });
                    this.ApplicationReviewState = data.data.list;
                })
            }
        },
        mounted() {
            this.userInfo = JSON.parse(this.Cookies.get('userInfo'));
            if(this.userInfo.groupID==20){
                this.formData.createrName = this.userInfo.userName;
            }
            this.Breadcrumb = this.$route.query.NavType;//面包屑导航栏
            this.search();
            this.getAapplicationState();
            this.getApplicationReviewState();
        }
    }
</script>

<style lang="scss" scoped>
    .application_list {
        font-size: 0.16rem;
        .application_list_content {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;

            .application_list_form {
                .el-form {
                    order-bottom: 1px solid #eeeeee;
                }
                .application_list_btn {
                    height: 50px;
                    line-height: 50px;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    border-top: 1px solid #eeeeee;
                }

            }
            .application_list_table {
                width: 100%;
            }
            .application_list_footer {
                margin-top: 10px;
                text-align: right;
            }
        }
    }
    .application_list_table_dialog{
        div{
            text-align: center;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            color: #333333;
            font-weight: 600;
        }
        .info{
            height: 120px;
        }
        .form{
            height: 120px;
            .el-form{
                .el-form-item{
                    align-items: normal;
                    width: 100%;
                    .el-textarea{
                        width: 280px;
                    }
                }

            }
        }
    }
</style>
