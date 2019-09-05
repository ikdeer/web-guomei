<template>
    <div class="Module">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="类目名称">
          <div class="Module-fromPad">
            <el-input v-model="form.name" placeholder="请输入类目名称"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="类目层级">
          <div class="Module-fromPad">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="一级类目" value="1"></el-option>
              <el-option label="二级类目" value="2"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="上级类目">
          <div class="Module-fromPad">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="一级类目" value="1"></el-option>
              <el-option label="二级类目" value="2"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnable" required>
          <el-radio-group v-model="form.isEnable">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  export default {
    name: "categoriesModule",
    data(){
      return {
        form:{
          name:'',
          region:'',
          isEnable:'',
        }
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
