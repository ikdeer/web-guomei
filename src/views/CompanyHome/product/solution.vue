<template>
    <div class="solution">
      <!-- header导航组件 -->
      <Header_Nav></Header_Nav>
      <div class="solution-content">
        <header class="solution-header">
          <div class="header-left">
            <h4 class="header-leftTitle">人脸考勤</h4>
            <p class="header-leftText">利用高精度的人脸识别、对比能力，搭建考勤系统，提升考勤效率，提高防作弊能力</p>
            <div class="header-leftButton">
              <el-button @click.stop="ClickApply">立即申请</el-button>
              <router-link tag="button" class="el-button el-button--default el-button--small" :to="{path:'/Company/APITCF'}">技术文档</router-link>
            </div>
            <p class="header-leftItem">国美家服务信息技术中心&nbsp;&nbsp;&nbsp;提供技术支持</p>
          </div>
          <div class="header-right">
            <img src="/static/images/plan_banner_bg@2x.png" alt="">
          </div>
        </header>
        <div class="solution-center">
          <div class="solution-left">
            <ul class="solution-ul">
              <li v-for="(item,index) in schemeList"
                  :class="{'solution-liBg':item.id == schemeId}"
                  :key="item.id"
                  @click.stop="ClickScheme(item)">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="solution-right">
            <!-- 方案介绍 -->
            <div class="solution-GodaddyDeluxe">
              <div class="GodaddyDeluxe-Text">
                <h2 class="GodaddyDeluxe-TextH2">方案介绍</h2>
                <span></span>
              </div>
              <div class="GodaddyDeluxe-center">
                <p class="GodaddyDeluxe-centerText">将考勤功能集成到手机等移动设备中，以较低的成本实现刷脸考勤，员工随时、随地打卡，无需排队等待使用活体检测功能，有效抵御照片、视频等作弊手段</p>
                <div class="GodaddyDeluxe-list">
                  <div class="GodaddyDeluxe-listDiv">
                    <div class="listDiv-pad">
                      <h4 class="listDiv-padH4">注册人脸库</h4>
                      <div class="listDiv-padDiv">
                        <div class="listDiv-padButton">
                          <p class="listDiv-padDiv_p">采集人脸图片创建待识别的人脸底库</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span class="el-icon-right"></span>
                  <div class="GodaddyDeluxe-listDiv">
                    <div class="listDiv-pad">
                      <h4 class="listDiv-padH4">刷脸考勤</h4>
                      <div class="listDiv-padDiv">
                        <div class="listDiv-padButton">
                          <h5 class="listDiv-padDiv_h5">获取人脸</h5>
                          <p class="listDiv-padDiv_p">现场获取用户人脸图片，进行人脸识别，判断考勤结果</p>
                        </div>
                        <div class="listDiv-padButton">
                          <h5 class="listDiv-padDiv_h5">活体检测</h5>
                          <p class="listDiv-padDiv_p">防止图片、视频、3D模具作弊，进行人脸识别，判断考勤结果</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span class="el-icon-right"></span>
                  <div class="GodaddyDeluxe-listDiv">
                    <div class="listDiv-pad">
                      <h4 class="listDiv-padH4">考勤记录</h4>
                      <div class="listDiv-padDiv">
                        <div class="listDiv-padButton">
                          <p class="listDiv-padDiv_p">基于人脸识别结果，进行考勤记录，并将数据输出到考勤系统中，进行下一步的业务处理</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 方案简介及产品构成 -->
            <div class="solution-productComposition">
              <div class="productComposition-Text">
                <h2 class="productComposition-TextH2">方案简介及产品构成</h2>
                <span></span>
              </div>
              <div class="productComposition-center">
                <p class="productComposition-centerText">将考勤功能集成到手机等移动设备中，以较低的成本实现刷脸考勤，员工随时、随地打卡，无需排队等待。使用活体检测功能，有效抵御照片、视频等作弊手段</p>
                <div class="productComposition-list">
                  <ul class="productComposition-listUl">
                    <li class="productComposition-listLi">
                      移动考勤
                      <span class="el-icon-caret-bottom gm-button"></span>
                    </li>
                    <li class="productComposition-listLi">摄像头无感知考勤</li>
                    <li class="productComposition-listLi">考勤一体机</li>
                  </ul>
                  <div class="productComposition-listBottom">
                    <div class="listBottom-div">
                      <div class="listBottom-divPad">
                        <h5 class="listBottom-H5">人脸采集SDK</h5>
                        <p class="listBottom-p">离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片</p>
                      </div>
                    </div>
                    <div class="listBottom-border"></div>
                    <div class="listBottom-div">
                      <div class="listBottom-divPad">
                        <h5 class="listBottom-H5">人脸采集SDK</h5>
                        <p class="listBottom-p">离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片</p>
                      </div>
                    </div>
                    <div class="listBottom-border"></div>
                    <div class="listBottom-div">
                      <div class="listBottom-divPad">
                        <h5 class="listBottom-H5">人脸采集SDK</h5>
                        <p class="listBottom-p">离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片</p>
                      </div>
                    </div>
                    <div class="listBottom-border"></div>
                    <div class="listBottom-div">
                      <div class="listBottom-divPad">
                        <h5 class="listBottom-H5">人脸采集SDK</h5>
                        <p class="listBottom-p">离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- footer底部导航组件 -->
      <Footer_Nav></Footer_Nav>
    </div>
