<template>
  <div class="TCF-api">
    <!-- 面包屑导航栏 -->
    <nav class="nav-Type">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/Index/instructionsList'}">接入须知</el-breadcrumb-item>
        <el-breadcrumb-item>编辑接入须知</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="api-content">
      <h4 class="api-TextH4">编辑接入须知</h4>
      <div class="api-center">
        <div class="api-quill">
          <el-form :model="catalogText" :rules="rules" ref="catalogText" label-width="130px">
            <el-form-item label="标题" prop="Title">
              <div class="api-OneLevel">
                <el-input v-model="catalogText.Title" maxlength="20" placeholder="请输入标题名称"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="目录" prop="OneLevel">
              <div class="api-OneLevel">
                <el-select v-model="catalogText.OneLevel"
                           :disabled="true"
                           placeholder="请选择目录">
                  <el-option
                    v-for="item in catalogText.OneLevelData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item  label="内容" prop="bbsContent">
              <!-- 图片上传组件辅助-->
              <el-upload
                class="avatar-uploader"
                action=""
                accept="image/jpg,image/jpeg,image/png"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="getFile">
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
                <el-button type="primary" @click.stop="addDomain">保存并发布</el-button>
                <router-link tag="button"
                             class="el-button el-button--default el-button--small"
                             :to="{path:'/Index/instructionsList'}">
                  <span>取消</span>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getAccessNoteModify,
    getAccessNoteTitleShow,
    getImageUploadNormalImage,
    getAccessNoteDetails
  } from "../../../HttpApi/instructions/instructionsListAPi";
  import {base64} from "@/lib/utils";
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
  Quill.register(Font, true);
  fontSizeStyle.whitelist = fontSize;
  Quill.register('modules/imageDrop', ImageDrop);
  Quill.register('modules/imageResize', ImageResize);
  export default {
    name: "TCFApiEdit",
    data(){
      return {
        catalogText:{
          Title:'',//标题
          OneLevel:'',//一级目录
          OneLevelData:[],
          bbsContent:'',//文本内容
          quillUpdateImg:false,//图片上传动画
        },
        ImgUrl:process.env.BASE_URL,//图片地址
        editorOption: {
          theme: 'snow',  // or 'bubble'
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
                ['image','video','link'] //上传图片、上传视频
              ],
              handlers:{
                'image':function(value){
                  if(value){
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader input').click();
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
          OneLevel:[{ required: true, message: '请选择一级类目', trigger: 'blur' }],
          bbsContent:[{ required: true, message: '请填写要发布的API公告版内容', trigger: 'blur,change' }]
        }
      }
    },
    methods:{
      //技术文档详情
      getAccessNoteDetails(){
        getAccessNoteDetails({id:this.$route.query.id}).then(response => {
          if(response.data.errorCode == 200){
            this.catalogText.Title = response.data.data.accessNote.name;//标题
            this.catalogText.OneLevel = response.data.data.accessNote.title1;//目录
            this.catalogText.bbsContent = response.data.data.accessNote.txt;//文本内容
          }else{
            this.$message.error(response.data.errorInfo);
          }
        });
      },
      //一级目录
      getAccessNoteTitleShow(){
        getAccessNoteTitleShow().then(response => {
          if(response.data.errorCode == 200){
            this.catalogText.OneLevelData = response.data.data.list;
          }else{
            this.$message.error(response.data.errorInfo);
          }
        })
      },
      //图片上传
      getFile(file,fileList){
        //图片上传动画
        this.catalogText.quillUpdateImg = true;
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
        base64(file.raw,function(resBase64Img){
          getImageUploadNormalImage({imageBase64:resBase64Img}).then(response => {
            _this.catalogText.quillUpdateImg = true;
            if(response.data.errorCode == 200){
              let quill = _this.$refs.myQuillEditor.quill;
              // 获取光标所在位置
              let length = quill.getSelection().index;
              // 插入图片  res.data为服务器返回的图片地址
              quill.insertEmbed(length, 'image', `${_this.ImgUrl}${response.data.data.url}`);
              // 调整光标到最后
              quill.setSelection(length + 1);
              // loading动画消失
              _this.catalogText.quillUpdateImg = false;
            }else{
              _this.$message.error(response.data.errorInfo);
            }
          })
        })
      },
      //保存并发布
      addDomain(){
        let _this = this;
        this.$refs.catalogText.validate((valid) => {
          if(valid){
            getAccessNoteModify({id:this.$route.query.id,sort: 0,name:this.catalogText.Title,txt:this.catalogText.bbsContent})
              .then(response => {
                if(response.data.success){
                  this.$message({message: '编辑成功~~~',type: 'success'});
                  setTimeout(()=>{
                    _this.$router.push({path:'/Index/instructionsList'})
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
      this.getAccessNoteDetails();
      this.getAccessNoteTitleShow();
    }
  }
</script>

<style scoped lang="scss">

  .TCF-api{
    width: 100%;
    .api-content{
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
        min-height: 8rem;
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
          }
          .avatar-uploader{
            display: none;
          }
          .api-editor{
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
</style>
