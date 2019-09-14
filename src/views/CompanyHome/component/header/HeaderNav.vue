<template>
  <nav class="header-nav">
    <div class="header-nav_Left">
      <div class="header-navLeft">
        <img class="navLeft-Img" src="/static/images/logo_imgae@2x.png" @click.stop="ClickURL">
      </div>
      <div class="header-navCenter">
        <div class="navCenter-div">
          <router-link  tag="div"
                        class="One-Level"
                        v-for="(item,index) in stairList"
                        :to="{path:item.stairRouter}">
            <span class="One-LevelText">{{item.stairText}}</span>
            <!--<div class="navCenter-divMenu" v-if="item.secondList.length != '0'">
              <router-link  tag="div"
                            class="second-level"
                            v-for="(items,indexS) in item.secondList"
                            :to="{path:''}">
                <span class="second-levelText">{{items.secondText}}</span>
              </router-link>
            </div>-->
          </router-link>
        </div>
      </div>
    </div>
    <div class="header-navRight">
      <template v-if="token != null">
        <el-dropdown @command="handleCommand" @visible-change="visibleShow" placement="top">
          <div class="header-navName">
            <img src="/static/images/sy_icon_me_64@2x.png" alt="">
            <span>{{userInfo.userName}}</span>
            <span :class="isIconShow ? 'el-icon-arrow-down gm-sbc' : 'el-icon-arrow-right gm-sbc'"></span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">用户中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="Quit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template v-else>
        <router-link :to="{path:'/Company/userLogin'}">
          <el-button type="text" class="button-login">注册</el-button>
        </router-link>
        <el-button type="text" class="button-register" @click="ClickLogout">登录</el-button>
      </template>
      <el-button class="button-console" @click="ClickWhetherLogin">控制台</el-button>
    </div>
  </nav>
</template>

<script>
  import {getUserLogout} from "@/HttpApi/login/loginApi";
  export default {
    name: "header",
    data(){
      return {
        stairList:[
          {
            stairText:'产品服务',
            isStairText:false,
            stairRouter:'/Company/product',
          },
          {
            stairText:'解决方案',
            isStairText:false,
            stairRouter:'/Company/solution',
            secondList:[]
          },
          {
            stairText:'技术文档',
            isStairText:false,
            stairRouter:'/Company/APITCF',
            secondList:[]
          },
          {
            stairText:'接入须知',
            isStairText:false,
            stairRouter:'/Company/AccessToInformation',
            secondList:[]
          },
        ],
        token:null,//登陆唯一标识token
        userInfo:null,//登陆用户信息
        isIconShow:false,
      }
    },
    methods:{
      ClickLogout(){
        if(this.Cookies.get('token')){
          this.$notify({
            title: '成功',
            message: '登录成功,请勿重复登录',
            type: 'success'
          });
        }else{
          this.$router.push({path: '/Company/login'});
        }
      },
      ClickWhetherLogin(){
        if(this.Cookies.get('token')){
          this.$router.push({path: '/Index/overview'});
        }else{
          this.$message({
            message: '你还没有登录,请先登录~~~',
            type: 'warning'
          });
          this.$router.push({path: '/Company/login',query:{redirect:'overview'}});
        }
      },
      handleCommand(command){
        let _this = this;
        if(command == 'Quit'){
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:'gm-config',
            type: 'warning'
          }).then(() => {
            getUserLogout().then(response => {
              if(response.data.success){
                _this.Cookies.remove('token');
                _this.Cookies.remove('userInfo');
                _this.$message({
                  type: 'success',
                  message: '退出登录成功!'
                });
                setTimeout(()=>{
                  _this.$router.go(0);
                },200)
              }else{
                _this.$message.error(response.data.data.msg);
              }
            })
          }).catch(() => {});
        }else{
          this.$router.push({path:'/Index/userInfo',query:{id:this.userInfo.uid}});
        }
      },
      //角标icon显示隐藏
      visibleShow(isIconShow){
        this.isIconShow = isIconShow;
      },
      //跳转首页
      ClickURL(){
        let routeData = this.$router.resolve({
          path: '/Company/CompanyHome',
        });
        window.open(routeData.href, '_blank');
      }
    },
    mounted(){
      let cookies = this.Cookies.get('token');
      let userInfoObj = this.Cookies.get('userInfo');
      this.token = cookies ? cookies : null;
      this.userInfo = userInfoObj ? JSON.parse(userInfoObj) : null;
    }
  }
</script>

<style lang="scss">
  .header-nav{
    width: 100%;
    height: 0.8rem;
    background: #1B1B1B;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .header-nav_Left{
      width: 75%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      .header-navLeft{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        .navLeft-Img{
          width: 3.88rem;
          height: 0.46rem;
          display: block;
          margin-left: 0.4rem;
          cursor: pointer;
        }
      }
      .header-navCenter{
        margin-left: 0.82rem;
        .navCenter-div{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          .One-Level{
            width: 1.6rem;
            height:0.8rem;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
            .One-LevelText{
              font-size: 0.16rem;
              text-decoration: none;
              color: #ffffff;
            }
            .navCenter-divMenu{
              width: 1.6rem;
              padding: 0.2rem 0;
              position: absolute;
              left: 0;
              top: 0.8rem;
              background: #1A1A1A;
              display: none;
              .second-level{
                display: flex;
                display: -webkit-flex;
                align-items: center;
                justify-content: center;
                .second-levelText{
                  font-size: 0.14rem;
                  padding: 0.09rem 0.18rem;
                  color: #ffffff;
                  display: block;
                }
              }
              .second-level:hover{
                .second-levelText{
                  background: #2B2B2B;
                  color: #F20A59;
                }
              }
            }
          }
          .One-Level:hover{
            background: #000000;
            .navCenter-divMenu{
              display: block;
            }
            .One-LevelText{
              color: #F20A59;
              text-decoration: none;
              line-height: 0.8rem;
              border-bottom: 0.04rem solid #F20A59;
            }
          }
        }
      }
    }

    .header-navRight{
      width: 25%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 0.4rem;
      .header-navName{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        margin-right: 0.25rem;
        img{
          width: 0.4rem;
          height: 0.4rem;
          display: block;
          border-radius: 50%;
          overflow: hidden;
        }
        span{
          font-size: 0.14rem;
          color: #ffffff;
          margin-left: 0.13rem;
        }
        .gm-sbc{
          font-size: 0.2rem;
          color: #dddddd;
        }
      }
      .button-login{
        font-size: 0.16rem;
        color: #ffffff;
      }
      .button-register{
        font-size: 0.16rem;
        color: #ffffff;
        margin-left: 0.36rem;
        margin-right: 0.3rem;
      }
      .button-console{
        padding: 0.1rem 0.4rem;
        border-radius: 0.18rem;
        font-size: 0.16rem;
        color: #ffffff;
        background:#F20A59;
        border: none;
      }
    }
  }
  .gm-config{
    .el-message-box__content{
      padding: 0.3rem 0.3rem;
      color: #333333;
      font-weight: 600;
      text-align: left;
    }
    .el-message-box__btns{
      button{
        padding: 0.09rem 0.25rem;
      }
    }
  }
</style>
