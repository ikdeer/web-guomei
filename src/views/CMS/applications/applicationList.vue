<template>
    <div class="application_list">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>应用列表</h3>

        <div class="application_list_content">
            <div class="application_list_form">
                <el-form :inline="true" label-width="80px">
                    <el-form-item label="应用名称">
                        <el-input :maxlength="20" v-model="formData.name" placeholder="请输入应用名称"></el-input>
                    </el-form-item>
                    <el-form-item label="APPID">
                        <el-input :maxlength="20" v-model="formData.id" placeholder="请输入APPID"></el-input>
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
                        <el-input :maxlength="20" v-model="formData.createName" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            class="application_list_form_time"
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="application_list_btn">
                    <div>
                        <el-button type="primary" @click="addapplication">创建应用</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="search">查询</el-button>
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
                        prop="name"
                        label="应用名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="appTypeName"
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
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="lastModifyTime"
                        label="最后修改时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createrName"
                        label="创建人">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="showEnable"
                        label="应用状态">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="showReviewState"
                        label="审核状态">
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="statement(scope.row)">报表</el-button>
                            <el-button type="text" @click="see(scope.row)">查看</el-button>
                            <el-button type="text" @click="audit(scope.row)">审核</el-button>
                            <el-button type="text" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" style="color: #67C23A;" @click="on(scope.row)">启用</el-button>
                            <el-button type="text" style="color: #E56565;" @click="off(scope.row)">禁用</el-button>
                            <el-button type="text" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
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
    import {formatTimes} from "../../../lib/utils";
    import {getAppList,disableApplication,delApplication,auditApplication,getAapplicationState,getApplicationReviewState } from '@/HttpApi/application/application';
    export default {
        name: "applicationList",
        data() {
            return {
                formatTimes:formatTimes,
                formData: {
                    name:'',
                    id:'',
                    state:'',
                    reviewState:'',
                    createName:'',
                    dataTime:null
                },
                AapplicationState:[],//应用状态
                ApplicationReviewState:[],//应用审核状态

                tableData: [{}],
                page: {
                    page: 1,
                    pageSize: 10,
                    total: 500
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
                }
            }
        },
        methods: {
            addapplication() {
                this.$router.push({path: '/Index/addApplication', query: {type: 'add'}})
            },
            search() {
                //查询应用列表
                let params = {
                    ...this.page,...this.formData,
                    creatTimeStart:this.formData.dataTime?this.formatTimes(this.formData.dataTime[0]):'',
                    creatTimeEnd:this.formData.dataTime?this.formatTimes(this.formData.dataTime[1]):''
                };
                getAppList(params).then(({data})=>{
                    if(data.success){
                        this.tableData = data.data.list;
                        this.page.total = data.pagerManager.totalResults;
                    }else{
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
                    createBy:'',
                    dataTime:null
                };
                this.search();
            },
            statement() {
                //查看报表
            },
            see(row) {
                //查看应用详情
                this.$router.push({path: '/Index/applicationDetail', query: {id: row.id}})
            },
            edit() {
                //编辑应用
                this.$router.push({path: '/Index/addApplication', query: {type: 'edit'}})
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
            on(row) {
                //启用
                disableApplication({
                    appID:row.id,
                    enable:1
                }).then(({data})=>{
                    if(data.success){
                        this.applicationInfo={
                            title:'启用应用',
                            info:'APPID'+row.id+'应用接口已启用',
                            btnInfo:'我知道了',
                            type:false,
                            isAudit:false,
                            status:1,
                            id:row.id
                        };
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
                    info:'APPID'+row.id+'应用接口将无法调用，请谨慎操作！',
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
                    this.search();
                    this.applicationTableDialog = false;
                }

                //禁用接口调用
                if(this.applicationInfo.status === 2){
                    disableApplication({
                        appID:this.applicationInfo.id,
                        enable:0
                    }).then(({data})=>{
                        if(data.success){
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
                        if(data.success){
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
                        params.reviewState = 22;
                        params.rejectReason = this.auditInfo.info;
                    }
                    auditApplication(params).then(({data})=>{
                        if(data.success){
                            this.$message.success('审核完成');
                            this.search();
                            this.applicationTableDialog = false;
                        }else{
                            this.applicationTableDialog = false;
                        }
                    });
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
                    this.AapplicationState = data.data.list;
                })
            },
            getApplicationReviewState(){
                //应用审核状态下拉
                getApplicationReviewState().then(({data})=>{
                    this.ApplicationReviewState = data.data.list;
                })
            }
        },
        mounted() {
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
