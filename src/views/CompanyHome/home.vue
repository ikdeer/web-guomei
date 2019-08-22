<template>
    <div class="CompanyHome">
      <!-- 头部区域 header -->
      <header class="home-header">
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
              <ul class="navCenter-ul">
                <li>
                  <span>产品服务</span>
                  <ul class="navCenter-ulMenu">
                    <li>
                      <span>技术文档</span>
                    </li>
                    <li>
                      <span>产品服务</span>
                    </li>
                    <li>
                      <span>接入须知</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>解决方案</span>
                </li>
                <li>
                  <span>技术文档</span>
                </li>
                <li>
                  <span>接入须知</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="header-navRight">
            <el-button type="text" class="button-login">登陆</el-button>
            <el-button type="text" class="button-register">注册</el-button>
            <el-button class="button-console">控制台</el-button>
          </div>
        </nav>
        <div class="header-IfoImg">
          <div class="IfoImg-left">
            <h4 class="IfoImg-Title">人脸对比</h4>
            <p class="IfoImg-Text">人脸识别（Face Recognition）基于图像或视频中的人脸检测、分析和比对技术，
              提供人脸检测定位、人脸属性识别和人脸比对等独立服务模块。可以为开发者和
              企业提供高性能的在线API服务，应用于人脸AR、人脸识别和认证、大规模人脸
              检索、照片管理等各种场景。</p>
            <el-button class="IfoImg-button">立即申请</el-button>
            <p class="IfoImg-TextSmall">国美家服务信息技术中心  提供技术支持</p>
          </div>
          <div class="IfoImg-right">
            <img src="/static/images/banner_bg@2x.png" alt="">
          </div>
        </div>
      </header>
      <!-- 主体内容区域 -->
      <main class="home-main">
        <!-- 产品功能区域 -->
        <div class="main-product">
          <div class="product-Text">
            <h2 class="product-TextH2">产品功能</h2>
            <span></span>
          </div>
          <div class="product-List">
            <ul class="product-ListUl">
              <li>
                <div class="ListUl-Pad">
                  <img class="ListUl-PadImg" src="/static/images/analysis_image@2x.png" alt="">
                  <h4 class="ListUl-PadTitle">人脸检测与属性分析</h4>
                  <p class="ListUl-PadText">人脸检测与属性分析</p>
                  <el-button class="ListUl-PadButton">了解详情</el-button>
                </div>
              </li>
              <li>
                <div class="ListUl-Pad">
                  <img class="ListUl-PadImg" src="/static/images/analysis_image@2x.png" alt="">
                  <h4 class="ListUl-PadTitle">人脸检测与属性分析</h4>
                  <p class="ListUl-PadText">人脸检测与属性分析</p>
                  <el-button class="ListUl-PadButton">了解详情</el-button>
                </div>
              </li>
              <li>
                <div class="ListUl-Pad">
                  <img class="ListUl-PadImg" src="/static/images/analysis_image@2x.png" alt="">
                  <h4 class="ListUl-PadTitle">人脸检测与属性分析</h4>
                  <p class="ListUl-PadText">人脸检测与属性分析</p>
                  <el-button class="ListUl-PadButton">了解详情</el-button>
                </div>
              </li>
              <li>
                <div class="ListUl-Pad">
                  <img class="ListUl-PadImg" src="/static/images/analysis_image@2x.png" alt="">
                  <h4 class="ListUl-PadTitle">人脸检测与属性分析</h4>
                  <p class="ListUl-PadText">人脸检测与属性分析</p>
                  <el-button class="ListUl-PadButton">了解详情</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
          return {

          }
        }
    }
</script>

