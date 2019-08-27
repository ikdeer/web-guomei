<template>
    <div class="header">
        <div class="header-left">
          <img src="/static/images/logo_image@2x.png" alt="">
          <span></span>
          <p>人脸认证开放平台</p>
        </div>
        <div class="header-right">
          <img class="header-issue" src="/static/images/Shape_btn@2x.png" alt="">
          <div class="header-name">
            <img src="/static/images/meizhi.JPG" alt="">
            <span>{{userInfo.userName}}</span>
          </div>
          <img class="header-Badge" src="/static/images/arrow_btn@2x.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
      name: "header",
      data(){
        return {
          userInfo:{
            userName:'',//用户姓名
            userImg:'',//用户头像
          }
        }
      },
      methods:{

      },
      mounted(){
        this.userInfo.userName = JSON.parse(localStorage.getItem('userInfo')).userName;
        this.userInfo.userImg = JSON.parse(localStorage.getItem('userInfo')).userImg;
      }
    }
</script>

<style lang="scss">
.header{
  width:100%;
  height: 0.6rem;
  background: #1B1B1B;
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.11);
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  .header-left{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-left: 0.3rem;
    >img{
      width: 0.9rem;
      height: 0.3rem;
      display: block;
    }
    >span{
      width: 2px;
      height: 0.2rem;
      display: block;
      background: #ffffff;
      margin-left: 0.16rem;
      margin-right: 0.16rem;
    }
    >p{
      font-size: 0.16rem;
      color: #ffffff;
      font-weight: 600;
    }
  }
  .header-right{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-right: 0.3rem;
    .header-issue{
      width: 0.2rem;
      height: 0.2rem;
      display: block;
    }
    .header-name{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.2rem;
      margin-right: 0.1rem;
      >img{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #ffffff;
      }
      >span{
        font-size: 0.16rem;
        color: #999999;
        margin-left: 0.2rem;
      }
    }
    .header-Badge{
      width: 0.14rem;
      height: 0.08rem;
      display: block;
    }
  }
}
</style>
