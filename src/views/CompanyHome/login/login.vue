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
          <el-form :model="loginForm" :rules="rules2" ref="loginForm">
            <div class="login-form">
              <el-form-item prop="username">
                <el-input placeholder="用户名(6-20位字母数字)/手机号/邮箱" v-model="loginForm.username"></el-input>
              </el-form-item>
            </div>
            <div class="login-form">
              <el-form-item prop="password">
                <el-input placeholder="密码" show-password type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
            </div>
            <div class="login-form">
              <el-form-item prop="code">
                <div class="login-code">
                  <el-input placeholder="请输入验证码" v-model="loginForm.code"></el-input>
                  <a href="javascript:;" @click="changeCodeImg()">
                    <img :src="loginForm.codeImg" alt="图片加载失败">
                  </a>
                </div>
              </el-form-item>
            </div>
            <div class="login-itemText">
              <span></span>
              <span>忘记密码</span>
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
  import {getUserLogin,getGeneraTingCode} from '@/HttpApi/login/loginApi'
    export default {
        name: "login",
        components:{Header_Nav},
        data(){
          return {
            loginForm:{
              username:'',//用户名
              password:'',//密码
              code:'',//图片验证码
              codeImg:'http://139.196.161.174:8090/gm/generating/code',
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
                { min: 1, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                { pattern: /^\S+$/, message: '用户名不允许有空格', trigger: 'blur' },
              ],
              password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
              ],
              code:[
                { required: true, message: '请输入验证码', trigger: 'blur' },
              ]
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
                    if(response.data.success){
                      this.Cookies.set('token',response.data.data.token);
                      this.userInfo.userName = response.data.data.username;
                      this.userInfo.userImg = response.data.data.username.substring(0,1);
                      this.userInfo.uid = response.data.data.uid;
                      this.userInfo.groupID = response.data.data.groupID;
                      this.Cookies.set('userInfo',JSON.stringify(this.userInfo));
                      this.$message({message: '登录成功', type: 'success'});
                      setTimeout(()=>{
                        if(_this.$route.query.console == 'overview'){
                          _this.$router.push({path: '/Index/overview'});
                        }else{
                          _this.$router.push({path: '/Company/CompanyHome'});
                        }
                      },500)
                    }else{
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
      .login-form{
        width: 3.28rem;
        height: 0.5rem;
        display: flex;
        display: -webkit-flex;
        margin-top: 0.3rem;
        .el-form-item{
          width: 100%;
          height: 0.5rem !important;
          input{
            height: 0.5rem !important;
          }
        }
        .login-code{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          position: relative;
          img{
            height:32px;
            position: absolute;
            right: 0;
            bottom: 0;
            border-bottom-right-radius: 4px;
            border-top-right-radius: 4px;
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