<style scoped lang="scss">
.CompanyHome{
  width: 100%;
  .home-header{
    width: 100%;
    .header-nav{
      width: 100%;
      height: 0.8rem;
      background: #1B1B1B;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
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
              font-size: 0.26rem;
              color: #ffffff;
              font-weight: 600;
            }
          }
        }
        .header-navCenter{
          margin-left: 0.82rem;
          .navCenter-ul{
            display: flex;
            display: -webkit-flex;
            align-items: center;
            >li{
              width: 1.6rem;
              height:0.8rem;
              display: flex;
              display: -webkit-flex;
              align-items: center;
              justify-content: center;
              position: relative;
              span{
                font-size: 0.2rem;
                color: #ffffff;
              }
              .navCenter-ulMenu{
                width: 1.6rem;
                padding: 0.2rem 0;
                position: absolute;
                left: 0;
                top: 0.8rem;
                background: #1A1A1A;
                display: none;
                >li{
                  display: flex;
                  display: -webkit-flex;
                  align-items: center;
                  justify-content: center;
                  >span{
                    font-size: 0.18rem;
                    padding: 0.09rem 0.18rem;
                    color: #ffffff;
                  }
                }
                >li:hover{
                  >span{
                    background: #2B2B2B;
                    color: #F20A59;
                  }
                }
              }
            }
            >li:hover{
              background: #000000;
              .navCenter-ulMenu{
                display: block;
              }
              >span{
                color: #F20A59;
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
          font-size: 0.2rem;
          color: #ffffff;
        }
        .button-register{
          font-size: 0.2rem;
          color: #ffffff;
          margin-left: 0.36rem;
          margin-right: 0.3rem;
        }
        .button-console{
          padding: 0.11rem 0.45rem;
          border-radius: 0.18rem;
          font-size: 0.2rem;
          color: #ffffff;
          background:#F20A59;
          border: none;
        }
      }
    }
    .header-IfoImg{
      width: auto;
      height: 5.8rem;
      background:linear-gradient(225deg,rgba(0,192,249,1) 0%,rgba(2,101,228,1) 100%);
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 1.5rem;
      padding-right: 2.12rem;
      .IfoImg-left{
        .IfoImg-Title{
          font-size: 0.68rem;
          color: #ffffff;
          font-weight: 600;
        }
        .IfoImg-Text{
          width: 7.95rem;
          font-size: 0.22rem;
          color: #ffffff;
          font-weight: 400;
          padding:0.3rem 0;
        }
        .IfoImg-button{
          background: #ffffff;
          color: #F20A59;
          font-size: 0.2rem;
          border-radius: 0.29rem;
          padding: 0.12rem 0.5rem;
          border: none;
          display: block;
        }
        .IfoImg-TextSmall{
          padding-top: 0.38rem;
          font-size: 0.18rem;
          color: #ffffff;
          font-weight: 400;
        }
      }
      .IfoImg-right{
        width: 5rem;
        height: 4.7rem;
        >img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
  .home-main{
    width: 100%;
    .main-product{
      padding:0 1.69rem;
      background: #F0F2F5;
      .product-Text{
        width: 100%;
        padding-top: 0.8rem;
        padding-bottom: 1rem;
        position: relative;
        .product-TextH2{
          font-size: 0.48rem;
          color:#252525;
          text-align: center;
          font-weight: 600;
        }
        >span{
          width: 0.88rem;
          height: 0.04rem;
          border-radius:0.02rem;
          background: #036FE2;
          display: block;
          position: absolute;
          top: 65%;
          left: 50%;
          -webkit-transform: translate(-50%,-65%);
          -ms-transform: translate(-50%,-65%);
          transform: translate(-50%,-65%);
        }
      }
      .product-List{
        width: 100%;
        .product-ListUl{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          flex-wrap: wrap;
          >li{
            width: 33.33333%;
            height: 6.44rem;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            .ListUl-Pad{
              width: 3.62rem;
              .ListUl-PadImg{
                width: 3.62rem;
                height: 3.62rem;
                display: block;
              }
              .ListUl-PadTitle{
                font-size:0.26rem;
                color: #252525;
                font-weight: 600;
                padding-top: 0.05rem;
                text-align: center;
              }
              .ListUl-PadText{
                font-size: 0.18rem;
                color: #666666;
                padding-top: 0.23rem;
                padding-bottom: 0.6rem;
                text-align: center;
              }
              .ListUl-PadButton{
                display: block;
                margin-left: auto;
                margin-right: auto;
                padding: 0.1rem 0.35rem;
                border-radius: 0.27rem;
                background: #F0F2F5;
                font-size: 0.18rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
