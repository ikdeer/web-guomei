<template>
    <div class="categories">
      <!-- 面包屑导航栏 -->
      <nav class="nav-Type">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
        </el-breadcrumb>
      </nav>
      <h3>栏目管理</h3>
      <div class="categories-content">
        <el-tabs type="border-card">
          <el-tab-pane label="技术文档栏目配置">
            <categoriesModule></categoriesModule>
          </el-tab-pane>
          <el-tab-pane label="首页tab栏目配置">消息中心</el-tab-pane>
          <el-tab-pane label="接入须知栏目配置">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import categoriesModule from './component/categoriesModule'
  export default {
    name: "categories",
    components:{categoriesModule},
    data(){
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
.categories{
  width: 100%;
  .categories-content{
    background:rgba(255,255,255,1);
    box-shadow:0 2px 4px 1px rgba(0,0,0,0.1);
    border-radius:10px;
    padding: 30px;
    box-sizing: border-box;
  }
}
</style>
