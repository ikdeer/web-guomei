<template>
    <div class="content">
      <!-- 头部组件 -->
      <layout-Header></layout-Header>
      <div class="content-main">
        <!-- 侧边导航栏 -->
        <layout-Sider></layout-Sider>
        <!-- 主体内容区域 -->
        <div class="content-right" :style="contentStyleObj">
          <transition name="slide-fade">
            <router-view class="view"></router-view>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
          return {
            contentStyleObj:{
              height:''
            }
          }
        },
        created(){
          this.getHeight();
          window.addEventListener('resize', this.getHeight);

        },
        methods:{
          getHeight(){
            this.contentStyleObj.height = window.innerHeight - 60+'px';
          }
        },
        mounted(){

        },
        destroyed() {
          window.removeEventListener('resize', this.getHeight)
        }
    }
</script>

<style lang="scss">
.content{
  width: 100%;
  .content-main{
    width: 100%;
    .content-right{
      width: auto;
      box-sizing: border-box;
      margin-left: 2.6rem;
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      background: #F8F8F8;
      overflow-y: auto;
    }
  }
}
</style>
