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
                            :picker-options="pickerOptions"
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
                        <el-button type="primary" @click="searchList">查询</el-button>
                        <el-button @click="reset">清空</el-button>
                    </div>
                </div>
            </div>
            <div class="face_list_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <!-- //暂无数据提示 -->
                    <template slot="empty">
                        <span>你还未创建分组</span>
                    </template>
                    <el-table-column align="center" label="人脸分组名称">
                        <template slot-scope="scope">
                            {{textLen(scope.row.name,16)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="id" label="人脸分组ID"></el-table-column>
                    <el-table-column align="center" prop="createTime" label=" 创建时间"></el-table-column>
                    <el-table-column align="center" prop="lastModifyTime" label="修改时间"></el-table-column>
                    <el-table-column align="center" prop="creatorName" label="创建人"></el-table-column>
                    <el-table-column label="操作" align="center">
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
            title="上传人脸图片"
            class="face__upload_dialog"
            :visible.sync="dataDialogForm.uploadFaceDialog"
            @close="closeDialog"
            width="900px">
            <h3>填写人员信息</h3>
            <el-form :inline="true" :model="dataDialogForm" :rules="DialogRules" ref="dataDialogForm" label-width="80px">
                <el-form-item label="图片来源" prop="picFromID" required>
                    <el-select v-model="dataDialogForm.picFromID" placeholder="请选择图片来源">
                        <el-option v-for="item in picList"
                                   :label="item.name"
                                   :value="item.id"
                                   :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编号" prop="noType" required>
                    <el-select v-model="dataDialogForm.noType" placeholder="请选择编号系统">
                        <el-option v-for="item in faceNoType"
                                   :label="item.name"
                                   :value="item.id"
                                   :key="item.id">
                        </el-option>
                    </el-select>
                    <el-input :maxlength="20" v-model="dataDialogForm.no" placeholder="请输入编号"></el-input>
                </el-form-item>
                <el-form-item label="类型"  prop="type" required>
                    <el-select v-model="dataDialogForm.type" disabled placeholder="请选择类型">
                        <el-option v-for="item in faceType"
                                   :label="item.name"
                                   :value="item.id"
                                   :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="name" required>
                    <el-input :maxlength="6" disabled v-model="dataDialogForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" required>
                    <el-select disabled v-model="dataDialogForm.sex" placeholder="请选择性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="upload_face">
                <h3>上传图片</h3>
                <div class="upload">
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        accept="image/jpg,image/jpeg,image/png,image/bmp"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <div v-else class="upload_info" >
                            <i class="el-icon-picture-outline"></i>
                            <p class="btn">点此添加图片</p>
                            <p>请上传用户正面，无遮挡照片</p>
                            <p>仅支持PNG、JPG、JPEG、BMP格式，大小5M，像素4000*3000以内</p>
                            <p>注册图片暂不支持多张人脸</p>
                        </div>
                    </el-upload>
                </div>
            </div>
            <div class="face_list_dialog_footer">
                <div>
                    <el-upload
                        class="upload_footer"
                        :disabled="uploadLoading"
                        :headers="headers"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="uploadFillSuccess"
                        :on-error="uploadFillError"
                        :before-upload="allhandleChange">
                        <el-button type="primary" :loading="uploadLoading">批量添加</el-button>
                    </el-upload>
                    <a href="/static/fill/face.zip" download="" title="下载">
                        <el-button type="text">下载批量添加模板</el-button>
                    </a>
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
    import {textLen,formatTimes,base64} from '@/lib/utils';
    import { getFaceList,uploadFaceImage,getFaceNoType,getFaceType,getPicList,getGroupChildremTwo,uploadUrl,createFace } from '@/HttpApi/face/face'
    export default {
        name: "userList",
        data() {
            let name = (rule, value, callback) => {
                if(value){
                    return callback()
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
                uploadUrl:uploadUrl,
                formData:{
                    name:'',
                    id:'',
                    createrName:'',
                    dataTime:null,
                },
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 1);
                                end = new Date(new Date(end).getTime() - 3600 * 1000 * 24 * 1);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '近7天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 7);
                                end = new Date(new Date(end));
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '近30天',
                            onClick(picker) {
                                let start = formatTimes(new Date(), true) + ' 00:00:00';
                                let end = formatTimes(new Date(), true) + ' 23:59:59';
                                start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 30);
                                end = new Date(new Date(end));
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
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
                },
                picList:[],
                faceType:[],
                faceNoType:[],
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
                },
                uploadLoading:false,
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
                };
                this.picList=[];
                this.faceType=[];
                this.faceNoType=[];
                this.imageUrl = '';
                this.faceImgUrl = '';
                this.dataDialogForm.uploadFaceDialog = true;
                //获取图片来源
                getPicList().then(({data})=>{
                    if(data.errorCode ==200){
                        this.picList = data.data?data.data.list:[];
                    }else{
                        this.picList = [];
                        this.$message.warning('获取图片来源列表失败')
                    }
                });
                //获取图片编号
                getFaceNoType().then(({data})=>{
                    if(data.errorCode ==200){
                        this.faceNoType = data.data?data.data.list:[];
                    }else{
                        this.faceNoType = [];
                        this.$message.warning('获取图片编号列表失败')
                    }
                });
                //获取类型
                getFaceType().then(({data})=>{
                    if(data.errorCode ==200){
                        this.faceType = data.data?data.data.list:[];
                    }else{
                        this.faceType = [];
                        this.$message.warning('获取类型列表失败')
                    }
                })
            },
            addGroup(){
                this.$router.push({path:'/Index/addgroupone',query:{type:'1'}})
            },
            searchList(){
                if (this.formData.name == '' && this.formData.id == '' && this.formData.createrName == '' && this.formData.dataTime == null){
                    this.$message.warning('请输入查询条件');
                    return;
                }
                this.search(1)
            },
            search(page){
                let nameArr = this.formData.name.replace('，',',').split(',');
                let idArr = this.formData.id.replace('，',',').split(',');
                let createrNameArr = this.formData.createrName.replace('，',',').split(',');
                if(nameArr.length > 10 ){
                    this.$message.warning('分组名称查询最多支持十条');
                    return;
                }
                if(idArr.length > 10 ){
                    this.$message.warning('分组ID查询最多支持十条');
                    return;
                }
                if(createrNameArr.length > 10 ){
                    this.$message.warning('创建人查询最多支持十条');
                    return;
                }
                if(page==1){
                    this.page.page = 1;
                }
                let params = {
                    ...this.formData,...this.page,
                    faceGroupNames :this.formData.name,
                    faceGroupIds:this.formData.id,
                    faceGroupCreators:this.formData.createrName,
                    createTimeStart:this.formData.dataTime?this.formData.dataTime[0]:'',
                    createTimeEnd:this.formData.dataTime?this.formData.dataTime[1]:''
                };
                getFaceList(params).then(({data})=>{
                    if(data.errorCode ==200){
                        this.tableData = data.data?data.data.list:[];
                        this.page.total = data.pagerManager?data.pagerManager.totalResults:0;
                    }else{
                        this.tableData = [];
                        this.page.total =0;
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
                    this.formData.createrName = this.userInfo.userName;
                }
                this.search(1);
            },
            see(row){
                this.$router.push({path:'/Index/addgroupone',query:{id:row.id,type:'2'}})
            },
            editGroup(row){
                this.$router.push({path:'/Index/addgroupone',query:{id:row.id,type:'3'}})
            },
            addFace(row){
                getGroupChildremTwo({id:row.id}).then(({data})=>{
                    if(data.errorCode ==200){
                        if(data.data.count > 0){
                            this.$router.push({path:'/Index/addgrouptwo',query:{id:row.id,type:'3'}})
                        }else{
                            this.$message.warning('请先创建二级子分组')
                        }
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                });
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.page.page = 1;
                this.search(2)
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search(2)
            },
            handleAvatarSuccess(file, fileList) {
              console.log(file.raw);
              const isJPG = file.raw.type === 'image/jpg' || file.raw.type === "image/jpeg" || file.raw.type === "image/png" || file.raw.type === "image/bmp";
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG JPEG PNG BMP 格式!');
                    return;
                }
                if (!isLt5M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                    return;
                }
                var that = this;
                base64(file.raw,function (imgurl) {
                    that.imageUrl = '';
                    console.log(imgurl);
                    uploadFaceImage({imageBase64:imgurl}).then(({data})=>{
                        if(data.errorCode ==200){
                            that.imageUrl = imgurl;
                        }else{
                            that.imageUrl = '';
                            that.$message.warning(data.errorInfo)
                        }
                    })
                })
            },
            commitFaceImage(){
                this.$refs['dataDialogForm'].validate((valid) => {
                    if (valid) {
                        if(this.imageUrl == ''){
                            this.$message.warning('请上传人脸图片');
                            return;
                        }
                        let params = {
                            ...this.dataDialogForm,
                            imageBase64:this.imageUrl
                        };
                        createFace(params).then(({data})=>{
                            if(data.errorCode ==200){
                                this.$message.success('上传成功');
                                this.dataDialogForm.uploadFaceDialog = false
                            }else{
                                this.$message.warning(data.errorInfo)
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            allhandleChange(){
                this.uploadLoading = true;
            },
            uploadFillSuccess(res,file,fileList){
                this.uploadLoading = false;
                if(res.success){
                    this.$message.success('上传成功');
                    this.dataDialogForm.uploadFaceDialog = false;
                    this.search(1);
                }else{
                    console.log(this.uploadLoading);
                    this.$message.warning(res.errorInfo)
                }
            },
            uploadFillError(){
                this.uploadLoading = false;
            },
            closeDialog(){
                this.dataDialogForm = {
                    picFromID:'',
                    noType:'',
                    no:'',
                    type:'',
                    name:'',
                    sex:'',
                    uploadFaceDialog:false,
                };
                this.$refs['dataDialogForm'].clearValidate();
            }
        },
        mounted(){
            this.userInfo = JSON.parse(this.Cookies.get('userInfo'));
            if(this.userInfo.groupID==20){
                this.formData.createrName = this.userInfo.userName;
            }
            this.search();
        },
        computed: {
            headers(){
                return {
                    'token':this.Cookies.get('token')
                };
            }
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
                height: 80px;
                line-height: 80px;
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
                width: 160px;
            }
            .el-input{
                width: 160px;
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
            .upload_footer{
                display: inline-block;
                margin-right: 15px;
                width: 90px;
            }
        }
    }
</style>
