<template>
    <div class="Module">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类目名称" prop="Title">
          <div class="Module-fromPad">
            <el-input v-model="form.Title" maxlength="20" placeholder="请输入类目名称"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="类目层级" prop="categoryLevel">
          <div class="Module-fromPad">
            <el-select v-model="form.categoryLevel"
                       @change="changeCategoryLevel"
                       placeholder="请选择类目层级">
              <el-option label="一级类目" value="1"></el-option>
              <el-option label="二级类目" value="2"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <template v-if="form.isParentCategeryDisabled">
          <el-form-item label="上级类目" prop="superior">
            <div class="Module-fromPad">
              <el-select v-model="form.superior" placeholder="请选择上级类目">
                <el-option
                  v-for="item in form.TechDocTitleData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </template>
        <el-form-item label="是否启用" prop="isEnable">
          <el-radio-group v-model="form.isEnable">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCategoryEditForm">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {getTechDocCreate,getTechDocTitleShow} from "../../../../HttpApi/TCFApi/TCFApi";
  export default {
    name: "categoriesModule",
    data(){
      return {
        form:{
          Title:'',
          categoryLevel:'',//类目层级
          isParentCategeryDisabled:false,
          superior:'',//上级目录
          TechDocTitleData:[],//一级目录
          isEnable:'',
        },
        rules:{
          Title:[{ required: true, message: '请输入类目名称', trigger: 'blur' }],
          categoryLevel:[{ required: true, message: '请选择类目层级', trigger: 'blur,change' }],
          superior:[{ required: true, message: '请选择上级类目', trigger: 'blur,change' }],
          isEnable:[{ required: true, message: '请选择状态', trigger: 'blur,change' }]
        }
      }
    },
    methods:{
      //选择二级目录
      changeCategoryLevel(){
        if(this.form.categoryLevel == 1){
          this.form.isParentCategeryDisabled = false;
        }else{
          this.form.isParentCategeryDisabled = true;
          this.getTechDocTitleShow();
        }
      },
      //查找创建的一级目录
      getTechDocTitleShow(){
        getTechDocTitleShow().then(response => {
          if(response.data.errorCode == 200){
              this.form.TechDocTitleData = response.data.data.list;
          }else{
            this.$message.error(response.data.errorInfo);
          }
        });
      },
      //取消
      cancel(){
        this.$refs.form.resetFields();
      },
      //保存类目接口
      submitCategoryEditForm(){
        this.$refs.form.validate((valid) => {
          if(valid){
            let objectList ={};
            if(this.form.categoryLevel == 2){
              objectList.name = '';
              objectList.title1 = this.form.superior;
              objectList.title2 = this.form.Title;
              objectList.txt = ''
            }else{
              objectList.name = '';
              objectList.title1 = this.form.Title;
              objectList.title2 = '';
              objectList.txt = ''
            }
            getTechDocCreate(objectList).then(response => {
              if(response.data.success){
                this.$message({
                  message: '目录!创建成功~~~',
                  type: 'success'
                });
                this.form.Title = '';
                this.form.superior = '';
                this.form.categoryLevel = '';
                this.form.isParentCategeryDisabled = false;
              }else{
                this.$message.error(response.data.errorInfo);
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.Module{
  width: 100%;
  .Module-fromPad{
    width: 50%;
    .el-select{
      display: block;
    }
  }
}
</style>
