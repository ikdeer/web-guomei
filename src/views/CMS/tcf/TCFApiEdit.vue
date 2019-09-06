<template>
  <div class="TCF-api">
    <!-- 面包屑导航栏 -->
    <nav class="nav-Type">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/Index/TCFApiList'}">技术文档</el-breadcrumb-item>
        <el-breadcrumb-item>编辑技术文档</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="api-content">
      <h4 class="api-TextH4">技术文档</h4>
      <div class="api-center">
        <div class="api-quill">
          <el-form :model="catalogText"
                   :label-position="labelPosition"
                   :rules="rules"
                   size="small"
                   ref="catalogText"
                   label-width="130px"
                   class="demo-dynamic">
            <el-form-item label="标题" prop="Title">
              <div class="api-OneLevel">
                <el-input v-model="catalogText.Title" placeholder="请输入标题名称"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="一级目录" prop="OneLevel">
              <div class="api-OneLevel">
                <el-select v-model="catalogText.OneLevel"
                           :disabled="true"
                           @change="getTechDocTitle2Show"
                           placeholder="请选择一级目录">
                  <el-option
                    v-for="item in catalogText.OneLevelData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="二级目录">
              <div class="api-OneLevel">
                <el-select v-model="catalogText.secondLevel"
                           :disabled="true"
                           placeholder="请选择二级目录">
                  <el-option
                    v-for="item in catalogText.secondLevelData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item  label="API内容" prop="bbsContent">
              <!-- 图片上传组件辅助-->
              <el-upload
                class="avatar-uploader"
                action=""
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
                <el-button type="primary" @click.stop="addDomain">保存并发布</el-button>
                <el-button>重置</el-button>
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
    getImageUploadNormalImage,
    getTechDocTitleShow,
    getTechDocTitle2Show,
    getTechDocDetails,
    getTechDocModify
  } from "../../../HttpApi/TCFApi/TCFApi";
  const toolbarOptions =[
    ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
    ['blockquote', 'code-block'],     //引用，代码块
    [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
    [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
    [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
    [{ 'direction': 'rtl' }],             // 文本方向
    [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
    [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
    [{ 'font': [] }],     //字体
    [{ 'align': [] }],    //对齐方式
    ['image']    //上传图片
  ];
  export default {
    name: "TCFApiEdit",
    data(){
      return {
        catalogText:{
          Title:'',//标题
          OneLevel:'',//一级目录
          OneLevelData:[],
          secondLevel:'',//二级目录
          secondLevelData:[],
          bbsContent:'',//文本内容
          quillUpdateImg:'',//图片上传动画
        },
        labelPosition:'right',//form对其方式
        editorOption: {
          theme: 'snow',  // or 'bubble'
          placeholder: '请填写要发布的公告版内容...',
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
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
            }
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
      getTechDocDetails(){
        getTechDocDetails({id:this.$route.query.id}).then(response => {
          if(response.data.errorCode == 200){
            this.catalogText.Title = response.data.data.techDoc.name;//标题
            this.catalogText.OneLevel = response.data.data.techDoc.title1;//一级目录
            this.catalogText.secondLevel = response.data.data.techDoc.title2;//二级目录
            this.catalogText.bbsContent = response.data.data.techDoc.txt;//文本内容
          }else{
            this.$message.error(response.data.errorInfo);
          }
        });
      },
      //一级目录
      getTechDocTitleShow(){
        getTechDocTitleShow().then(response => {
          if(response.data.errorCode == 200){
            this.catalogText.OneLevelData = response.data.data.list;
          }else{
            this.$message.error(response.data.errorInfo);
          }
        })
      },
      //二级目录
      getTechDocTitle2Show(){
        this.catalogText.secondLevel = '';
        this.catalogText.secondLevelData = [];
        getTechDocTitle2Show({title1:this.catalogText.OneLevel}).then(response => {
          if(response.data.errorCode == 200){
            if(response.data.data.list.length != 0){
              this.catalogText.secondLevelData = response.data.data.list;
            }else{
              this.catalogText.secondLevelData = null;
            }
          }else{
            this.$message.error(response.data.errorInfo);
          }
        })
      },
      // 上传图片前
      beforeUpload(res,file) {
        //显示loading动画
        this.catalogText.quillUpdateImg = true;
      },
      //图片上传
      getFile(file,fileList){
        let _this = this;
        _this.getBase64(file.raw).then(resBase64Img => {
          getImageUploadNormalImage({imageBase64:resBase64Img}).then(response => {
            if(response.data.success){
              let quill = this.$refs.myQuillEditor.quill;
              // 获取光标所在位置
              let length = quill.getSelection().index;
              // 插入图片  res.data为服务器返回的图片地址
              quill.insertEmbed(length, 'image', resBase64Img);
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
            if(this.catalogText.secondLevelData != null && this.catalogText.secondLevel != ''){
              getTechDocModify({id:this.$route.query.id,name:this.catalogText.Title,txt:this.catalogText.bbsContent})
                .then(response => {
                if(response.data.success){
                  this.$message({message: '编辑成功~~~',type: 'success'});
                  setTimeout(()=>{
                    _this.router.push({path:'/Index/TCFApiList'})
                  },300)
                }else{
                  this.$message.error(response.data.errorInfo);
                }
              })
            }else{
              if(this.catalogText.secondLevelData == null){
                getTechDocModify({id:this.$route.query.id, name:this.catalogText.Title, txt:this.catalogText.bbsContent})
                  .then(response => {
                  if(response.data.success){
                    this.$message({message: '编辑成功~~~',type: 'success'});
                    setTimeout(()=>{
                      _this.router.push({path:'/Index/TCFApiList'})
                    },300)
                  }else{
                    this.$message.error(response.data.errorInfo);
                  }
                })
              }else{
                this.$message({
                  message: '二级目录必选项！！！',
                  type: 'warning'
                });
              }
            }
          }
        })
      },
    },
    mounted(){
      this.getTechDocDetails();
      this.getTechDocTitleShow();
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
