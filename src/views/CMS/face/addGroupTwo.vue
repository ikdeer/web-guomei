<template>
    <div class="add_group_two">
        <!-- 面包屑导航栏 -->
        <nav class="nav-Type">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/Index/faceList'}">人脸分组管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{isSee?'查看分组':isEdit?'编辑分组':'创建分组'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </nav>
        <h3>{{isSee?'查看分组':isEdit?'编辑分组':'创建分组'}}</h3>
        <div class="add_group_content">
            <div class="addgroup_top">
                <div @click="lastStep"><span>1</span>第一步 设置分组</div>
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
                            <el-select v-model="stepTwoForm.two" @change="getFaceGroupShowList" placeholder="请选择二级分组">
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
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="sexName"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="personID"
                            label="personID">
                        </el-table-column>
                        <el-table-column
                            prop="typeName"
                            label="人员类型">
                        </el-table-column>
                        <el-table-column
                            prop="noTypeName"
                            label="编号系统">
                        </el-table-column>
                        <el-table-column
                            prop="no"
                            label="编号">
                        </el-table-column>
                        <el-table-column
                            prop="picFromName"
                            label="图片来源">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="添加时间">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <temalate slot-scope="scope">
                                <el-button type="text" :disabled="isSee" @click="removeFaceImg(scope.row)">删除</el-button>
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
            width="1000px">
            <div>
                <div class="from">
                    <el-form :inline="true" ref="dataDialogForm" label-width="80px">
                        <el-form-item label="图片来源">
                            <el-select v-model="dataDialogForm.picFromIDs" placeholder="请选择图片来源">
                                <el-option v-for="item in picList"
                                           :label="item.name"
                                           :value="item.id"
                                           :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="编号">
                            <el-select v-model="dataDialogForm.noType" placeholder="请选择编号系统">
                                <el-option v-for="item in faceNoType"
                                           :label="item.name"
                                           :value="item.id"
                                           :key="item.id">
                                </el-option>
                            </el-select>
                            <el-input :maxlength="200" v-model="dataDialogForm.nos" placeholder="请输入编号"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="dataDialogForm.types" placeholder="请选择类型">
                                <el-option v-for="item in faceType"
                                           :label="item.name"
                                           :value="item.id"
                                           :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input :maxlength="200" v-model="dataDialogForm.names" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select v-model="dataDialogForm.sex" placeholder="请选择性别">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                                <el-option label="未知" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="PersonID">
                            <el-input :maxlength="200" v-model="dataDialogForm.ids" placeholder="请输入PersonID"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btn">
                    <div>
                        <el-button type="primary" @click="">批量添加</el-button>
                        <el-button type="text" @click="">下载批量添加模板</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="dialogSearch(1)">查询</el-button>
                        <el-button @click="dialogReset">清空</el-button>
                    </div>
                </div>
                <div class="content">
                    <div class="list" v-for="item in faceList">
                        <div class="list_img">
                            <el-checkbox v-model="item.select" @change="ClickFaceImage(item)" class="checkbox"></el-checkbox>
                            <img :src="item.url">
                        </div>
                        <div class="list_info">
                            <span>姓名：{{item.name}}</span>
                            <span>{{item.sexName}}</span>
                        </div>
                        <div class="list_info">
                            <span>PersonID：{{item.personID}}</span>
                        </div>
                        <div class="list_info">
                            <span>类型：{{item.typeName}}</span>
                        </div>
                        <div class="list_info">
                            <span>编号：{{item.number}}&emsp;{{item.no}}</span>
                        </div>
                        <div class="list_info">
                            <span>图片来源：{{item.picFromName}}</span>
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
    import { getGroupOne,getGroupTwo,getFaceShow,addFace,getFaceGroupShow,deleteFaceGroup,getPicList,getFaceNoType,getFaceType } from '@/HttpApi/face/face'
    export default {
        name: "addGroupTwo",
        data(){
            return{
                groupid:'',
                type:'1',
                stepTwoForm:{
                    one:'',
                    two:''
                },
                groupOneList:[],//一级分组列表
                groupTwoList:[],//二级分组列表
                tableData:[],//人像列表
                selectionData:[],//全选值
                page:{
                    page:1,
                    pageCount:10,
                    total:0
                },
                addGroupFace:false,
                dataDialogForm:{
                    names:'',
                    ids:'',
                    nos:'',
                    noType:'',
                    picFromIDs:'',
                    sex:'',
                    types:'',
                },
                faceList:[],//人脸集合
                faceListBirge:[],//选中集合
                facePage:{
                    page:1,
                    pageCount:10,
                    total:0
                },
                picList:[],//图片来源
                faceType:[],//人脸类型
                faceNoType:[],//编号系统
            }
        },
        computed:{
            isSee(){
                return this.$route.query.type == '2' ? true : false;
            },
            isEdit(){
                return this.$route.query.type == '3' ? true : false;
            }
        },
        methods:{
            ChangeTwoFormOne(){
                //选择一级分组
                this.getGroupTwoList();
            },
            getFaceShowList(){
                //添加人像
                this.dataDialogForm = {
                    names:'',
                    ids:'',
                    nos:'',
                    noType:'',
                    picFromIDs:'',
                    sex:'',
                    types:'',
                };
                this.faceList = [];
                this.faceListBirge = [];
                this.dialogSearch(1);
                this.addGroupFace = true;
            },
            handleSelectionChange(val){
                //选中
                this.selectionData = val;
            },
            removeFaceImg(row){
                //删除
                let params = {
                    ids:[row.id]
                };
                deleteFaceGroup(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.$message.warning('删除成功')
                        this.getFaceGroupShowList();
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            removeAll(){
                //删除全部
                let arr = [];
                this.selectionData.forEach((item)=>{
                    arr.push(item.id);
                });
                let params = {
                    faceGroupID:this.groupid,
                    sub1:this.stepTwoForm.one,
                    sub2:this.stepTwoForm.two,
                    ids:arr
                };
                deleteFaceGroup(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.$message.warning('删除成功');
                        this.getFaceGroupShowList();
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            ClickFaceImage(item){
                //点击图片
                if(item.select){
                    this.faceListBirge.push(item.id);
                }else{
                    this.faceListBirge = this.faceListBirge.filter( ins => item.id != ins )
                }
            },
            lastStep(){
                this.$router.push({path:'/Index/addgroupone',query:{id:this.groupid,type:this.type}})
            },
            ok(){
                //关闭所有
                this.$router.push({path:'/Index/faceList'})
            },
            dialogSearch(page){
                //弹窗查询
                if(page==1){
                    this.facePage = {
                        page:1,
                        pageCount:10,
                        total:0
                    }
                }
                let params = {
                    ...this.dataDialogForm,
                    ...this.facePage,
                };
                getFaceShow(params).then(({data})=>{
                    if(data.errorCode ==200){
                        if(data.data){
                            data.data.list.forEach((item)=>{
                                item.select = false;
                            });
                            this.faceList = data.data.list;
                            this.facePage.total = data.pagerManager.totalResults

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
                this.dataDialogForm = {
                    names:'',
                    ids:'',
                    nos:'',
                    noType:'',
                    picFromIDs:'',
                    sex:'',
                    types:'',
                };
                this.dialogSearch(1);
            },
            addGroupFaceDialog(){
                //确认添加人脸 发送添加关闭弹窗
                console.log(this.faceListBirge);
                let params = {
                    faceGroupID:this.groupid,
                    ids:this.faceListBirge,
                    sub1:this.stepTwoForm.one,
                    sub2:this.stepTwoForm.two
                };
                addFace(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.$message.success('添加成功');
                        this.faceListBirge = [];
                        this.getFaceGroupShowList();
                        this.addGroupFace = false;
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                });
            },
            getFaceGroupShowList(){
                this.page = {
                    page:1,
                    pageCount:10,
                    total:0
                };
                let params = {
                    ...this.page,
                    faceGroupID:this.groupid,
                    sub1:this.stepTwoForm.one,
                    sub2:this.stepTwoForm.two
                };
                getFaceGroupShow(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.tableData = data.data?data.data.list:[];
                    }else{
                        this.tableData = [];
                        // this.$message.warning(data.errorInfo)
                    }
                })
            },
            handleSizeChange(val){
                this.page.pageCount = val;
                this.getFaceGroupShowList();
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.getFaceGroupShowList();
            },
            handleDialogSizeChange(val){
                this.facePage.pageCount = val;
                this.dialogSearch();
            },
            handleDialogCurrentChange(val){
                this.facePage.page = val;
                this.dialogSearch();
            },
            getGroupOneList(){
                let params = {
                    faceGroupID:this.groupid
                };
                getGroupOne(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.groupOneList = data.data ? data.data.list:[];
                    }else{
                        this.groupOneList = []
                    }
                });

                //获取图片来源
                getPicList().then(({data})=>{
                    if(data.errorCode ==200){
                        this.picList = data.data?data.data.list:[];
                    }else{
                        this.$message.warning('获取图片来源列表失败')
                    }
                });
                //获取图片编号
                getFaceNoType().then(({data})=>{
                    if(data.errorCode ==200){
                        this.faceNoType = data.data?data.data.list:[];
                    }else{
                        this.$message.warning('获取图片编号列表失败')
                    }
                });
                //获取类型
                getFaceType().then(({data})=>{
                    if(data.errorCode ==200){
                        this.faceType = data.data?data.data.list:[];
                    }else{
                        this.$message.warning('获取类型列表失败')
                    }
                })
            },
            getGroupTwoList(){
                let params = {
                    faceGroupID:this.groupid,
                    sub1:this.stepTwoForm.one
                };
                getGroupTwo(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.groupTwoList = data.data ? data.data.list:[];
                    }else{
                        this.groupTwoList = []
                    }
                })
            },
        },
        mounted(){
            this.groupid = this.$route.query.id;
            this.type = this.$route.query.type || '1';
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
            height: 50px;
            display: flex;
            display: -webkit-flex;
            div{
                position: relative;
                background: #EFEDED;
                width: 48%;
                color: #666666;
                font-size: 14px;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                span{
                    text-align: center;
                    line-height: 24px;
                    width: 24px;
                    height: 24px;
                    font-weight: 600;
                    margin-right: 10px;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                    background: white;
                }
                &:after{
                    content: '';
                    display: block;
                    border-top: 25px solid transparent;
                    border-bottom: 25px solid transparent;
                    border-left: 30px solid #EFEDED;
                    position: absolute;
                    right: -30px;
                    top: 0;
                    z-index: 10;
                }
                &:before{
                    content: '';
                    display: block;
                    border-top: 25px solid #EFEDED;
                    border-bottom: 25px solid #EFEDED;
                    border-left: 30px solid white;
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
                    border-left: 30px solid #409EFF;
                }
                &:before{
                    border-top: 25px solid #409EFF;
                    border-bottom: 25px solid #409EFF;
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
                padding: 10px;
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
                    width: 160px;
                    height: 160px;
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