<template>
  <div class="login">
    <!-- header导航组件 -->
    <Header_Nav></Header_Nav>
    <div class="login-bgImg">
      <img src="/static/images/banner-login-bg@2x.png" alt="">
    </div>
    <div class="login-center">
      <div class="login-input">
        <p class="login-text">忘记密码</p>
        <el-form :model="loginForm" size="medium" :rules="rules2" ref="loginForm" label-width="20px">
          <div class="loginUser-input">
            <el-form-item prop="phoneNum" label=" ">
              <el-input placeholder="手机号" type="text" maxlength="11" v-model="loginForm.phoneNum"></el-input>
            </el-form-item>
          </div>
          <div class="loginUser-input">
            <el-form-item prop="msgCode" label=" ">
              <el-input placeholder="验证码" v-model="loginForm.msgCode">
                <el-button slot="append"  :disabled='loginForm.disabled'  @click="ClickCode()">{{loginForm.codeText}}</el-button>
              </el-input>
            </el-form-item>
          </div>
          <div class="loginUser-input">
            <el-form-item prop="password">
              <el-input placeholder="密码" type="password"  maxlength="16" v-model="loginForm.password"></el-input>
            </el-form-item>
          </div>
          <div class="loginUser-input">
            <el-form-item prop="confirmPassword">
              <el-input placeholder="确认登录密码" type="password" maxlength="16" v-model="loginForm.confirmPassword"></el-input>
            </el-form-item>
          </div>
          <div class="login-button">
            <el-form-item>
              <el-button @click="ClickUserRegister">确认</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Header_Nav from '@/views/CompanyHome/component/header/HeaderNav'
  import {geUserResetPassWord,geUserResetPasswordPhoneMsg} from '@/HttpApi/login/loginApi'
  export default {
    name: "forgetPaw",
    components:{Header_Nav},
    data(){
      var password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length < 8 || value.length > 16){
          callback(new Error('8到16位字母和数字'));
        }else if(/^[^\d]*$|^[^a-zA-Z]*$|[^\da-zA-Z]/.test(value)){
          callback(new Error('密码不符合规则'));
        }else{
          if (this.loginForm.confirmPassword !== '') {
            this.$refs.loginForm.validateField('confirmPassword');
          }
          callback();
        }
      };
      var confirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginForm:{
          phoneNum:'',//手机号码
          password:'',//密码, 非MD5
          msgCode:'',//短信验证码
          confirmPassword:'',//确认密码
          codeText:'获取验证码',
          disabled:false,
          outTime: 60,//验证码时间
          time:'',//时间
          phoneReg:/^1[3|4|5|6|7|8|9][0-9]{9}$/,//手机正则
        },
        rules2:{
          phoneNum:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/, message: '请输入正确的11位手机号码', trigger: 'blur' },
          ],
          password:[
            { validator: password, trigger: 'blur' },
          ],
          confirmPassword:[
            { validator: confirmPassword, trigger: 'blur' },
          ],
          msgCode:[
            { required: true, message: '请输入短信验证码', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      //短信验证码
      UserMsgCode(){
        geUserResetPasswordPhoneMsg({'phoneNum':this.loginForm.phoneNum}).then(response => {
          if(response.data.errorCode == 200){
            this.$message({message: '短信验证码发送成功', type: 'success'});
          }else{
            this.$message.error('短信验证码发送失败');
          }
        })
      },
      //获取短信证码
      ClickCode(){
        let _this = this;
        this.$refs.loginForm.validateField('phoneNum', (phoneError) => {
          if(this.loginForm.phoneReg.test(this.loginForm.phoneNum)){
            this.loginForm.codeText='发送中...';
            this.loginForm.disabled=true;
            setTimeout(function(){
              _this.UserMsgCode();
              _this.setTime = setInterval(() => {
                _this.loginForm.time=_this.loginForm.outTime--;
                _this.loginForm.codeText=_this.loginForm.time+'S后发送';
                if(_this.loginForm.time <= 0){
                  clearInterval(_this.setTime);
                  _this.loginForm.outTime =60;
                  _this.loginForm.disabled = false;
                  _this.loginForm.codeText = '获取验证码';
                }
              },1000);
            },500);
          }
        })
      },
      //注册
      ClickUserRegister(){
        let _this = this;
        this.$refs.loginForm.validate((valid) => {
          if(valid){
            //注册用户接口
            geUserResetPassWord({
              'phoneNum':this.loginForm.phoneNum,//手机号码
              'password':this.loginForm.password,//密码, 非MD5
              'msgCode':this.loginForm.msgCode,//短信验证码
            }).then(response => {
              if(response.data.errorCode == '200'){
                _this.$message({
                  message: '密码修改成功',
                  type: 'success'
                });
                setTimeout(()=>{
                  _this.$router.push({path:'/Company/login'});
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
      padding-top: 0.3rem;
      padding-bottom: 0.2rem;
      .login-input{
        width: 4.2rem;
        .login-text{
          font-size: 0.26rem;
          color: #666666;
          font-weight: 600;
          text-align: center;
          padding-bottom: 0.2rem;
        }
        .loginUser-input{
          width: auto;
          display: flex;
          display: -webkit-flex;
          .el-form-item{
            width: 100%;
            margin-bottom: 0.23rem;
            /*div{
              input{
                height: 0.43rem !important;
                font-size: 0.14rem !important;
              }
            }*/
          }
        }
        .login-button{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: center;
          .el-form-item{
            button{
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
  }
</style>
