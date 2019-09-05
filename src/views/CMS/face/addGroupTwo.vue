<template>
    <div class="add_group_two">
        <!-- 面包屑导航栏 -->
        <nav class="nav-Type">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/Index/faceList'}">人脸分组列表</el-breadcrumb-item>
                <el-breadcrumb-item>创建分组</el-breadcrumb-item>
            </el-breadcrumb>
        </nav>
        <h3>创建分组</h3>
        <div class="add_group_content">
            <div class="addgroup_top">
                <div><span>1</span>第一步 设置分组</div>
                <div class="active"><span>2</span>第二步 添加人像</div>
            </div>
            <div class="steptwo">
                <div class="steptwo_from">
                    <el-form :inline="true">
                        <el-form-item label="选择分组">
                            <el-select v-model="stepTwoForm.one" @change="ChangeTwoFormOne" placeholder="请选择一级分组">
                                <el-option v-for="item in groupOneList"
                                           :label="item.name"
                                           :value="item.id"
                                           :key="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="stepTwoForm.two" placeholder="请选择二级分组">
                                <el-option v-for="item in groupTwoList"
                                           :label="item.name"
                                           :value="item.id"
                                           :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :disabled="isSee || stepTwoForm.two == ''" @click="getFaceShowList">添加人像</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="steptwo_table">
                    <el-table
                        ref="multipleTable"
                        :data="stepTwoTableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="PersonID">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="人员类型">
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="编号系统">
                        </el-table-column>
                        <el-table-column
                            prop="ids"
                            label="编号">
                        </el-table-column>
                        <el-table-column
                            prop="on"
                            label="图片来源">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="添加时间">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <temalate slot-scope="scope">
                                <el-button type="text" @click="removeFaceImg(scope.row)">删除</el-button>
                            </temalate>
                        </el-table-column>
                    </el-table>
                    <div class="steptwo_table_footer">
                        <el-button :disabled="isSee" @click="removeAll">批量删除</el-button>
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
                <div class="add_group_footer">
                    <el-button type="primary" @click="lastStep">上一步</el-button>
                    <el-button @click="ok">完成</el-button>
                </div>
            </div>
        </div>


        <el-dialog
            title="添加人像"
            class="add_group_face_dialog"
            :visible.sync="addGroupFace"
            width="15rem">
            <div>
                <div class="from">
                    <el-form :inline="true" ref="dataDialogForm" label-width="80px">
                        <el-form-item label="图片来源">
                            <el-select v-model="dataDialogForm.status" placeholder="请选择图片来源">
                                <el-option label="美办" value="0"></el-option>
                                <el-option label="考勤" value="1"></el-option>
                                <el-option label="监控" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="编号">
                            <el-select v-model="dataDialogForm.status" placeholder="请选择编号系统">
                                <el-option label="PS" value="0"></el-option>
                                <el-option label="SAP" value="1"></el-option>
                            </el-select>
                            <el-input :maxlength="20" v-model="dataDialogForm.name" placeholder="请输入编号"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="dataDialogForm.status" placeholder="请选择类型">
                                <el-option label="国美员工" value="0"></el-option>
                                <el-option label="国美会员" value="1"></el-option>
                                <el-option label="游客" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input :maxlength="10" v-model="dataDialogForm.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select v-model="dataDialogForm.status" placeholder="请选择性别">
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="PersonID">
                            <el-input :maxlength="10" v-model="dataDialogForm.name" placeholder="请输入PersonID"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btn">
                    <div>
                        <el-button type="primary" @click="">批量添加</el-button>
                        <el-button type="text" @click="">下载批量添加模板</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="dialogSearch">查询</el-button>
                        <el-button @click="dialogReset">清空</el-button>
                    </div>
                </div>
                <div class="content">
                    <div class="list" v-for="item in faceList" @click="ClickFaceImage(item)">
                        <div class="list_img">
                            <el-checkbox v-model="item.select"  class="checkbox"></el-checkbox>
                            <img :src="item.img">
                        </div>
                        <div class="list_info">
                            <span>姓名：{{item.name}}</span>
                            <span>{{item.sex}}</span>
                        </div>
                        <div class="list_info">
                            <span>PersonID：{{item.id}}</span>
                        </div>
                        <div class="list_info">
                            <span>类型：{{item.typeName}}</span>
                        </div>
                        <div class="list_info">
                            <span>编号：{{item.number}}&emsp;{{item.no}}</span>
                        </div>
                        <div class="list_info">
                            <span>图片来源：{{item.on}}</span>
                        </div>
                        <div class="list_info">
                            <span>入库时间：{{item.createTime}}</span>
                        </div>
                    </div>
                </div>
                <div class="page">
                    <el-pagination
                        @size-change="handleDialogSizeChange"
                        @current-change="handleDialogCurrentChange"
                        :current-page="facePage.page"
                        :page-sizes="[10, 20, 30, 50, 100]"
                        :page-size="facePage.pageCount"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="facePage.total">
                    </el-pagination>
                </div>
            </div>
            <span slot="footer">
                <el-button type="primary" @click="addGroupFaceDialog">确认添加</el-button>
                <el-button @click="addGroupFace = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { getGroupOne,getGroupTwo,getFaceShow } from '@/HttpApi/face/face'
    export default {
        name: "addGroupTwo",
        data(){
            return{
                groupid:'',
                stepTwoForm:{
                    one:'',
                    two:''
                },
                groupOneList:[],//一级分组列表
                groupTwoList:[],//二级分组列表
                stepTwoTableData:[],//人像列表
                page:{
                    page:1,
                    pageCount:10,
                    total:0
                },
                addGroupFace:false,
                dataDialogForm:{

                },
                faceList:[],
                facePage:{
                    page:1,
                    pageCount:10,
                    total:0
                }
            }
        },
        computed:{
            isSee(){
                return this.$route.query.type == 'see' ? true : false;
            }
        },
        methods:{
            ChangeTwoFormOne(){
                //选择一级分组
                this.getGroupTwoList();
            },
            getFaceShowList(){
                //添加人像
                this.addGroupFace = true;
                this.dialogSearch();
            },
            handleSelectionChange(){
                //选中

            },
            removeFaceImg(row){
                //删除
            },
            removeAll(row){
                //删除全部
            },
            ClickFaceImage(item){
                //点击图片
                if(item.select){
                    item.select = false;
                }else{
                    item.select = true;
                }
            },
            lastStep(){
                this.$router.push({path:'/Index/addgroupone',query:{id:this.groupid}})
            },
            ok(){
                //关闭所有
                this.$router.push({path:'/Index/faceList'})
            },
            dialogSearch(){
                //弹窗查询
                let params = {
                    // ...this.dataDialogForm,
                    ...this.facePage,
                };
                getFaceShow(params).then(({data})=>{
                    if(data.success){
                        if(data.data){
                            data.data.list.forEach((item)=>{
                                item.select = false;
                            });
                            this.faceList = data.data.list;
                        }else{
                            this.faceList = [];
                        }
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            dialogReset(){
                //弹窗清空
            },
            addGroupFaceDialog(){
                //确认添加人脸 发送添加关闭弹窗
                this.addGroupFace = false;
            },
            handleSizeChange(val){
                this.page.pageCount = val;
            },
            handleCurrentChange(val){
                this.page.page = val;
            },
            handleDialogSizeChange(val){
                this.facePage.pageCount = val;
            },
            handleDialogCurrentChange(val){
                this.facePage.page = val;
            },
            getGroupOneList(){
                let params = {
                    faceGroupID:this.groupid
                };
                getGroupOne(params).then(({data})=>{
                    if(data.success){
                        this.groupOneList = data.data ? data.data.list:[];
                    }else{
                        this.groupOneList = []
                    }
                });
            },
            getGroupTwoList(){
                let params = {
                    faceGroupID:this.groupid,
                    sub1:this.stepTwoForm.one
                };
                getGroupTwo(params).then(({data})=>{
                    if(data.success){
                        this.groupTwoList = data.data ? data.data.list:[];
                    }else{
                        this.groupTwoList = []
                    }
                })
            },
        },
        mounted(){
            this.groupid = this.$route.query.id;
            this.getGroupOneList();
        }
    }
</script>

<style lang="scss" scoped>
.add_group_two{
    font-size: 0.16rem;
    .add_group_content {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 30px;
        box-sizing: border-box;
        .addgroup_top{
            height: .6rem;
            display: flex;
            display: -webkit-flex;
            div{
                position: relative;
                background: #EFEDED;
                width: 48%;
                color: #666666;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                align-items: center;
                span{
                    text-align: center;
                    line-height: 0.28rem;
                    width: 0.28rem;
                    height: 0.28rem;
                    font-weight: 600;
                    margin-right: 0.1rem;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                    background: white;
                }
                &:after{
                    content: '';
                    display: block;
                    border-top: 0.3rem solid transparent;
                    border-bottom: 0.3rem solid transparent;
                    border-left: 0.4rem solid #EFEDED;
                    position: absolute;
                    right: -0.4rem;
                    top: 0;
                    z-index: 10;
                }
                &:before{
                    content: '';
                    display: block;
                    border-top: 0.3rem solid #EFEDED;
                    border-bottom: 0.3rem solid #EFEDED;
                    border-left: 0.4rem solid white;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                &:last-child{
                    margin-left: 18px;
                }
            }
            .active{
                color: white;
                background: #409EFF;
                span{
                    color: #409EFF;
                }
                &:after{
                    border-left: 0.4rem solid #409EFF;
                }
                &:before{
                    border-top: 0.3rem solid #409EFF;
                    border-bottom: 0.3rem solid #409EFF;
                }
            }
        }

        .steptwo{
            .steptwo_from{
                margin-top: 18px;
                border-bottom: 1px solid #EEEEEE;
            }
            .steptwo_table{
                margin-top: 18px;
                .steptwo_table_footer{
                    margin-top: 15px;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #EEEEEE;
                }
            }
            .add_group_footer{
                margin-top: 20px;
            }
        }

    }
    .add_group_face_dialog {
        .el-form {
            .el-select {
                width: 150px;
            }
            .el-input {
                width: 150px;
            }
        }
        .btn{
            height: 50px;
            line-height: 50px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            border-top: 1px solid #EEEEEE;
        }

        .content{
            display: flex;
            display: -webkit-flex;
            /*justify-content: space-between;*/
            flex-wrap: wrap;

            .list{
                width: 19%;
                margin: .1rem 0.5%;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                cursor: pointer;
                padding: .2rem;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;

                /*border: 1px solid transparent;*/
                border: 1px solid #409EFF;
                transition: 500ms ease-out;
                -moz-transition: 500ms ease-out; /* Firefox 4 */
                -webkit-transition: 500ms ease-out; /* Safari and Chrome */
                -o-transition: 500ms ease-out; /* Opera */
                &:hover{
                    box-shadow:0 5px 6px 0 rgba(196,196,196,0.5);
                }
                .list_img{
                    position: relative;
                    width: 100%;
                    .checkbox{
                        position: absolute;
                        /*width: 0.2rem;*/
                        /*height: 0.2rem;*/
                        top: -3px;
                        left: 0;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .list_info{
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    align-items: center;
                    height: .3rem;
                    font-size: .14rem;
                }
            }
        }

        .page{
            padding: 20px 0;
            text-align: right;
            border-bottom: 1px solid #EEEEEE;
            margin-bottom: 10px;
        }
    }
}
</style>