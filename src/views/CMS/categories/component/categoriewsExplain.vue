<template>
    <div class="Explain">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类目名称" prop="Title">
          <div class="Explain-fromPad">
            <el-input v-model="form.Title" maxlength="20" placeholder="请输入类目名称"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCategoryEditForm">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {getAccessNoteCreate} from "../../../../HttpApi/instructions/instructionsListAPi";
  export default {
    name: "categoriewsExplain",
    data(){
      let Title = (rule, value, callback) => {
        if(value){
          if(/^[\s]*$/.test(value)){
            return callback(new Error('请输入类目名称'))
          }else{
            return callback();
          }
        }else{
          return callback(new Error('请输入类目名称'))
        }
      };
      return {
        form:{
          Title:'',
          isEnable:'',
        },
        rules:{
          Title:[{validator:Title,trigger:['blur','change']}],
          isEnable:[{ required: true, message: '请选择状态', trigger: 'blur,change' }]
        }
      }
    },
    methods:{
      //提交
      submitCategoryEditForm(){
        this.$refs.form.validate((valid) => {
          if(valid){
            getAccessNoteCreate({name:'',sort:this.form.isEnable,title1:this.form.Title,txt:''})
              .then(response => {
                if(response.data.success){
                  this.$message({
                    message: '创建成功~~~',
                    type: 'success'
                  });
                  this.form.Title = '';
                  this.form.isEnable = '';
                }else{
                  this.$message.error(response.data.errorInfo);
                }
            })
          }
        })
      },
      //重置
      cancel(){
        this.$refs.form.resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">
.Explain{
  width: 100%;
  .Explain-fromPad{
    width: 50%;
    .el-select{
      display: block;
    }
  }
}
</style>
