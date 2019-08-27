<template>
  <div class="gm-api">
    <!-- header导航组件 -->
    <Header_Nav></Header_Nav>
    <div class="gm-apiContent">
      <div class="gm-menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ffffff"
          text-color="#333333"
          active-text-color="#666666">
          <el-submenu index="1">
            <template slot="title">
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">
                <span>选项1</span>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
    import Header_Nav from '@/views/CompanyHome/component/header/HeaderNav'
    export default {
      name: "APITCF",
      components:{Header_Nav},
      data(){
        return {

        }
      },
      methods:{
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped lang="scss">
.gm-api{
  width: 100%;
  .header-nav{
    position:static;
  }
  .gm-apiContent{
    width: 100%;
    .gm-menu{
      width: 2.6rem;
      height: 100%;
      background: #ffffff;
      position: absolute;
      left: 0;
      box-shadow:0 0.02rem 0.04rem 0 rgba(0,0,0,0.1);
    }
  }
}
.el-menu{
  width: 100%;
  height: 100%;
  .el-submenu{
    .el-submenu__title{
      >span{
        font-weight: 600;
        font-size: 0.16rem;
        color: #333333;
        margin-left: 0.4rem;
      }
    }
  }
}


</style>
