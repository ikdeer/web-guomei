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
            <span>孙大爷来了</span>
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

          }
        }
    }
</script>

<style lang="scss">
.header{
  width:100%;
  height: 90px;
  background: #ffffff;
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
    margin-left: 30px;
    >img{
      width: 126px;
      height: 46px;
      display: block;
    }
    >span{
      width: 2px;
      height: 30px;
      display: block;
      background: #333333;
      margin-left: 16px;
      margin-right: 16px;
    }
    >p{
      font-size: 20px;
      color: #333333;
    }
  }
  .header-right{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-right: 30px;
    .header-issue{
      width: 30px;
      height: 30px;
      display: block;
    }
    .header-name{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      margin-left: 40px;
      margin-right: 20px;
      >img{
        width: 62px;
        height: 62px;
        border-radius: 50%;
        overflow: hidden;
      }
      >span{
        font-size: 20px;
        color: #333333;
        margin-left: 20px;
      }
    }
    .header-Badge{
      width: 20px;
      height: 10px;
      display: block;
    }
  }
}
</style>