</template>

<script>
    import Header_Nav from '@/views/CompanyHome/component/header/HeaderNav'
    import Footer_Nav from '@/views/CompanyHome/component/footer/FooterNav'
    import {getProductServiceShow} from "../../../HttpApi/product/solutionApi";
    export default {
      name: "solution",
      components:{Header_Nav,Footer_Nav},
      data(){
        return {
          schemeList:[
            {id:1,flag:false,name:'人脸考勤'},
            {id:2,flag:false,name:'刷脸门禁考勤'},
            {id:3,flag:false,name:'安防监控'},
            {id:4,flag:false,name:'人脸登陆'},
            {id:5,flag:false,name:'人脸支付'},
            {id:6,flag:false,name:'会员识别'},
          ],//数据展示
          schemeText:[],//右侧内容数据
          groupID:'',//登录人员身份
          schemeId:0,//标识ID
        }
      },
      methods:{
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
        //产品服务列表
        getProductServiceShow(){
          getProductServiceShow().then(response => {
            if(response.data.errorCode == 200){
              response.data.data.list.forEach((item) => {
                item.flag = false;
              });
              response.data.data.list[0].flag = true;
              this.schemeList = response.data.data.list;
            }else{
              this.$message.error(response.data.pagerManager);
            }
          })
        },
        //点击列表
        ClickScheme(item){
          for(let i =0; i < this.schemeList.length; i++){
            this.schemeList[i].flag = false;
          }
          this.schemeId = item.id;
        }
      },
      mounted(){
        let userInfo= this.Cookies.get('userInfo') || '';
        this.groupID = userInfo ? JSON.parse(userInfo).groupID : '';
        this.schemeId = this.$route.query.schemeId || 1;
      }
    }
</script>

