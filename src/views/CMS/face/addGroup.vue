<template>
    <div class="add_group">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>创建分组</h3>
        <div class="add_group_content">
            <div class="addgroup_top">
                <div :class="{active:step===1}"><span>1</span>第一步 设置分组</div>
                <div :class="{active:step===2}"><span>2</span>第二步 添加人像</div>
            </div>
            <div v-if="step===1" class="stepone">
                <div class="set_group">
                    <h3>设置分组</h3>
                    <div class="set_group_inp">
                        <el-form :inline="true" label-width="100px">
                            <el-form-item label="分组名称" required>
                                <el-input :maxlength="11" v-model="groupData.name" placeholder="请输入人脸分组名称"></el-input>
                                <el-button type="primary" @click="">保存</el-button>
                            </el-form-item>
                            <el-form-item label="分组ID" required>
                                <el-input v-model="groupData.id" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="set_child_group">
                    <h3>设置子分组 <span>请注意一级分组不可添加图片</span></h3>
                    <div class="set_group_childinp">
                        <el-form :inline="true" label-width="110px">
                            <el-form-item label="一级分组名称" required>
                                <el-input :maxlength="20" v-model="groupChildData.oneName" placeholder="20汉字以内"></el-input>
                                <el-button type="primary" @click="addGroupOne">保存</el-button>
                                <el-button type="primary" @click="deleteGroupOne">删除</el-button>
                            </el-form-item>
                            <el-form-item label="二级分组名称" required>
                                <el-input :maxlength="20" v-model="groupChildData.twoName" placeholder="20汉字以内"></el-input>
                                <el-button type="primary" @click="addGroupTwo">保存</el-button>
                                <el-button type="primary" @click="deleteGroupTwo">删除</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="group_list">
                            <div class="group_item_list">
                                <div class="item">
                                    <p v-for="item in groupOneList">
                                        <span>{{item.title}}</span>
                                    </p>
                                </div>

                            </div>
                            <div class="group_item_list">
                                <div class="item">
                                    <p v-for="item in groupTwoList">
                                        <span>{{item.title}}</span>
                                        <span>{{item.face}}</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="add_group_footer">
                    <el-button type="primary" @click="nextStep">下一步</el-button>
                    <el-button @click="$router.back()">取 消</el-button>
                </div>
            </div>
            <div v-if="step===2" class="steptwo">
                <div class="steptwo_from">
                    <el-form :inline="true">
                        <el-form-item label="选择分组">
                            <el-select v-model="stepTwoForm.one" placeholder="请选择一级分组">
                                <el-option label="国美员工" value="0"></el-option>
                                <el-option label="国美会员" value="1"></el-option>
                                <el-option label="游客" value="3"></el-option>
                            </el-select>
                            <el-select v-model="stepTwoForm.two" placeholder="请选择二级分组">
                                <el-option label="国美员工" value="0"></el-option>
                                <el-option label="国美会员" value="1"></el-option>
                                <el-option label="游客" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addGroupFace = true;">添加人像</el-button>
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
                            prop="address"
                            label="PersonID">
                        </el-table-column>
                        <el-table-column
                            prop="type"
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
                            prop="img"
                            label="图片来源">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="添加时间">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <temalate slot-scope="scope">
                                <el-button type="text" @click="">删除</el-button>
                            </temalate>
                        </el-table-column>
                    </el-table>
                    <div class="steptwo_table_footer">
                        <el-button @click="">批量删除</el-button>
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
                    <el-button @click="">完成</el-button>
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
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">清空</el-button>
                    </div>
                </div>
                <div class="content">
                    <div class="list" v-for="item in faceList">
                        <div class="list_img">
                            <el-checkbox size="" class="checkbox"></el-checkbox>
                            <img :src="item.img">
                        </div>
                        <div class="list_info">
                            <span>姓名：{{item.username}}</span>
                            <span>{{item.sex}}</span>
                        </div>
                        <div class="list_info">
                            <span>PersonID：{{item.id}}</span>
                        </div>
                        <div class="list_info">
                            <span>类型：{{item.type}}</span>
                        </div>
                        <div class="list_info">
                            <span>编号：{{item.number}}&emsp;{{item.number}}</span>
                        </div>
                        <div class="list_info">
                            <span>图片来源：{{item.on}}</span>
                        </div>
                        <div class="list_info">
                            <span>入库时间：{{item.time}}</span>
                        </div>
                    </div>
                </div>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
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
    import { createGroupOne,createGroupTwo,deleteGroupOne,deleteGroupTwo,getGroupOne,getGroupTwo } from '@/HttpApi/face/face'
    export default {
        name: "addGroup",
        data(){
            return{
                step:1,
                groupData:{
                    name:'',
                    id:''
                },
                groupChildData:{
                    oneId:'',
                    oneName:'',
                    twoId:'',
                    twoName:''
                },
                groupOneList:[{
                    title:'adadfasf'
                },{
                    title:'adadfasf'
                }],
                groupTwoList:[{
                    title:'adadfasf',
                    face:12
                },{
                    title:'adadfasf',
                    face:12
                }],
                stepTwoForm:{
                    one:'',
                    two:'',
                },
                stepTwoTableData:[],
                page:{
                    page:1,
                    pageCount:10,
                    total:0
                },
                addGroupFace:false,
                dataDialogForm:{

                },
                faceList:[{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                },{
                    img:'https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/thumbnail_e5fd338671b6409bbbf1b0dd40862eff.jpg',
                    username:'dafaf123',
                    sex:'男',
                    id:1231,
                    type:'pds',
                    number:'adfaf',
                    on:'信息',
                    time:'2019-12-31 12:12:22'
                }
                ],
                facePage:{
                    page:1,
                    pageCount:10,
                    total:0
                }

            }
        },
        methods:{
            nextStep(){
                this.step = 2;
            },
            lastStep(){
                this.step = 1;
            },

            addGroupOne(){
                //创建一级分组
                if(!this.groupChildData.oneName){
                    return;
                }
                createGroupOne({name:this.groupChildData.oneName}).then(({data})=>{
                    if(data.success){
                        this.$message.success('创建成功');
                        this.getGroup();
                        this.groupChildData.oneName = '';
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            addGroupTwo(){
                if(!this.groupChildData.twoName){
                    this.$message.warning('请输入文字');
                    return;
                }
                createGroupTwo({name:this.groupChildData.twoName}).then(({data})=>{
                    if(data.success){
                        this.$message.success('创建成功');
                        this.getGroup();
                        this.groupChildData.twoName = '';
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            deleteGroupOne(){
                if(!this.groupChildData.oneId){
                    this.$message.warning('请选中要删除的分组');
                    return;
                }
                deleteGroupOne().then(({data})=>{
                    if(data.success){
                        this.$message.success('删除成功');
                        this.getGroup();
                        this.groupChildData.oneId = '';
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            deleteGroupTwo(){
                if(!this.groupChildData.twoId){
                    this.$message.warning('请选中要删除的分组');
                    return;
                }
                deleteGroupTwo({name:this.groupChildData.twoName}).then(({data})=>{
                    if(data.success){
                        this.$message.success('删除成功');
                        this.getGroup();
                        this.groupChildData.twoId = '';
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },

            handleSelectionChange(){
                // 选中
            },
            handleSizeChange(val){
                this.page.pageCount = val;
            },
            handleCurrentChange(val){
                this.page.page = val;
            },
            addGroupFaceDialog(){
                // 确认添加人脸
            },
            search(){

            },
            reset(){

            },
            getGroup(){
                getGroupOne().then(({data})=>{

                });
                getGroupTwo().then(({data})=>{

                })
            }
        },
        mounted(){
            this.getGroup();
        }
    }
</script>

<style lang="scss" scoped>
.add_group{
    font-size: 0.16rem;
    .add_group_content{
        background:rgba(255,255,255,1);
        box-shadow:0 2px 4px 1px rgba(0,0,0,0.1);
        border-radius:10px;
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

        .stepone{
            .set_group{
                .el-form{
                    padding: .3rem;
                    .el-form-item{
                        width: 48%;
                    }
                    .el-input{
                        width: 300px;
                    }
                }
            }

            .set_child_group{
                h3{
                    span{
                        font-size: 12px;
                        color: #F56C6C;
                        margin-left: 10px;
                    }
                }
                .el-form{
                    padding:0.1rem .3rem;
                    .el-form-item{
                        width: 48%;
                    }
                    .el-input{
                        width: 280px;
                    }
                }
                .group_list{
                    display: flex;
                    display: -webkit-flex;

                    .group_item_list{
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        width: 50%;
                        &:first-child{
                            margin-left: 130px;
                        }
                        &:last-child{
                            margin-left: 80px;
                        }
                        margin-left: 100px;
                        .item{
                            width: 4rem;
                            height: 2rem;
                            border: 1px solid #999999;
                            overflow-y: auto;
                            -webkit-border-radius: 5px;
                            -moz-border-radius: 5px;
                            border-radius: 5px;
                            color: #999999;
                            p{
                                padding: 0 15px;
                                display: flex;
                                display: -webkit-flex;
                                justify-content: space-between;
                                line-height: 30px;
                                cursor: pointer;
                            }
                        }

                    }
                }
            }

            .add_group_footer{
                margin: 20px 0 0 30px;
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
            justify-content: space-between;
            flex-wrap: wrap;

            .list{
                width: 19%;
                margin: .1rem 0;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;

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