<template>
  <!-- 底部地址栏 -->
  <footer class="home-footer">
    <div class="footer-left">
      <div class="footer-leftTop">
        <span>技术文档</span>
        <span>接入须知</span>
        <span>常见问题</span>
      </div>
      <div class="footer-leftCenter">
        <span>技术文档</span>
      </div>
      <div class="footer-leftBotton">
        <span>SDK下载</span>
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
      .footer-leftTop{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.5rem;
        span{
          font-size: 0.22rem;
          color: #ffffff;
          font-weight: 700;
          margin-right: 0.76rem;
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
