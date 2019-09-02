<template>
  <nav class="header-nav">
    <div class="header-nav_Left">
      <div class="header-navLeft">
        <img class="navLeft-Img" src="/static/images/logo_image@2x.png" alt="">
        <div class="navLeft-Text">
          <span></span>
          <p>人脸认证开放平台</p>
        </div>
      </div>
      <div class="header-navCenter">
        <div class="navCenter-div">
          <router-link  tag="div"
                        class="One-Level"
                        v-for="(item,index) in stairList"
                        :to="{path:item.stairRouter}">
            <span class="One-LevelText">{{item.stairText}}</span>
            <div class="navCenter-divMenu" v-if="item.secondList.length != '0'">
              <router-link  tag="div"
                            class="second-level"
                            v-for="(items,indexS) in item.secondList"
                            :to="{path:''}">
                <span class="second-levelText">{{items.secondText}}</span>
              </router-link>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="header-navRight">
      <router-link :to="{path:'/Company/userLogin'}">
        <el-button type="text" class="button-login">注册</el-button>
      </router-link>
      <el-button type="text" class="button-register" @click="ClickLogout">登陆</el-button>
      <el-button class="button-console" @click="ClickWhetherLogin">控制台</el-button>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "header",
    data(){
      return {
        stairList:[
          {
            stairText:'产品服务',
            isStairText:false,
            stairRouter:'/Company/product',
            secondList:[
              {
                secondText:'技术文档',
                isSecondText:false,
              },
              {
                secondText:'产品服务',
                isSecondText:false,
              },
              {
                secondText:'接入须知',
                isSecondText:false,
              },
            ]
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
        ]
      }
    },
    methods:{
      ClickLogout(){
        if(this.Cookies.get('token')){
          this.$notify({
            title: '成功',
            message: '登陆成功,请勿重复登陆',
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
            message: '你还没有登陆,请先登陆~~~',
            type: 'warning'
          });
          this.$router.push({path: '/Company/login',query:{console:'overview'}});
        }
      }
    }
  }
</script>

<style scoped lang="scss">
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
          width: 1.38rem;
          height: 0.46rem;
          display: block;
          margin-left: 0.4rem;
        }
        .navLeft-Text{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          >span{
            width: 0.02rem;
            height: 0.3rem;
            display: block;
            background: #ffffff;
            margin:0 0.2rem;
          }
          >p{
            font-size: 0.18rem;
            color: #ffffff;
            font-weight: 600;
          }
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
</style>
