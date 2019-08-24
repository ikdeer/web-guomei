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
                        <el-select v-model="formData.status" placeholder="请选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未开始" value="1"></el-option>
                            <el-option label="进行中" value="2"></el-option>
                            <el-option label="已结束" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="formData.status" placeholder="请选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未开始" value="1"></el-option>
                            <el-option label="进行中" value="2"></el-option>
                            <el-option label="已结束" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input :maxlength="20" v-model="formData.user" placeholder="请输入创建人"></el-input>
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
                    :current-page="page.currentPage"
                    :page-sizes="[10, 20, 50, 100]"
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
            width="6rem">
            <div v-if="!applicationInfo.isAudit" class="info">
                <span>{{applicationInfo.info}}</span>
            </div>
            <div v-if="applicationInfo.isAudit" class="form">
                <el-form :inline="true" label-width="80px">
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
    export default {
        name: "applicationList",
        data() {
            return {
                formData: {},
                tableData: [{}],
                page: {
                    currentPage: 1,
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

            },
            reset() {

            },
            statement() {
                //查看报表
            },
            see() {
                //查看应用详情
                this.$router.push({path: '/Index/applicationDetail', query: {id: 1}})
            },
            edit() {
                //编辑应用
                this.$router.push({path: '/Index/addApplication', query: {type: 'edit'}})
            },
            audit(row){
                this.applicationInfo={
                    title:'启用应用',
                    info:'APPIDXXXXX应用接口已启用',
                    btnInfo:'确定',
                    type:true,
                    isAudit:true,
                    status:4
                };
                this.auditInfo={
                    radio:0,
                    info:''
                };
                this.applicationTableDialog = true;
            },
            on() {
                //启用
                this.applicationInfo={
                    title:'启用应用',
                    info:'APPIDXXXXX应用接口已启用',
                    btnInfo:'我知道了',
                    type:false,
                    isAudit:false,
                    status:1
                };
                this.applicationTableDialog = true;
            },
            off() {
                // 禁用
                this.applicationInfo={
                    title:'禁用应用',
                    info:'应用接口将无法调用，请谨慎操作！',
                    btnInfo:'禁用',
                    type:true,
                    isAudit:false,
                    status:2
                };
                this.applicationTableDialog = true;
            },
            remove() {
                this.applicationInfo={
                    title:'删除应用',
                    info:'应用删除后APPID失效，数据将无法恢复，请谨慎操作！',
                    btnInfo:'删除',
                    type:true,
                    isAudit:false,
                    status:3
                };
                this.applicationTableDialog = true;
            },
            submitTableDialog(){ //提交弹窗信息
                if(this.applicationInfo.status === 4){
                    //审核接口调用
                    this.search();
                    this.applicationTableDialog = false;
                }else if(this.applicationInfo.status === 2){
                    //禁用接口调用
                    this.search();
                    this.applicationTableDialog = false;
                }else if(this.applicationInfo.status === 3){
                    //删除调用
                    this.search();
                    this.applicationTableDialog = false;
                }else{
                    //启用直接过
                    this.search();
                    this.applicationTableDialog = false;
                }
            },
            handleSizeChange(val) {
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.search()
            },
        },
        mounted() {

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
            height: 1.5rem;
        }
        .form{
            height: 1.5rem;
            .el-form{
                .el-form-item{
                    align-items: normal;
                    width: 5rem;
                    .el-textarea{
                        width: 4rem;
                    }
                }

            }
        }
    }
</style>
