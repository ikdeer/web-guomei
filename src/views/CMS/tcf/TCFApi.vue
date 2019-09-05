<template>
    <div class="TCF-api">
      <!-- 面包屑导航栏 -->
      <nav class="nav-Type">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/Index/TCFApiList'}">技术文档</el-breadcrumb-item>
          <el-breadcrumb-item>新增技术文档</el-breadcrumb-item>
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
              <el-form-item label="一级目录" prop="OneLevel">
                <div class="api-OneLevel">
                  <el-input v-model="catalogText.OneLevel" placeholder="请选择/输入一级目录名称"></el-input>
                  <el-select v-model="catalogText.OneLevelType"
                             @change="selectLeve(catalogText.OneLevelType)"
                             placeholder="请选择一级目录">
                    <el-option
                      v-for="item in catalogText.OneLevelData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="二级目录" prop="secondLevel">
                <div class="api-OneLevel">
                  <el-input v-model="catalogText.secondLevel" placeholder="请选择/输入二级目录名称"></el-input>
                  <el-select v-model="catalogText.secondLevelType" placeholder="请选择二级目录">
                    <el-option
                      v-for="item in catalogText.secondLevelData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
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
    getTechDocCreate,
    getTechDocTitleShow,
    getTechDocTitle2Show
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
  name: "TCFApi",
  data(){
    return {
      catalogText:{
        OneLevel:'',//一级目录
        OneLevelType:'',//选择类目层级
        OneLevelData:[],
        secondLevel:'',//二级目录
        secondLevelType:'',//选择类目层级
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
        OneLevel:[
          { required: true, message: '请选择/输入一级类目', trigger: 'blur' },
        ],
        secondLevel:[
          { required: true, message: '请选择/输入二级类目', trigger: 'blur' },
        ],
        bbsContent:[
          { required: true, message: '请填写要发布的API公告版内容', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods:{
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
      getTechDocTitle2Show({id:'id'}).then(response => {
        if(response.data.errorCode == 200){
          this.catalogText.selectLevelData = response.data.data.list;
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
    //选择一级层级
    selectLeve(item){

    },
    //保存并发布
    addDomain(){
      this.$refs.catalogText.validate((valid) => {
        if(valid){
          getTechDocCreate({
            titleID1:'0',
            titleName1:this.catalogText.OneLevel,
            titleID2:'0',
            titleName2:'',
            txt:this.catalogText.bbsContent,
          }).then(response => {
              console.log(response);
          })
        }
      })
    },
  },
  mounted(){
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
