<template>
    <div class="login">
      <!-- header导航组件 -->
      <Header_Nav></Header_Nav>
      <div class="login-bgImg">
        <img src="/static/images/banner-login-bg@2x.png" alt="">
      </div>
      <div class="login-center">
        <div class="login-input">
          <p class="login-text">登 录</p>
          <el-form :model="loginForm" size="medium" :rules="rules2" ref="loginForm">
            <div class="login-form">
              <el-form-item prop="username">
                <el-input placeholder="用户名(6-20位字母数字)/手机号/邮箱" v-model="loginForm.username"></el-input>
              </el-form-item>
            </div>
            <div class="login-form">
              <el-form-item prop="password">
                <el-input placeholder="密码" show-password maxlength="16" type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
            </div>
            <div class="login-form">
              <el-form-item prop="code">
                <div class="login-code">
                  <el-input placeholder="验证码" maxlength="4" v-model="loginForm.code"></el-input>
                  <a href="javascript:;" @click="changeCodeImg()">
                    <img :src="loginForm.codeImg" alt="图片加载失败">
                  </a>
                </div>
              </el-form-item>
            </div>
            <div class="login-itemText">
              <span></span>
              <router-link tag="span" :to="{path:'/Company/forgetPaw'}">忘记密码</router-link>
            </div>
            <div class="login-button">
              <el-button @click="ClickUserLogin">登 录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  import Header_Nav from '@/views/CompanyHome/component/header/HeaderNav'
  import {getUserLogin,getGeneraTingCode,codeImgUrl} from '@/HttpApi/login/loginApi'
    export default {
        name: "login",
        components:{Header_Nav},
        data(){
          var password = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              callback();
            }
          };
          return {
            loginForm:{
              username:'',//用户名
              password:'',//密码
              code:'',//图片验证码
              codeImg:codeImgUrl,
            },
            userInfo:{
              userName:'',//用户姓名
              userImg:'',//用户头头像
              uid:'',//用户ID
              groupID:'',//用户身份
            },
            rules2:{
              username:[
                { required: true, message: '用户名(6-20位字母数字)/手机号/邮箱', trigger: 'blur' },
                { min: 6, max: 100, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                { pattern:/^[0-9a-zA-Z@.]*$/g, message: '请输入6-20位字母数字', trigger: 'blur' },
              ],
              password:[{ validator: password, trigger: 'blur' }],
              code:[{required: true, message: '请输入验证码', trigger: 'blur' }]
            }
          }
        },
        methods:{
          //图片验证码
          changeCodeImg(){
            //生成一个随机数（防止缓存）
            let num = Math.ceil(Math.random()*10);
            this.loginForm.codeImg=`${this.loginForm.codeImg}?${num}`;
          },
          //登陆
          ClickUserLogin(){
            let _this = this;
            this.$refs.loginForm.validate((valid) => {
              if(valid){
                getUserLogin({
                  'username':this.loginForm.username,
                  'password':this.$md5(this.loginForm.password),
                  'code':this.loginForm.code,
                })
                  .then(response => {
                    if(response.data.errorCode == 200){
                      this.userInfo.userName = response.data.data.username;
                      this.userInfo.uid = response.data.data.uid;
                      this.userInfo.groupID = response.data.data.groupID;
                      let  exp = new Date();
                      exp.setTime(exp.getTime() + (2 * 60 *60 * 1000));//过期时间2小时
                      this.Cookies.set('token',response.data.data.token,{ expires:exp});
                      this.Cookies.set('userInfo',JSON.stringify(this.userInfo),{expires:exp});
                      this.$message({message: '登录成功', type: 'success'});
                      setTimeout(()=>{
                        if(_this.$route.query.redirect == 'overview'){
                          _this.$router.replace('/Index/overview');
                        }else if(_this.$route.query.redirect){
                          _this.$router.replace(_this.$route.query.redirect);
                        }else{
                          _this.$router.replace('/Company/CompanyHome');
                        }
                      },500)
                    }else{
                      this.changeCodeImg();
                      _this.$message.error(response.data.errorInfo);
                    }
                  })
              }
            })
          }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss">
.login{
  width: 100%;
  height: 100%;
  background:linear-gradient(289deg,rgba(26,85,164,1) 0%,rgba(2,25,68,1) 100%);
  position: absolute;
  .login-bgImg{
    width: 9.68rem;
    height: 8.28rem;
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
    width: 5.6rem;
    background: #ffffff;
    border-radius: 0.1rem;
    position: absolute;
    right: 1.8rem;
    top: 2rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.35rem;
    padding-bottom: 0.5rem;
    .login-input{
      width: 4.2rem;
      .login-text{
        font-size: 0.26rem;
        color: #666666;
        font-weight: 600;
        text-align: center;
      }
      .login-form{
        width: auto;
        height: 0.5rem;
        display: flex;
        display: -webkit-flex;
        margin-top: 0.25rem;
        .el-form-item{
          width: 100%;
          height: 0.5rem !important;
          /*div{
            input{
              height: 0.45rem !important;
            }
          }*/
        }
        .login-code{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          position: relative;
          img{
            height: 36px;
            position: absolute;
            bottom: 0;
            border-bottom-right-radius: 4px;
            border-top-right-radius: 4px;
            right: 0;
          }
        }
      }
      .login-itemText{
        width: 4rem;
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
          font-size: 0.18rem;
          color:#036FE2;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .login-button{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.3rem;
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
