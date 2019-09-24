<template>
    <div class="CompanyHome">
      <!-- header区域组件 -->
      <header class="home-header">
        <!-- 头部公用组件 -->
        <Header_Nav></Header_Nav>
        <!-- banner轮播 -->
        <el-carousel height="528px">
          <el-carousel-item v-for="(item,index) in bannerData" v-if="item.differentiate == 1">
            <div class="header-IfoImg">
              <img :src="item.imgUrl" class="header-ImgBg" alt="">
              <el-button class="IfoImg-button" @click.stop="ClickApply">立即申请</el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
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
              <li v-for="(item,index) in tableData">
                <div class="ListUl-Pad">
                  <img class="ListUl-PadImg" :src="item.imgUrl" alt="">
                  <h4 class="ListUl-PadTitle">{{item.title}}</h4>
                  <p class="ListUl-PadText">{{item.intro}}</p>
                  <el-button class="ListUl-PadButton" @click="ClickProduct(item)">了解详情</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 解决方案区域 -->
        <div class="main-solution">
          <div class="solution-Text">
            <h2 class="solution-TextH2">解决方案</h2>
            <span></span>
          </div>
          <div class="solution-List">
            <ul class="solution-ListUl">
              <li class="ListUl-li" v-for="(item,index) in schemeData" :key="item.id" @click="ClickSchemeURL(item,index)">
                <div class="ListUl-pad">
                  <div class="listUl-header">
                    <img :src="item.imgUrl" alt="">
                    <span>{{item.title}}</span>
                  </div>
                  <p class="listUl-Text">{{item.intro}}</p>
                  <div class="listUl-title">
                    <span>主要服务：</span>
                    <span>{{item.primaryService}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 服务类型 -->
        <div class="main-service">
          <div class="service-Text">
            <h2 class="service-TextH2">服务类型</h2>
            <span></span>
          </div>
          <div class="service-List">
            <ul class="service-ListUl">
              <li class="service-li">
                <div class="service-pad">
                  <h4 class="service-Title">在线接口</h4>
                  <p class="service-text">提供离线在线方式的活体检测能力，判断操作用户是否为真人，有效抵御照片、视频、模具等作弊攻击</p>
                  <div class="service-buttom">
                    <router-link tag="span" :to="{path:'/Company/APITCF'}">查看接口文档</router-link>
                    <router-link tag="span" :to="{path:'/Company/APITCF'}">开发工具</router-link>
                  </div>
                </div>
              </li>
              <li class="service-li">
                <div class="service-pad">
                  <h4 class="service-Title">离线SDK</h4>
                  <p class="service-text">设备端离线实时监测视频流中的人脸，同时支持处理静态或者视频流，输出人脸图片并进行图片质量控制</p>
                  <div class="service-buttom">
                    <router-link tag="span" :to="{path:'/Company/APITCF'}">离线采集SDK</router-link>
                    <router-link tag="span" :to="{path:'/Company/APITCF'}">离线识别SDK</router-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <!-- footer区域组件 -->
      <Footer_Nav></Footer_Nav>
    </div>
</template>

<script>
    import Header_Nav from '@/views/CompanyHome/component/header/HeaderNav'
    import Footer_Nav from '@/views/CompanyHome/component/footer/FooterNav'
    import {getProductServiceShow,getSolutionShow,getBannerShow} from "../../../HttpApi/home/homeApi";
    export default {
      name: "home",
      components:{Header_Nav, Footer_Nav},
      data(){
        return {
          groupID:'',//登录人员身份
          tableData:[],//产品服务
          schemeData:[],//解决方案
          bannerData:[],//banner图
          page:{
            pageNum:1,
            pageSize:6,
          }
        }
      },
      methods:{
        //首页轮播
        getBannerShow(){
          getBannerShow().then(response => {
            if(response.data.errorCode == 200){
              this.bannerData = response.data.data ? response.data.data.list : [];
            }else{
              this.$message.error(response.data.errorInfo);
            }
          })
        },
        //产品服务列表
        getProductServiceShow(){
          getProductServiceShow({page:this.page.pageNum,pageSize:this.page.pageSize}).then(response => {
            if(response.data.errorCode == 200){
              this.tableData = response.data.data ? response.data.data.list : [];
            }else{
              this.$message.error(response.data.errorInfo);
            }
          })
        },
        //解决方案列表
        getSolutionShow(){
          getSolutionShow({page:this.page.pageNum,pageSize:this.page.pageSize}).then(response => {
            if(response.data.errorCode == 200){
              this.schemeData = response.data.data ? response.data.data.list : [];
            }else{
              this.$message.error(response.data.errorInfo);
            }
          })
        },
        //跳转应用创建页
        ClickApply(){
          let _this = this;
          if(this.Cookies.get('token')){
            if(this.groupID == '20'){
              _this.$router.push({path:'/Index/addApplication',query:{type:'add'}});
            }else{
              this.$message({message: '亲！你暂时没有权限哦~~~~', type: 'warning'});
            }
          }else{
            _this.$message.error('此功能需要登录过后才能查看');
            setTimeout(()=>{
              _this.$router.push({path:'/Company/login'});
            },300)
          }
        },
        //产品功能区域跳转
        ClickProduct(item){
          if(item.urlAddress == '/Company/product'){
            this.$router.push({path:item.urlAddress,query:{productId:item.id}});
          }else{
            window.open(item.urlAddress);
          }
        },
        //解决方案区域跳转
        ClickSchemeURL(item){
          if(item.urlAddress == '/Company/solution'){
            this.$router.push({path:item.urlAddress,query:{productId:item.id}});
          }else{
            window.open(item.urlAddress);
          }
        }
      },
      mounted(){
        let userInfo = this.Cookies.get('userInfo') || '';
        this.groupID =userInfo ? JSON.parse(userInfo).groupID : '';
        this.getBannerShow();
        this.getProductServiceShow();
        this.getSolutionShow();
      }
    }
</script>

<style scoped lang="scss">
.CompanyHome{
  width: 100%;
  .home-header{
    width: 100%;
    .header-IfoImg{
      width: auto;
      height: 5.8rem;
      display: flex;
      margin-top: 0.8rem;
      position: relative;
      .header-ImgBg{
        width: 100%;
        height: 5.8rem;
        display: block;
        overflow: hidden;
      }
      .IfoImg-button{
        background: #ffffff;
        color: #F20A59;
        font-size: 0.2rem;
        border-radius: 0.29rem;
        padding: 0.16rem 0.5rem;
        border: none;
        display: block;
        position: absolute;
        top: 3.64rem;
        left: 1.5rem;
      }
    }
  }
  .home-main{
    width: 100%;
    .main-product{
      padding-left: 1.69rem;
      padding-right: 1.69rem;
      padding-bottom: 0.3rem;
      background: #ffffff;
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
                border-radius: 50%;
                overflow: hidden;
              }
              .ListUl-PadTitle{
                font-size:0.22rem;
                color: #252525;
                font-weight: 700;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .ListUl-PadText{
                font-size: 0.18rem;
                color: #666666;
                margin-top: 0.19rem;
                margin-bottom: 0.3rem;
                text-align: center;
                height: 0.9rem;
                line-height: 0.3rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
              }
              .ListUl-PadButton{
                display: block;
                margin-left: auto;
                margin-right: auto;
                line-height: 0.54rem;
                padding: 0;
                width: 2.04rem;
                border-radius: 0.27rem;
                background: #ffffff;
                font-size: 0.18rem;
                border-color: #999999;
              }
            }
          }
          >li:hover{
            background: #ffffff;
            box-shadow:0 0.02rem 0.2rem 0.07rem rgba(0,0,0,0.1);
            border-radius:0.6rem;
            .ListUl-Pad{
              .ListUl-PadButton{
                display: block;
                margin-left: auto;
                margin-right: auto;
                border-radius: 0.27rem;
                font-size: 0.18rem;
                border-color: #F20A59;
                color:#F20A59;
                background: #ffffff;
              }
            }
          }
        }
      }
    }
    .main-solution{
      background: #F0F2F5;
      .solution-Text{
        width: 100%;
        padding-top: 0.78rem;
        padding-bottom: 0.76rem;
        position: relative;
        .solution-TextH2{
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
          top: 75%;
          left: 50%;
          -webkit-transform: translate(-50%,-70%);
          -ms-transform: translate(-50%,-70%);
          transform: translate(-50%,-70%);
        }
      }
      .solution-List{
        padding:0 1.21rem;
        .solution-ListUl{
          width: 100%;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          .ListUl-li{
            width: 4.8rem;
            height: 3.26rem;
            border: 1px solid #979797;
            border-radius:0.6rem;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.9rem;
            cursor: pointer;
            .ListUl-pad{
              width: 4rem;
              .listUl-header{
                display: flex;
                display: -webkit-flex;
                align-items: center;
                justify-content: center;
                >img{
                  width: 0.5rem;
                  height: 0.6rem;
                  display: block;
                }
                >span{
                  font-size: 0.26rem;
                  color:#333333;
                  font-weight:600;
                  margin-left: 0.14rem;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
              }
              .listUl-Text{
                font-size: 0.18rem;
                color: #666666;
                margin-top: 0.24rem;
                margin-bottom: 0.41rem;
                line-height: 0.3rem;
                height: 0.9rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                word-break: break-all;
              }
              .listUl-title{
                display: flex;
                display: -webkit-flex;
                align-items: center;
                font-weight: 700;
                span:first-child{
                  font-size: 0.2rem;
                  color: #252525;
                }
                span:last-child{
                  width: 60%;
                  font-size: 0.2rem;
                  color: #036FE2;
                  margin-left:0.22rem;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                  overflow: hidden;
                }
              }
            }
          }
          .ListUl-li:hover{
            border: 1px solid #036FE2;
            .ListUl-pad{
              .listUl-header{
                span{
                  color: #036FE2;
                }
              }
            }
          }
        }
      }
    }
    .main-service{
      background: #ffffff;
      padding-bottom: 0.3rem;
      .service-Text{
        width: 100%;
        padding-top: 0.8rem;
        padding-bottom: 0.55rem;
        position: relative;
        .service-TextH2{
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
          left: 50%;
          margin-top: 1.3%;
          -webkit-transform: translate(-50%,-80%);
          -ms-transform: translate(-50%,-80%);
          transform: translate(-50%,-80%);
        }
      }
      .service-List{
        padding:0 4.49rem;
        .service-ListUl{
          width: 100%;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: space-between;
          .service-li{
            width: 4.5rem;
            height: 2.5rem;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            box-shadow:0 0.01rem 0.1rem 0.01rem rgba(0,0,0,0.11);
            border-radius:0.3rem;
            border:0.01rem solid rgba(253,253,253,1);
            .service-pad{
              width: 3.42rem;
              margin-top: 0.23rem;
              .service-Title{
                font-size: 0.24rem;
                font-weight: 600;
                color: #252525;
                text-align: center;
              }
              .service-text{
                font-size: 0.18rem;
                color: #666666;
                margin-top: 0.22rem;
                margin-bottom: 0.24rem;
                line-height: 0.28rem;
              }
              .service-buttom{
                display: flex;
                display: -webkit-flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                span{
                  font-size: 0.2rem;
                  color: #F20A59;
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
