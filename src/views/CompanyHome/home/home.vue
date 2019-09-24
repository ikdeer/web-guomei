<template>
    <div class="CompanyHome">
      <!-- header区域组件 -->
      <header class="home-header">
        <!-- 头部公用组件 -->
        <Header_Nav></Header_Nav>
        <el-carousel height="528px">
          <el-carousel-item>
            <div class="header-IfoImg">
              <img src="/static/images/meizhi.JPG" class="header-ImgBg" alt="">
              <div class="IfoImg-left">
                <p class="IfoImg-Title">人脸对比</p>
                <p class="IfoImg-Text">人脸识别（Face Recognition）基于图像或视频中的人脸检测、分析和比对技术，
                  提供人脸检测定位、人脸属性识别和人脸比对等独立服务模块。可以为开发者和
                  企业提供高性能的在线API服务，应用于人脸AR、人脸识别和认证、大规模人脸
                  检索、照片管理等各种场景。</p>
                <el-button class="IfoImg-button" @click.stop="ClickApply">立即申请</el-button>
                <p class="IfoImg-TextSmall">国美家服务信息技术中心&nbsp;&nbsp;&nbsp;提供技术支持</p>
              </div>
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
                    <span>查看接口文档</span>
                    <span>开发工具</span>
                  </div>
                </div>
              </li>
              <li class="service-li">
                <div class="service-pad">
                  <h4 class="service-Title">离线SDK</h4>
                  <p class="service-text">设备端离线实时监测视频流中的人脸，同时支持处理静态或者视频流，输出人脸图片并进行图片质量控制</p>
                  <div class="service-buttom">
                    <span>离线采集SDK</span>
                    <span>离线识别SDK</span>
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
    import {getProductServiceShow,getSolutionShow} from "../../../HttpApi/home/homeApi";
    export default {
      name: "home",
      components:{Header_Nav, Footer_Nav},
      data(){
        return {
          groupID:'',//登录人员身份
          productList:[
            {
              productImg:'/static/images/analysis_image@2x.png',
              productTitle:'人脸检测与属性分析',
              productText:'精准定位图中人脸，获得眼、口、鼻等关键点位置，分析性别、年龄、等多种人脸属性',
              productId:1,
            },
            {
              productImg:'/static/images/identify_image@2x.png',
              productTitle:'人脸对比',
              productText:'对比两张人脸的相似度，并给出相似度评分，从而判断是否同一人',
              productId:2,
            },
            {
              productImg:'/static/images/explore_image@2x.png',
              productTitle:'人脸搜索',
              productText:'针对一张人脸照片，在指定人脸集合中搜索，找出最相似的一张脸或多张人脸，并给出相似度分值',
              productId:3,
            },
            {
              productImg:'/static/images/detection_image@2x.png',
              productTitle:'活体检测',
              productText:'提供离线在线方式的活体检测能力，判断操作用户是否为真人，有效抵御照片、视频、模具等作弊攻击',
              productId:4,
            },
            {
              productImg:'/static/images/collect_image@2x.png',
              productTitle:'视频流人脸采集',
              productText:'设备端离线实时监测视频流中的人脸，同时支持处理静态或者视频流，输出人脸图片并进行图片质量控制',
              productId:5,
            },
            {
              productImg:'/static/images/contrast_image@2x.png',
              productTitle:'离线识别SDK',
              productText:'提供设备端本地化的人脸采集、活体检测、人脸对比与识别能力，可在无网络环境下离线使用',
              productId:6,
            },
          ],
          schemeList:[
            {
              schemeImg:'/static/images/attendance_icon@ss2x.png',
              schemeTitle:'人脸考勤',
              schemeText:'提供离线在线方式的活体检测能力，判断操作用户是否为真人，有效抵御照片、视频、模具等作弊攻击',
              schemeType:'人脸检测',
              schemeId:1
            },
            {
              schemeImg:'/static/images/abckdkd.png',
              schemeTitle:'刷脸门禁考勤',
              schemeText:'设备端离线实时监测视频流中的人脸，同时支持处理静态或者视频流，输出人脸图片并进行图片质量控制',
              schemeType:'人脸搜索',
              schemeId:2
            },
            {
              schemeImg:'/static/images/Group@2x.png',
              schemeTitle:'安防监控',
              schemeText:'提供设备端本地化的人脸采集、活体检测、人脸对比与识别能力，可在无网络环境下离线使用',
              schemeType:'人脸搜索',
              schemeId:3
            },
            {
              schemeImg:'/static/images/login_icon@2x.png',
              schemeTitle:'人脸登录',
              schemeText:'提供离线在线方式的活体检测能力，判断操作用户是否为真人，有效抵御照片、视频、模具等作弊攻击',
              schemeType:'人脸检测',
              schemeId:4
            },
            {
              schemeImg:'/static/images/pay_icon@2x.png',
              schemeTitle:'人脸支付',
              schemeText:'设备端离线实时监测视频流中的人脸，同时支持处理静态或者视频流，输出人脸图片并进行图片质量控制',
              schemeType:'人脸搜索',
              schemeId:5
            },
            {
              schemeImg:'/static/images/member_icon@2x.png',
              schemeTitle:'会员识别',
              schemeText:'提供设备端本地化的人脸采集、活体检测、人脸对比与识别能力，可在无网络环境下离线使用',
              schemeType:'人脸搜索',
              schemeId:6
            },
          ],
          tableData:[],//产品服务
          schemeData:[],//解决方案
          page:{
            pageNum:1,
            pageSize:6,
          }
        }
      },
      methods:{
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
          this.$router.push({path:'/Company/product',query:{productId:item.id}});
        },
        //解决方案区域跳转
        ClickSchemeURL(item){
          this.$router.push({path:'/Company/solution',query:{schemeId:item.id}});
        }
      },
      mounted(){
        let userInfo = this.Cookies.get('userInfo') || '';
        this.groupID =userInfo ? JSON.parse(userInfo).groupID : '';
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
      .IfoImg-left{
        position: absolute;
        top: 1rem;
        left: 1.5rem;
        .IfoImg-Title{
          font-size: 0.68rem;
          color: #ffffff;
          font-weight: 700;
        }
        .IfoImg-Text{
          width: 7.95rem;
          font-size: 0.22rem;
          color: #ffffff;
          font-weight: 400;
          padding:0.3rem 0;
          line-height: 0.37rem;
        }
        .IfoImg-button{
          background: #ffffff;
          color: #F20A59;
          font-size: 0.2rem;
          border-radius: 0.29rem;
          padding: 0.16rem 0.5rem;
          border: none;
          display: block;
        }
        .IfoImg-TextSmall{
          padding-top: 0.38rem;
          font-size: 0.18rem;
          color: #999999;
        }
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
