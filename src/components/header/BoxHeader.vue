<template>
    <section class="g-box-header">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in topBar" :to="{ path: item.link }" :key="item.name">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </section>
</template>

<script>
  export default {
    name: "BoxHeader",
    props:{
      topBar:Object
    },
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