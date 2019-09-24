<template>
  <!-- 底部地址栏 -->
  <footer class="home-footer">
    <div class="footer-left">
      <div class="footer-leftTop">
        <h4>技术文档</h4>
        <router-link tag="span" :to="{path:'/Company/APITCF'}">技术文档1</router-link>
        <span @click.stop="ClickSdk">SDK下载</span>
      </div>
      <div class="footer-leftTop">
        <h4>接入须知</h4>
        <router-link tag="span" :to="{path:'/Company/AccessToInformation'}">接入须知1</router-link>
      </div>
      <div class="footer-leftTop">
        <h4>常见问题</h4>
        <router-link tag="span" :to="{path:'/Company/AccessToInformation'}">常见问题1</router-link>
      </div>
    </div>
    <div class="footer-right">
      <h4 class="footer-contact">联系我们：XXXXXX@gome.com.cn</h4>
      <div class="footer-site">
        <span>©2000-2019  国美在线电子商务有限公司版权所有</span>
        <span>京公安网备11010502027062 </span>
      </div>
      <p class="footer-put">京ICP备 19011786号</p>
    </div>
  </footer>
</template>

<script>
    export default {
      name: "FooterNav",
      data(){
        return {

        }
      },
      methods:{
        //跳转SDK下载
        ClickSdk(){
          if(this.Cookies.get('token')){
            this.$router.push({path: '/Index/SDKDownload'});
          }else{
            this.$message({message: '你还没有登录,请先登录', type: 'warning'});
            this.$router.push({path: '/Company/login'});
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .home-footer{
    height: 2.68rem;
    padding-left: 1.23rem;
    padding-right: 1.23rem;
    background: #333333;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    .footer-left{
      display: flex;
      display: -webkit-flex;
      .footer-leftTop{
        margin-top: 0.5rem;
        margin-right: 0.76rem;
        h4{
          font-size: 0.22rem;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 0.16rem;
        }
        span{
          font-size: 0.18rem;
          color: #CCCCCC;
          display: block;
          margin-bottom: 0.4rem;
          cursor: pointer;
        }
      }
      .footer-leftCenter{
        font-size: 0.18rem;
        color: #cccccc;
        margin-top: 0.37rem;
        margin-bottom: 0.58rem;
      }
      .footer-leftBotton{
        font-size: 0.18rem;
        color: #cccccc;
      }
    }
    .footer-right{
      .footer-contact{
        font-size: 0.22rem;
        color: #ffffff;
        font-weight: 600;
        margin-top: 0.5rem;
      }
      .footer-site{
        margin-top: 0.37rem;
        margin-bottom: 0.34rem;
        span:first-child{
          margin-bottom: 0.1rem;
        }
        span{
          font-size: 0.16rem;
          color:#cccccc;
          display: block;
        }
      }
      .footer-put{
        font-size: 0.16rem;
        color:#cccccc;
      }
    }
  }
</style>
