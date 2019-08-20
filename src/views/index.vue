<template>
    <div class="content">
      <!-- 头部组件 -->
      <layout-Header></layout-Header>
      <div class="content-main">
        <!-- 侧边导航栏 -->
        <layout-Sider></layout-Sider>
        <!-- 主体内容区域 -->
        <div class="content-right">
          <transition name="slide-fade">
            <router-view class="view"></router-view>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss">
.content{
  width: 100%;
  height: 100%;
  .content-main{
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    .content-right{
      width: 86%;
      padding-left: 32px;
      padding-right: 30px;
      background: #F8F8F8;
      overflow: hidden;
    }
  }
}
</style>
