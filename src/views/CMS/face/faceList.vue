<template>
    <div class="facelist">
        <!-- 面包屑导航栏 -->
        <nav class="nav-Type">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
                <el-breadcrumb-item>人脸分组列表</el-breadcrumb-item>
            </el-breadcrumb>
        </nav>
        <div class="face_top">
            <h3>人脸分组列表</h3>
            <el-button type="primary" @click="updateFace">上传人脸图片</el-button>
        </div>
        <div class="content">
            <div class="face_list_form">
                <el-form :inline="true">
                    <el-form-item label="人脸分组名称">
                        <el-input :maxlength="400" v-model="formData.name" placeholder="请输入人脸分组名称"></el-input>
                    </el-form-item>
                    <el-form-item label="人脸分组ID">
                        <el-input :maxlength="400" v-model="formData.id" placeholder="请输入人脸分组ID"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input :maxlength="400" :disabled="userInfo.groupID==20" v-model="formData.createrName" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            class="user_list_form_time"
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="face_list_btn">
                    <div>
                        <el-button type="primary" @click="addGroup">创建分组</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">清空</el-button>
                    </div>
                </div>
            </div>
            <div class="face_list_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        label="人脸分组名称">
                        <template slot-scope="scope">
                            {{textLen(scope.row.name,16)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="id"
                        label="人脸分组ID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createTime"
                        label=" 创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="lastModifyTime"
                        label="修改时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="creatorName"
                        label="创建人">
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="see(scope.row)">查看</el-button>
                            <el-button type="text" @click="editGroup(scope.row)">修改分组</el-button>
                            <el-button type="text" @click="addFace(scope.row)">添加人像</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="face_list_footer">
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
            title="提示"
            class="face__upload_dialog"
            :visible.sync="dataDialogForm.uploadFaceDialog"
            width="890px">
            <h3>填写人员信息</h3>
            <el-form :inline="true" :model="dataDialogForm" :rules="DialogRules" ref="dataDialogForm" label-width="80px">
                <el-form-item label="图片来源" prop="picFromID" required>
                    <el-select v-model="dataDialogForm.picFromID" placeholder="请选择图片来源">
                        <el-option v-for="item in dataDialogForm.picList"
                                   :label="item.name"
                                   :value="item.id"
                                   :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编号" prop="noType" required>
                    <el-select v-model="dataDialogForm.noType" placeholder="请选择编号系统">
                        <el-option v-for="item in dataDialogForm.faceNoType"
                                   :label="item.name"
                                   :value="item.id"
                                   :key="item.id">
                        </el-option>
                    </el-select>
                    <el-input :maxlength="20" v-model="dataDialogForm.no" placeholder="请输入编号"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type" required>
                    <el-select v-model="dataDialogForm.type" placeholder="请选择类型">
                        <el-option v-for="item in dataDialogForm.faceType"
                                   :label="item.name"
                                   :value="item.id"
                                   :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="name" required>
                    <el-input :maxlength="6" v-model="dataDialogForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" required>
                    <el-select v-model="dataDialogForm.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="upload_face">
                <h3>上传图片</h3>
                <div class="upload">
                    <!--  action="https://jsonplaceholder.typicode.com/posts/"-->
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        accept="image/jpg,image/jpeg,image/png,image/x-ms-bmp"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <div v-else class="upload_info" >
                            <i class="el-icon-picture-outline"></i>
                            <p class="btn">点此添加图片</p>
                            <p>请上传用户正面，无遮挡照片</p>
                            <p>仅支持PNG、JPG、JPEG、BMP格式，大小5M以内</p>
                            <p>若包含多张人脸，则只注册图片中"可检测到的最大脸"</p>
                        </div>
                    </el-upload>
                </div>
            </div>
            <div class="face_list_dialog_footer">
                <div>
                    <el-button type="primary" @click="">批量添加</el-button>
                    <el-button type="text" @click="">下载批量添加模板</el-button>
                </div>
                <div>
                    <el-button type="primary" @click="commitFaceImage">确 定</el-button>
                    <el-button @click="dataDialogForm.uploadFaceDialog = false">取 消</el-button>
                </div>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import {textLen} from '@/lib/utils'
    import { getFaceList,uploadFaceImage,getFaceNoType,getFaceType,getPicList } from '@/HttpApi/face/face'
    export default {
        name: "userList",
        data() {
            let name = (rule, value, callback) => {
                if(value){
                    /*if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)){
                        return callback(new Error('请输入6-20位字母数字'));
                    }else{*/
                        return callback()
                    // }
                }else{
                    return callback(new Error('请输入姓名'))
                }
            };
            let noType = (rule, value, callback) => {
                if(value){
                    if(this.dataDialogForm.no === ''){
                        return callback(new Error('请输入编号'))
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请选择编号系统'))
                }
            };
            let picFromID = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请选择图片来源'))
                }
            };
            let type = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请选择类型'))
                }
            };
            let sex = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请选择性别'))
                }
            };
            return {
                textLen:textLen,
                formData:{
                    name:'',
                    id:'',
                    createrName:'',
                    dataTime:null
                },
                tableData:[],
                page:{
                    page:1,
                    pageSize:10,
                    total:0
                },
                dataDialogForm:{
                    picFromID:'',
                    noType:'',
                    no:'',
                    type:'',
                    name:'',
                    sex:'',
                    uploadFaceDialog:false,
                    picList:[],
                    faceType:[],
                    faceNoType:[],
                },
                imageUrl: '',//base64图片url
                faceImgUrl:'',//发送后端url
                DialogRules:{
                    name:[
                        {validator:name,trigger:['blur','change']}
                    ],
                    noType:[
                        {validator:noType,trigger:['blur','change']}
                    ],
                    picFromID:[
                        {validator:picFromID,trigger:['blur','change']}
                    ],
                    type:[
                        {validator:type,trigger:['blur','change']}
                    ],
                    sex:[
                        {validator:sex,trigger:['blur','change']}
                    ]
                },
                userInfo:{
                    userName:'',//用户姓名
                    userImg:'',//用户头头像
                    uid:'',//用户ID
                    groupID:'',//用户身份
                }
            }
        },
        methods: {
            updateFace(){
                this.dataDialogForm= {
                    picFromID:'',
                        noType:'',
                        no:'',
                        type:'',
                        name:'',
                        sex:'',
                        uploadFaceDialog:false,
                        faceType:[],
                        faceNoType:[],
                };
                this.imageUrl = '';
                this.faceImgUrl = '';
                this.dataDialogForm.uploadFaceDialog = true;
                //获取图片来源
                getPicList().then(({data})=>{
                    if(data.success){
                        this.dataDialogForm.picList = data.data?data.data.list:[];
                    }else{
                        this.$message.warning('获取图片来源列表失败')
                    }
                });
                //获取图片编号
                getFaceNoType().then(({data})=>{
                    if(data.success){
                        this.dataDialogForm.faceNoType = data.data?data.data.list:[];
                    }else{
                        this.$message.warning('获取图片编号列表失败')
                    }
                });
                //获取类型
                getFaceType().then(({data})=>{
                    if(data.success){
                        this.dataDialogForm.faceType = data.data?data.data.list:[];
                    }else{
                        this.$message.warning('获取类型列表失败')
                    }
                })
            },
            addGroup(){
                this.$router.push({path:'/Index/addgroupone',query:{type:'1'}})
            },
            search(){
                let params = {
                    ...this.formData,...this.page,
                    faceGroupNames :this.formData.name/* ? this.formData.name.split(',') : ''*/,
                    faceGroupIds:this.formData.id/* ? this.formData.id.split(','):''*/,
                    faceGroupCreators:this.formData.createName /*?this.formData.createName.split(","):''*/,
                    creatTimeStart:this.formData.dataTime?this.formData.dataTime[0]:'',
                    creatTimeEnd:this.formData.dataTime?this.formData.dataTime[1]:''
                };
                getFaceList(params).then(({data})=>{
                    if(data.success){
                        this.tableData = data.data.list;
                        this.page.total = data.pagerManager.totalResults;
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            reset(){
                this.formData = {
                    name:'',
                    id:'',
                    createrName:'',
                    dataTime:null
                };
                if(this.userInfo.groupID==20){
                    this.formData.createName = this.userInfo.userName;
                }
                this.search();
            },
            see(row){
                this.$router.push({path:'/Index/addgroupone',query:{id:row.id,type:'2'}})
            },
            editGroup(row){
                this.$router.push({path:'/Index/addgroupone',query:{id:row.id,type:'3'}})
            },
            addFace(row){
                this.$router.push({path:'/Index/addgrouptwo',query:{id:row.id,type:'3'}})
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search()
            },
            handleAvatarSuccess(res, file) {
                var that = this;
                var imgurl = '';
                var reader = new FileReader();
                reader.readAsDataURL(res.raw);
                reader.onload = function(e){
                    this.result; // base64编码
                    imgurl = this.result;
                    uploadFaceImage({imageBase64:this.result}).then(({data})=>{
                        if(data.success){
                            that.faceImgUrl = data.data.url;
                            that.imageUrl = imgurl;
                        }else{
                            that.$message.warning(data.errorInfo)
                        }
                    })
                };

            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpg' || file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/x-ms-bmp";
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG JPEG PNG BMP 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isJPG && isLt2M;
            },
            commitFaceImage(){
                console.log(this.imageUrl);
                this.$refs['dataDialogForm'].validate((valid) => {
                    if (valid) {
                        if(this.imageUrl == ''){
                            this.$message.warning('请上传人脸图片');
                            return;
                        }

                        /*createUser(params).then(({data})=>{
                            if(data.success){
                                this.$message.success('添加成功');
                                this.search();
                                this.userListAddDialog = false;
                            }else{
                                this.$message.warning(data.errorInfo)
                            }
                        })*/
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted(){
            this.userInfo = JSON.parse(this.Cookies.get('userInfo'));
            if(this.userInfo.groupID==20){
                this.formData.createName = this.userInfo.userName;
            }
            this.search();
        }
    }
</script>

<style lang="scss" scoped>
    .facelist{
        font-size: .16rem;
        .face_top{
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px;
        }
        .content{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding: 30px;
            box-sizing: border-box;
            .face_list_form{
                position: relative;
                .el-form{
                    border-bottom: 1px solid #eeeeee;
                    .el-form-item__label{
                        color: #666666;
                    }
                    .user_list_form_status{
                        width: 120px;
                    }
                    .user_list_form_time{
                        width: 300px;
                    }
                }
            }
            .face_list_btn{
                height: 50px;
                line-height: 50px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
            }
            .face_list_footer{
                margin-top: 10px;
                text-align: right;
            }
        }
    }
    .face__upload_dialog{
        h3{
            color: #666666;
            font-size: 14px;
        }
        .el-form{
            .el-select{
                width: 140px;
            }
            .el-input{
                width: 140px;
            }
        }
        .upload_face{
            width: 100%;
            height: 280px;
            display: flex;
            display: -webkit-flex;
            .upload{
                margin-left: 20px;
                width: 90%;
                display: flex;
                display: -webkit-flex;
                justify-content: space-around;
                border:1px dashed #eeeeee;
                background: #f6f6f6;
                .avatar-uploader{
                    height: 100%;
                    width: 50%;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    justify-content: space-around;

                    img{
                        /*width: 100%;*/
                        height: 100%;
                        overflow: hidden;
                    }
                    .el-icon-picture-outline{
                        font-size: 56px;
                        color: #cccccc;
                    }
                    .upload_info{
                        display: flex;
                        display: -webkit-flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: space-around;
                        p{
                            line-height: 20px;
                            color: #A5A5A5;
                            font-size: 12px;
                        }
                        .btn{
                            width: 140px;
                            height: 36px;
                            text-align: center;
                            line-height: 36px;
                            color: white;
                            margin: 5px;
                            -webkit-border-radius: 5px;
                            -moz-border-radius: 5px;
                            border-radius: 5px;
                            background: #409EFF;
                        }

                    }
                }
            }
        }

        .face_list_dialog_footer{
            height: 50px;
            line-height: 50px;
            margin-top: 15px;
            padding: 10px 0 15px 0;
            border-top: 1px solid #eeeeee;
            display: flex;
            display: -webkit-flex;
            div{
                width: 46%;
            }

        }
    }
</style>
