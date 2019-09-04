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

        <el-dialog
            title="创建分组"
            class="user_list_add_dialog"
            :visible.sync="groupChildData.dialog"
            width="460px">
            <el-form :model="groupChildData" ref="groupChildData" label-width="80px">
                <el-form-item label="分组名称" required>
                    <el-input type="text" v-model="groupChildData.name" :maxlength="20" placeholder="请输入20以内的汉字" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分组层级" required>
                    <el-select v-model="groupChildData.status" placeholder="请选择分组层级">
                        <el-option label="一级分组" value="1"></el-option>
                        <el-option label="二级分组" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上级分组" prop="mail" v-if="groupChildData.status == 2" required>
                    <el-select v-model="groupChildData.oneId" placeholder="请选择一级分组">
                        <el-option v-for="item in groupOneList"
                                   :label="item.name"
                                   :value="item.id"
                                   :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="addGroupOne">立即创建</el-button>
                <el-button @click="groupChildData.dialog = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {formatTimes,textLen} from "../../../lib/utils";
    import { geteGrouplist } from '@/HttpApi/face/face'
    export default {
        name: "groupList",
        data(){
            return{
                formatTimes:formatTimes,
                textLen:textLen,
                tableData:[],
                page:{
                    page:1,
                    pageSize:10,
                    total:0
                },
                groupOneList:[],
                groupChildData:{
                    dialog:false,
                    name:'',
                    status:'1',
                    oneId:''
                }
            }
        },
        methods:{
            search(){
                let params = {
                    faceGroupID:this.$route.query.id,
                    ...this.page
                };
                geteGrouplist(params).then(({data})=>{
                    if(data.success){
                        this.tableData = data.data;
                    }else{
                        this.$message.warning(data.errorInfo);
                    }
                })
            },
            addChildGroup(){
                console.log(this.$route.query.id);
                this.groupChildData.dialog = true;
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
