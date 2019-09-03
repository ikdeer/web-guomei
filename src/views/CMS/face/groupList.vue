<template>
    <div class="group_list">
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
                        {{textLen(scope.row.name,16)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="phoneNum"
                    label="一级分组ID">
                </el-table-column>
                <el-table-column
                    label="二级分组名称">
                    <template slot-scope="scope">
                        {{textLen(scope.row.name,16)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mail"
                    label="二级分组ID">
                </el-table-column>
                <el-table-column
                    prop="mail"
                    label="人脸数量">
                </el-table-column>
                <el-table-column
                    prop="mail"
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
        </div>
        <div class="group_list_footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.page"
                :page-sizes="[10, 20, 30, 50, 100]"
                :page-size="page.pageCount"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {formatTimes,textLen} from "../../../lib/utils";
    export default {
        name: "groupList",
        data(){
            return{
                formatTimes:formatTimes,
                textLen:textLen,
                tableData:[],
                page:{
                    page:1,
                    pageCount:10,
                    total:0
                }
            }
        },
        methods:{
            search(){

            },
            addChildGroup(){

            },
            handleSizeChange(val){
                this.page.pageCount = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search()
            },
        },
        mounted(){

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
