<template>
  <div class="productEdit">
    <!-- 面包屑导航栏 -->
    <nav class="nav-Type">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/Index/productList'}">产品服务</el-breadcrumb-item>
        <el-breadcrumb-item>编辑产品服务</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="productEdit-content">
      <h4 class="api-TextH4">编辑产品服务</h4>
      <div class="api-center">
        <div class="api-quill">
          <el-form :model="catalogText" :rules="rules" ref="catalogText" label-width="130px">
            <el-form-item label="标题：" prop="Title">
              <div class="api-OneLevel">
                <el-input v-model="catalogText.Title" maxlength="20" placeholder="请输入标题名称"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="首页封面：" prop="coverImg">
              <div class="api-OneLevel">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  accept="image/jpg,image/jpeg,image/png"
                  :auto-upload="false"
                  :on-change="coverUpDataImg"
                  :show-file-list="false">
                  <img v-if="catalogText.coverImg" :src="catalogText.coverImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <p class="gm-format">图片上传推荐格式宽：350px;高：350px</p>
            </el-form-item>
            <el-form-item label="简介：" prop="introduceText">
              <div class="api-OneLevel">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="catalogText.introduceText"
                  maxlength="100"
                  rows="5"
                  show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="URL地址：" prop="URL">
              <div class="api-OneLevel">
                <el-input placeholder="请输入URL" v-model="catalogText.URL"></el-input>
              </div>
              <p class="api-danger">
                如果要跳转本站产品详情页请复制<span>/Company/product</span>（注意!请勿复制空格）
              </p>
            </el-form-item>
            <el-form-item label="排序：" prop="sortNum">
              <div class="api-OneLevel">
                <el-input v-model="catalogText.sortNum"  oninput = "value=value.replace(/[^\d]/g,'')" maxlength="2" placeholder="请输入排序"></el-input>
              </div>
            </el-form-item>
            <el-form-item  label="内容：" prop="bbsContent">
              <!-- 图片上传组件辅助-->
              <el-upload
                class="avatar-uploaderImg"
                action=""
                accept="image/jpg,image/jpeg,image/png"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="getFile"
                :before-upload="beforeUpload">
              </el-upload>
              <el-row v-loading="catalogText.quillUpdateImg">
                <el-col :span="24">
                  <quill-editor
                    v-model="catalogText.bbsContent"
                    ref="myQuillEditor"
                    :options="editorOption">
                  </quill-editor>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <div class="api-editor">
                <el-button type="primary" @click.stop="addDomain">保存</el-button>
                <router-link
                  tag="button"
                  class="el-button el-button--default el-button--small"
                  :to="{path:'/Index/productList'}">取消</router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getDetail,getModify,getImageUploadNormalImage} from "@/HttpApi/product/productApi";
  //引入编辑器
  import * as Quill from 'quill';
  import { ImageDrop } from 'quill-image-drop-module';
  //quill图片可拖拽改变大小
  import ImageResize from 'quill-image-resize-module';
  //quill编辑器的字体
  var fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];
  var fontSize = ['10px', '12px', '14px', '16px', '20px', '24px', '36px'];
  var fontSizeStyle = Quill.import('attributors/style/size');
  var Font = Quill.import('formats/font');
  //将字体加入到白名单
  Font.whitelist = fonts;
  fontSizeStyle.whitelist = fontSize;
  Quill.register(Font, true);
  Quill.register(fontSizeStyle, true);
  Quill.register('modules/imageDrop', ImageDrop);
  Quill.register('modules/imageResize', ImageResize);
  export default {
    name: "productEdit",
    data(){
      let URL = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入URL'));
        } else if(!/(http|https):\/\/([\w.]+\/?)\S*/.test(value)){
          if(value == '/Company/product'){
            callback();
          }else{
            callback(new Error('URL地址缺少http://或https://'));
          }

        }else{
          callback();
        }
      };
      return {
        catalogText:{
          Title:'',//标题
          coverImg:'',//首页封面
          introduceText:'',//介绍
          URL:'',//跳转地址
          sortNum:'',//排序
          bbsContent:'',//文本内容
          quillUpdateImg:'',//图片上传动画
        },
        ImgUrl:process.env.BASE_URL,
        editorOption: {
          theme: 'snow',
          placeholder: '请填写要发布的公告版内容...',
          modules: {
            toolbar: {
              // 工具栏
              container: [
                ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
                ['blockquote', 'code-block'],         //引用，代码块
                [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],          //列表
                [{ 'script': 'sub'}, { 'script': 'super' }],      // 上下标
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
                [{ 'direction': 'rtl' }],                         // 文本方向
                [{ 'size': fontSize }],  // 字体大小
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         //几级标题
                [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景颜色
                [{ 'font': fonts }],         //字体
                [{ 'align': [] }],        //对齐方式
                ['clean'],        //清除字体样式
                ['image','link']        //上传图片、上传视频
              ],
              handlers:{
                'image':function(value){
                  if(value){
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploaderImg input').click();
                  }else{
                    this.quill.format('image', false);
                  }
                }
              }
            },
            imageResize: {}
          },
        },
        rules:{
          Title:[{ required: true, message: '请输入标题名称', trigger: 'blur' }],
          coverImg:[{ required: true, message: '请上传首页封面', trigger: 'blur,change' }],
          introduceText:[{ required: true, message: '请输入介绍内容', trigger: 'blur,change' }],
          URL:[{ validator: URL, trigger: 'blur'}],
          sortNum:[{ required: true, message: '请输入排序', trigger: 'blur' }],
          bbsContent:[{ required: true, message: '请填写要发布的内容', trigger: 'blur,change' }]
        }
      }
    },
    methods:{
      //产品服务详情
      getDetail(){
        getDetail({id:this.$route.query.Id}).then(response => {
          if(response.data.errorCode == 200){
            this.catalogText.Title = response.data.data.title;//标题
            this.catalogText.coverImg = response.data.data.imgUrl;//图片
            this.catalogText.introduceText = response.data.data.intro;//介绍
            this.catalogText.URL = response.data.data.urlAddress;//跳转地址
            this.catalogText.sortNum = response.data.data.sort;//排序
            this.catalogText.bbsContent = response.data.data.txt;//富文本内容
          }else{
            this.$message.error(response.data.errorInfo);
          }
        })
      },
      //封面上传
      coverUpDataImg(file,fileList){
        const isJPG = file.raw.type === 'image/jpg' || file.raw.type === "image/jpeg" || file.raw.type === "image/png";
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG JPEG PNG 格式!');
          return;
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
          return;
        }
        this.getBase64(file.raw).then(resBase64Img => {
          getImageUploadNormalImage({imageBase64:resBase64Img}).then(response => {
            if(response.data.errorCode == 200){
              this.catalogText.coverImg = `${this.ImgUrl}${response.data.data.url}`;
            }else{
              this.$message.error(response.data.errorInfo);
            }
          })
        })
      },
      // 上传图片前
      beforeUpload(res,file) {
        //显示loading动画
        this.catalogText.quillUpdateImg = true;
      },
      //图片上传
      getFile(file,fileList){
        const isJPG = file.raw.type === 'image/jpg' || file.raw.type === "image/jpeg" || file.raw.type === "image/png";
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG JPEG PNG 格式!');
          return;
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
          return;
        }
        let _this = this;
        _this.getBase64(file.raw).then(resBase64Img => {
          getImageUploadNormalImage({imageBase64:resBase64Img}).then(response => {
            if(response.data.success){
              let quill = this.$refs.myQuillEditor.quill;
              // 获取光标所在位置
              let length = quill.getSelection().index;
              // 插入图片  res.data为服务器返回的图片地址
              quill.insertEmbed(length, 'image', `${this.ImgUrl}${response.data.data.url}`);
              // 调整光标到最后
              quill.setSelection(length + 1);
              // loading动画消失
              this.catalogText.quillUpdateImg = false;
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
      //保存并发布
      addDomain(){
        let _this = this;
        this.$refs.catalogText.validate((valid) => {
          if(valid){
            getModify({
              id:this.$route.query.Id,
              title:this.catalogText.Title,
              imgUrl:this.catalogText.coverImg,
              intro:this.catalogText.introduceText,
              urlAddress:this.catalogText.URL,
              sort:this.catalogText.sortNum,
              txt:this.catalogText.bbsContent,
            }).then(response => {
              if(response.data.errorCode == 200){
                this.$message({message: '编辑成功',type: 'success'});
                setTimeout(()=>{
                  _this.$router.push({path:'/Index/productList'})
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
      this.getDetail();
    }
  }
</script>

<style lang="scss">
  .productEdit{
    width: 100%;
    .productEdit-content{
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
              width: 100%;
              height: 160px;
              .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                .avatar {
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }
              .el-upload:hover {
                border-color: #409EFF;
              }
              .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 100%;
                height: 160px;
                line-height: 160px;
                text-align: center;
              }
            }
          }
          .avatar-uploaderImg{
            display: none;
          }
          .api-editor{
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
          }
          .api-danger{
            margin-top: 0.1rem;
            span{
              color:red;
            }
          }
        }
      }
    }
  }
</style>
