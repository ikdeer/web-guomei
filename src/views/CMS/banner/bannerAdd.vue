<template>
  <div class="bannerAdd">
    <!-- 面包屑导航栏 -->
    <nav class="nav-Type">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/Index/bannerList'}">Banner位置管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增Banner位置管理</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="bannerAdd-content">
      <h4 class="api-TextH4">新增Banner位置管理</h4>
      <div class="api-center">
        <div class="api-quill">
          <el-form :model="form"
                   :rules="rules"
                   size="small"
                   ref="form"
                   label-width="130px"
                   class="demo-dynamic">
            <el-form-item label="图片名称：" prop="TitleImg">
              <div class="api-OneLevel">
                <el-input v-model="form.TitleImg" placeholder="请输入图片名称"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="上传图片：" prop="coverImg">
              <div class="api-OneLevel">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :auto-upload="false"
                  :on-change="BannerUpDataImg"
                  :show-file-list="false">
                  <img v-if="form.coverImg" :src="form.coverImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="按钮1跳转地址：" prop="URL1">
              <div class="api-OneLevel">
                <el-input placeholder="请输入URL" v-model="form.URL1">
                  <template slot="prepend">Http://</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="按钮2跳转地址：" prop="URL2">
              <div class="api-OneLevel">
                <el-input placeholder="请输入URL" v-model="form.URL2">
                  <template slot="prepend">Http://</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="排序：" prop="sortNum">
              <div class="api-OneLevel">
                <el-input v-model="form.sortNum" maxlength="2" placeholder="请输入排序"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="api-editor">
                <el-button type="primary" @click.stop="addDomain">保存</el-button>
                <el-button @click.stop="cancel">重置</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getBannerCreate,getImageUploadNormalImage} from "@/HttpApi/banner/bannerApi";
  export default {
    name: "bannerAdd",
    data(){
      return {
        form:{
          TitleImg:'',//图片名称
          coverImg:'',//图标
          URL1:'',//按钮一跳转地址
          URL2:'',//按钮二跳转地址
          sortNum:'',//排序
        },
        rules:{
          TitleImg:[{ required: true, message: '请输入图片名称', trigger: 'blur'}],
          coverImg:[{ required: true, message: '请上传图片', trigger: 'blur,change' }],
          URL1:[{ required: true, message: '请输入连接地址', trigger: 'blur' }],
          URL2:[{ required: true, message: '请输入连接地址', trigger: 'blur' }],
          sortNum:[{ required: true, message: '请输入排序', trigger: 'blur' }],
        }
      }
    },
    methods:{
      //图片上传
      BannerUpDataImg(file,fileList){
        this.getBase64(file.raw).then(resBase64Img => {
          getImageUploadNormalImage({imageBase64:resBase64Img}).then(response => {
            if(response.data.errorCode == 200){
              this.form.coverImg = response.data.data.url;
            }else{
              this.$message.error(response.data.errorInfo);
            }
          })
        })
      },
      //转换Base64
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      //重置
      cancel(){
        this.$refs.form.resetFields();
      },
      //保存并发布
      addDomain(){
        let _this = this;
        this.$refs.form.validate((valid) => {
          if(valid){
            getBannerCreate({
              title:this.form.TitleImg,
              imgUrl:this.form.coverImg,
              url1:this.form.URL1,
              url2:this.form.URL2,
              sort:this.form.sortNum,
            }).then(response => {
              if(response.data.errorCode == 200){
                this.$message({message: '创建成功',type: 'success'});
                setTimeout(()=>{
                  _this.$router.push({path:'/Index/bannerList'})
                },300)
              }else{
                this.$message.error(response.data.errorInfo);
              }
            })
          }
        })
      },
    },
    mounted(){

    }
  }
</script>

<style lang="scss">
  .bannerAdd{
    width: 100%;
    .bannerAdd-content{
      width: 100%;
      .api-TextH4{
        font-size: 0.18rem;
        color: #333333;
        font-weight: 600;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
      }
      .api-center{
        width: 100%;
        background: #ffffff;
        box-shadow:0 0.02rem 0.04rem 0.01rem rgba(0,0,0,0.1);
        border-radius:0.1rem;
        .api-quill{
          padding:0.5rem 0.3rem;
          .api-OneLevel{
            width: 40%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: space-between;
            .el-select{
              width: 100%;
              display: block;
            }
            .avatar-uploader{
              .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
              }
              .el-upload:hover {
                border-color: #409EFF;
              }
              .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 422px;
                height: 160px;
                line-height: 160px;
                text-align: center;
              }
              .avatar {
                width: 100px;
                height: 100px;
                display: block;
              }
            }
          }
          .avatar-uploaderImg{
            display: none;
          }
        }
      }
    }
  }
</style>
