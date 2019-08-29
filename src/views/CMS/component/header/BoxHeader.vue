<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "BoxHeader",
    data(){
      return {
        routerList:[],
      }
    },
    watch: {
      '$route'(val,oldVal){
        console.log(oldVal);
      }
    },
    mounted(){
      //this.routerList = this.$route.meta.routeList;
    }
  }
</script>

<style scoped lang="scss">
    .g-box-header{
        height: 70px;
        border: 1px dashed #979797;
        .g-box-title-con{
            line-height: 70px;
        }
    }
</style>
