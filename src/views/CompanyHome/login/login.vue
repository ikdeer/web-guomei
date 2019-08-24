<template>
    <div class="login">
      <!-- header导航组件 -->
      <Header_Nav></Header_Nav>
      <div class="login-bgImg">
        <img src="/static/images/banner-login-bg@2x.png" alt="">
      </div>
      <div class="login-center">
        <div class="login-input">
          <p class="login-text">登陆</p>
          <div class="login-phone">
            <el-input placeholder="用户名(6-20位字母数字)/手机号/邮箱" v-model="name"></el-input>
          </div>
          <div class="login-password">
            <el-input placeholder="密码" type="password" v-model="password"></el-input>
          </div>
          <div class="login-code">
            <el-input placeholder="请输入验证码" v-model="code">
              <template slot="append">图片验证码？</template>
            </el-input>
          </div>
          <div class="login-itemText">
            <span>帐号或密码错误，请重新输入</span>
            <span>忘记密码</span>
          </div>
          <div class="login-button">
            <el-button>登陆</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Header_Nav from '@/views/CompanyHome/component/header/HeaderNav'
    export default {
        name: "login",
        components:{Header_Nav},
        data(){
          return {
            name:'',
            password:'',
            code:'',
          }
        },
        created(){

        }
    }
</script>

<style lang="scss">
.login{
  width: 100%;
  height: 100%;
  background:linear-gradient(289deg,rgba(26,85,164,1) 0%,rgba(2,25,68,1) 100%);
  position: absolute;
  .login-bgImg{
    width: 8.68rem;
    height: 7.28rem;
    position: absolute;
    left:1.08rem;
    top: 0.52rem;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .login-center{
    width: 4.8rem;
    background: #ffffff;
    border-radius: 0.1rem;
    position: absolute;
    right: 3rem;
    top: 2rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.35rem;
    padding-bottom: 0.5rem;
    .login-input{
      width: 3.28rem;
      .login-text{
        font-size: 0.26rem;
        color: #F20A59;
        font-weight: 600;
        text-align: center;
      }
      .login-phone{
        width: 3.28rem;
        height: 0.5rem;
        display: flex;
        display: -webkit-flex;
        margin-top: 0.45rem;
        div{
          input{
            height: 0.5rem !important;
          }
        }
      }
      .login-password{
        width: 3.28rem;
        height: 0.5rem;
        display: flex;
        display: -webkit-flex;
        margin-top: 0.35rem;
        div{
          input{
            height: 0.5rem !important;
          }
        }
      }
      .login-code{
        width: 3.28rem;
        height: 0.5rem;
        display: flex;
        display: -webkit-flex;
        margin-top: 0.35rem;
        div{
          input{
            height: 0.5rem !important;
            font-size: 0.14rem !important;
          }
        }
      }
      .login-itemText{
        width: 3.28rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.1rem;
        span:first-child{
          font-size: 0.14rem;
          color: #BABABA;
        }
        span:last-child{
          font-size: 0.14rem;
          color: #EE2323;
        }
      }
      .login-button{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.5rem;
        >button{
          width: 1.6rem;
          line-height: 0.25rem;
          font-size: 0.18rem;
          color: #ffffff;
          background: #F20A59;
          border-color: #F20A59;
        }
      }
    }
  }
}
</style>
