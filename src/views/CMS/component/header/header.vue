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
          <el-dropdown>
            <span class="el-icon-arrow-right gm-sbc" @click="userInfo.isUserShow =! userInfo.isUserShow"></span>
            <div class="gm-popUp">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user">用户中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button">退出</el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </el-dropdown>
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
            isUserShow:false,
          }
        }
      },
      methods:{
        ClickUserRouter(){
          this.userInfo.isUserShow = false;
          this.$router.push({path:'/Index/userInfo'});
        }
      },
      mounted(){
        let localUser = JSON.parse(localStorage.getItem('userInfo'));
        this.userInfo.userName = localUser ? localUser.userName : '智能国美';
        //this.userInfo.userImg = JSON.parse(localStorage.getItem('userInfo')).userImg || '';
      }
    }
</script>

<style lang="scss">
.header{
  width:100%;
  height: 0.6rem;
  background: #1B1B1B;
  box-shadow:0 0.02rem 0.04rem 0 rgba(0,0,0,0.11);
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
    cursor: pointer;
    position: relative;
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
    .gm-sbc{
      color: #ffffff;
      display: block;
      font-size:0.18rem;
    }
    .gm-sbc:hover + .gm-popUp{
      display: block;
    }
    .gm-popUp{
      width: 1.6rem;
      position: absolute;
      top: 0.46rem;
      right: -0.3rem;
      background: #1B1B1B;
      z-index: 100;
      display: none;
      .gm-user{
        margin-left: 0.2rem;
        height: 0.5rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        .el-icon-user{
          font-size:0.18rem;
          color: #ffffff;
          margin-right: 0.15rem;
        }
        button{
          font-size: 0.14rem;
          color: #999999;
          margin-left: 0.15rem;
        }
      }
      .gm-quit{
        margin-left: 0.2rem;
        height: 0.5rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        .el-icon-switch-button{
          font-size:0.18rem;
          color: #ffffff;
          margin-right: 0.15rem;
        }
        button{
          font-size: 0.14rem;
          color: #999999;
          margin-left: 0.15rem;
        }
      }
    }
  }
}
.el-dropdown-menu{
  width: 1.6rem;
  background: #1B1B1B;
  border: none;
  padding: 0;
  right: -0.3rem !important;
  .el-dropdown-menu__item{
    line-height:0.5rem;
    background: #1B1B1B;
    color: #ffffff;
  }
}
.el-popper .popper__arrow{
  display: none;
}
</style>