<style scoped lang="scss">
.solution{
  width: 100%;
  .solution-content{
    width: 100%;
    margin-top: 0.8rem;
    .solution-header{
      padding-left: 1.5rem;
      padding-right: 2.34rem;
      height: 5rem;
      background:linear-gradient(225deg,rgba(1,109,229,1) 0%,rgba(13,27,56,1) 100%);
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
      .header-left{
        width: 7.6rem;
        .header-leftTitle{
          font-size: 0.68rem;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: 2px;
        }
        .header-leftText{
          font-size: 0.18rem;
          color: #ffffff;
          padding-top:0.22rem;
          padding-bottom: 0.5rem;
          font-weight: 400;
          line-height: 0.3rem;
        }
        .header-leftButton{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          padding-bottom: 0.38rem;
          button{
            padding: 0.12rem 0.5rem;
            border-radius: 0.29rem;
            color: #F20A59;
            font-size: 0.18rem;
            margin-right: 0.1rem;
          }
        }
        .header-leftItem{
          font-size: 0.18rem;
          color: #666666;
          font-weight: 400;
        }
      }
      .header-right{
        width: 4.57rem;
        height: 4.57rem;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .solution-center{
      padding-left: 0.91rem;
      padding-right: 2.13rem;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .solution-left{
        width: 2.54rem;
        padding-top: 0.36rem;
        .solution-ul{
          width: 100%;
          border: 1px solid #EEEEEE;
          li{
            width: 100%;
            height: 0.66rem;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            border-bottom: 1px solid #cccccc;
            cursor: pointer;
            span{
              color:#333333;
              font-size: 0.2rem;
              font-weight: 400;
              margin-left: 0.18rem;
            }
          }
          li:last-child{
            border: none;
          }
          li:hover{
            background: #036FE2;
            span{
              color: #ffffff;
            }
          }
          .solution-liBg{
            background: #036FE2;
            span{
              color: #ffffff;
            }
          }
        }
      }
      .solution-right{
        width: 70%;
        padding-top: 0.7rem;
        padding-bottom: 0.24rem;
        .solution-GodaddyDeluxe{
          width: 100%;
          .GodaddyDeluxe-Text{
            position: relative;
            .GodaddyDeluxe-TextH2{
              font-size: 0.48rem;
              color:#252525;
              font-weight: 600;
              text-align: center;
              letter-spacing: 2px;
            }
            span{
              width: 0.88rem;
              height: 0.04rem;
              border-radius:0.02rem;
              background: #036FE2;
              display: block;
              position: absolute;
              bottom: -0.2rem;
              left: 50%;
              -webkit-transform: translate(-50%);
              -ms-transform: translate(-50%);
              transform: translate(-50%);
            }
          }
          .GodaddyDeluxe-center{
            padding-top: 0.65rem;
            .GodaddyDeluxe-centerText{
              font-size: 0.18rem;
              color: #666666;
              line-height: 0.3rem;
              text-align: center;
            }
            .GodaddyDeluxe-list{
              width: 100%;
              margin-top: 0.4rem;
              display: flex;
              display: -webkit-flex;
              align-items: center;
              justify-content: space-between;
              .el-icon-right{
                font-size:0.28rem;
              }
              .GodaddyDeluxe-listDiv{
                width: 3.3rem;
                height: 3.22rem;
                border: 1px solid #979797;
                border-radius: 0.22rem;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                .listDiv-pad{
                  width: 2.5rem;
                  .listDiv-padH4{
                    font-size: 0.24rem;
                    color: #333333;
                    padding-top: 0.4rem;
                    padding-bottom: 0.2rem;
                    border-bottom: 1px solid #D8D8D8;
                  }
                  .listDiv-padDiv{
                    margin-top: 0.2rem;
                    .listDiv-padButton{
                      margin-bottom: 0.2rem;
                      .listDiv-padDiv_h5{
                        font-size:0.2rem;
                        font-weight: 400;
                        padding-bottom: 0.1rem;
                      }
                      .listDiv-padDiv_p{
                        font-size: 0.14rem;
                        color: #666666;
                        line-height: 0.23rem;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .solution-productComposition{
          width: 100%;
          margin-top: 0.9rem;
          .productComposition-Text{
            position: relative;
            .productComposition-TextH2{
              font-size: 0.48rem;
              color:#252525;
              font-weight: 600;
              text-align: center;
              letter-spacing: 2px;
            }
            span{
              width: 0.88rem;
              height: 0.04rem;
              border-radius:0.02rem;
              background: #036FE2;
              display: block;
              position: absolute;
              bottom: -0.2rem;
              left: 50%;
              -webkit-transform: translate(-50%);
              -ms-transform: translate(-50%);
              transform: translate(-50%);
            }
          }
          .productComposition-center{
            padding-top: 0.65rem;
            .productComposition-centerText{
              font-size: 0.18rem;
              color: #666666;
              line-height: 0.3rem;
              text-align: center;
            }
            .productComposition-list{
              width: 100%;
              margin-top: 0.1rem;
              .productComposition-listUl{
                width: 100%;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                justify-content: space-between;
                background: #FBFBFB;
                .productComposition-listLi{
                  width: 33.3333%;
                  line-height: 0.72rem;
                  font-size: 0.24rem;
                  font-weight: 600;
                  text-align: center;
                  position: relative;
                  cursor: pointer;
                  .el-icon-caret-bottom{
                    position: absolute;
                    left: 50%;
                    top:0.6rem;
                    -webkit-transform: translate(-50%);
                    -ms-transform: translate(-50%);
                    transform: translate(-50%);
                    color: #036FE2;
                    font-size: 0.28rem;
                  }
                }
                .productComposition-listLi:first-child{
                  background: #036FE2;
                  color: #ffffff;
                }
              }
              .productComposition-listBottom{
                width: 100%;
                background: #F4F8FA;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                justify-content: space-between;
                .listBottom-div{
                  width: 25%;
                  height: 2.23rem;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: center;
                  .listBottom-divPad{
                    width: 85%;
                    .listBottom-H5{
                      font-size: 0.22rem;
                      color: #333333;
                      text-align: center;
                      font-weight: 400;
                      padding-top: 0.44rem;
                    }
                    .listBottom-p{
                      font-size: 0.18rem;
                      color: #666666;
                      padding-top: 0.25rem;
                    }
                  }
                }
                .listBottom-border{
                  width: 0.01rem;
                  height: 1.41rem;
                  background:#D8D8D8;
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
