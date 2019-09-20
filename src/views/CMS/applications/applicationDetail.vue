<template>
    <div class="application_detail">
      <!-- 面包屑导航栏 -->
      <template>
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/Index/applicationList'}">应用列表</el-breadcrumb-item>
            <el-breadcrumb-item>应用详情</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
        <h3>应用详情</h3>
        <div class="application_detail_top">
            <div class="application_detail_top_listone" v-for="item in InfoOne">
                <div>{{item.title}}</div>
                <div>{{item.content}}</div>
            </div>
            <div style="clear: both"></div>
        </div>
        <h3>API列表</h3>
        <div class="application_detail_content">
            <div class="application_list_table">
                <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column align="center" prop="name" label="API"></el-table-column>
                    <el-table-column align="center" prop="showEnable" label="状态" width="100"></el-table-column>
                    <el-table-column align="center" width="380" prop="transferAddr" label="请求地址"></el-table-column>
                    <el-table-column align="center" prop="amountLimit" width="100" label="调用量限制"></el-table-column>
                    <el-table-column align="center" prop="qpsLimit" width="100" label="QPS限制"></el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                        <template slot-scope="scope">
                            <el-button type="text"
                                       :disabled="groupID == '20' ? true : false"
                                       @click="down(scope.row)">
                              {{scope.row.enable===1 ? '停用':'启用'}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="application_list_footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="[10, 20, 30, 50, 100]"
                    :page-size="page.pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
        </div>
        <h3>应用描述</h3>
        <div class="application_detail_button">
            {{introduction}}
        </div>
    </div>
</template>

<script>
    import { getApplicationDetail,enableApplicationApi } from '@/HttpApi/application/application';
    export default {
        name: "applicationDetail",
        data(){
            return{
                InfoOne:[{
                    title:'应用名称',
                    content:''
                },{
                    title:'应用类型',
                    content:''
                },{
                    title:'AppID',
                    content:''
                },{
                    title:'API Key',
                    content:''
                },{
                    title:'Secret Key',
                    content:''
                },{
                    title:'应用状态',
                    content:''
                },{
                    title:'审核状态',
                    content:''
                },{
                    title:'创建时间',
                    content:''
                },{
                    title:'修改时间',
                    content:''
                },{
                    title:'创建人',
                    content:''
                }],
                tableData:[],
                introduction:'',
                groupID:'',//登录人员身份
                page:{
                    currentPage:1,
                    pageSize:10,
                    total:0
                }
            }
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if (row.review == 1) {
                    return 'warning_row';
                }
                if (row.review == -1) {
                    return 'success_row';
                }
                return '';
            },
            search(){
                getApplicationDetail({
                  appID:this.$route.query.id,
                  page:this.page.currentPage,
                  pageSize:this.page.pageSize
                }).then(({data})=>{
                    if(data.errorCode ==200){
                        this.InfoOne[0].content = data.data.data.name || '————';
                        this.InfoOne[1].content = data.data.data.appTypeName || '————';
                        this.InfoOne[2].content = data.data.data.id || '————';
                        this.InfoOne[3].content = data.data.data.apiKey || '————';
                        this.InfoOne[4].content = data.data.data.secretKey || '————';
                        this.InfoOne[5].content = data.data.data.showState || '————';
                        this.InfoOne[6].content = data.data.data.showReviewState || '————';
                        this.InfoOne[7].content = data.data.data.createTime || '————';
                        this.InfoOne[8].content = data.data.data.lastModifyTime || '————';
                        this.InfoOne[9].content = data.data.data.createrName || '————';
                        this.introduction = data.data.data.introduction || '无';
                        this.tableData = data.data.data.apisList?data.data.data.apisList:[];
                        this.page.total = data.pagerManager?data.pagerManager.totalResults:0;
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            down(row){
                let params = {
                    appID:this.$route.query.id,
                    apiID:row.id,
                };
                if(row.enable===1){
                    //停用操作
                    params.enable = 0
                }
                if (row.enable===0){
                    //启用操作
                    params.enable = 1
                }
                enableApplicationApi(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.search();
                        this.$message.success(row.enable===1 ? '停用成功':'启用成功')
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.currentPage = val;
                this.search()
            },
        },
        mounted(){
            let userInfo= this.Cookies.get('userInfo') || '';
            this.groupID = userInfo ? JSON.parse(userInfo).groupID : '';
            this.search();
        }
    }
</script>

<style lang="scss">
    .application_detail {
        font-size: 0.16rem;
        .application_detail_top {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;
            .application_detail_top_listone{
                width: 20%;
                float: left;
                text-align: center;
                color: #666666;
                div{
                    height: .5rem;
                    /*line-height: .5rem;*/
                    padding: 10px;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow: hidden;
                    &:nth-child(1){
                        background: #F1F1F1;
                        font-weight: 600;
                        border-right: 1px solid white;
                    }
                }
            }
        }
        .application_detail_content{
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;
            .application_list_table{
                width: 100%;
                .warning_row {
                    background: oldlace!important;
                }
                .success_row {
                    background: #f0f9eb!important;
                }
            }
            .application_list_footer{
                margin-top: 10px;
                text-align: right;
            }
        }
        .application_detail_button{
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;
        }
    }
</style>
