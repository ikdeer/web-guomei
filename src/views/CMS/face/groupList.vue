<template>
    <div class="group_list">
        <!-- 面包屑导航栏 -->
        <nav class="nav-Type">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/Index/faceList'}">人脸分组列表</el-breadcrumb-item>
                <el-breadcrumb-item>人脸子分组列表</el-breadcrumb-item>
            </el-breadcrumb>
        </nav>
        <h3>子分组列表</h3>
        <div class="group_list_table">
            <div class="group_list_table_btn">
                <el-button type="primary" size="small" @click="addChildGroup"> 新增子分组 </el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="一级分组名称">
                    <template slot-scope="scope">
                        {{textLen(scope.row.name1,16)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sub1"
                    label="一级分组ID">
                </el-table-column>
                <el-table-column
                    label="二级分组名称">
                    <template slot-scope="scope">
                        {{textLen(scope.row.name2,16)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sub2"
                    label="二级分组ID">
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="人脸数量">
                </el-table-column>
                <el-table-column
                    prop="lastModifyTime"
                    label="修改时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="group_list_footer">
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
    </div>
</template>

<script>
    import {textLen} from "../../../lib/utils";
    import { geteGrouplist } from '@/HttpApi/face/face'
    export default {
        name: "groupList",
        data(){
            return{
                textLen:textLen,
                tableData:[],
                page:{
                    page:1,
                    pageSize:10,
                    total:0
                },
                groupOneList:[],
                groupid:'',
                type:'1'
            }
        },
        methods:{
            search(){
                let params = {
                    faceGroupID:this.$route.query.id,
                    ...this.page
                };
                geteGrouplist(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.tableData = data.data?data.data.list:[];
                        this.page.total = data.pagerManager?data.pagerManager.totalResults : 0;
                    }else{
                        this.tableData = [];
                        this.page.total =0;
                        this.$message.warning(data.errorInfo);
                    }
                })
            },
            addChildGroup(){
                this.$router.push({path:'/Index/addgroupone',query:{id:this.groupid.id,type:this.type}})
            },
            edit(){
                this.$router.push({path:'/Index/addgroupone',query:{id:this.groupid.id,type:this.type}})
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search()
            },
        },
        mounted(){
            this.groupid = this.$route.query.id || '';
            this.type = this.$route.query.type || '1';
            this.search()
        }
    }
</script>

<style lang="scss" scoped>
.group_list{
    .group_list_table{
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
        border-radius:10px;
        padding: 30px;
        box-sizing: border-box;
        .group_list_table_btn{
            height: 50px;
            line-height: 50px;
            text-align: right;
        }

    }
    .group_list_footer{
        margin-top: 10px;
        text-align: right;
    }
}
</style>
