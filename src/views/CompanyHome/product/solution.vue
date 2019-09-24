<template>
    <div class="solution">
      <!-- header导航组件 -->
      <Header_Nav></Header_Nav>
      <div class="solution-content">
        <header class="solution-header">
          <img :src="bannerImg" class="solution-ImgBg" alt="">
          <div class="header-leftButton">
            <el-button @click.stop="ClickApply">立即申请</el-button>
            <el-button @click.stop="ClickApi">技术文档</el-button>
          </div>
        </header>
        <div class="solution-center">
          <div class="solution-left">
            <ul class="solution-ul">
              <li v-for="(item,index) in schemeList"
                  :class="{'solution-liBg':item.id == schemeId}"
                  :key="item.id"
                  @click.stop="ClickScheme(item)">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </div>
          <div class="solution-right">
            <div v-html="schemeText"></div>
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
    import {getSolutionShow,getSolutionDetail,getBannerShow} from "../../../HttpApi/solution/solutionApi";
    export default {
      name: "solution",
      components:{Header_Nav,Footer_Nav},
      data(){
        return {
          schemeList:[],//数据展示
          schemeText:'',//右侧内容数据
          bannerURL:'',//bannerURL
          bannerImg:'',//banner图片
          groupID:'',//登录人员身份
          schemeId:0,//标识ID
        }
      },
      methods:{
        //banner图片
        getBannerShow(){
          getBannerShow().then(response => {
            if(response.data.errorCode == 200){
              let bannerList = response.data.data ? response.data.data.list : [];
              for(let i =0; i < bannerList.length; i++){
                if(bannerList[i].differentiate == 3){
                  this.bannerImg = bannerList[i].imgUrl;
                  this.bannerURL = bannerList[i].url2;
                  break;
                }
              }
            }else{
              this.$message.error(response.data.pagerManager);
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
              this.$message({message: '亲！你暂时没有权限哦', type: 'warning'});
            }
          }else{
            _this.$message.error('此功能需要登录过后才能查看');
            setTimeout(()=>{
              _this.$router.push({path:'/Company/login'});
            },300)
          }
        },
        //跳转解决方案或者其他页面
        ClickApi(){
          if(this.bannerURL == '/Company/APITCF'){
            this.$router.push({path:this.bannerURL});
          }else{
            window.open(this.bannerURL);
          }
        },
        //解决方案列表
        getSolutionShow(){
          getSolutionShow().then(response => {
            if(response.data.errorCode == 200){
              this.schemeList = response.data.data.list;
              this.schemeId = this.$route.query.schemeId || this.schemeList[0].id;
              this.getSolutionDetail(this.schemeId);
            }else{
              this.$message.error(response.data.pagerManager);
            }
          })
        },
        //解决方案详情
        getSolutionDetail(id){
          getSolutionDetail({id:id}).then(response => {
            if(response.data.errorCode == 200){
                this.schemeText = response.data.data.txt;
            }else{
              this.$message.error(response.data.pagerManager);
            }
          })
        },
        //点击列表
        ClickScheme(item){
          this.schemeId = item.id;
          this.getSolutionDetail(this.schemeId);
        }
      },
      mounted(){
        let userInfo= this.Cookies.get('userInfo') || '';
        this.groupID = userInfo ? JSON.parse(userInfo).groupID : '';
        this.getBannerShow();
        this.getSolutionShow();
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
      width: 100%;
      height: 5rem;
      position: relative;
      .solution-ImgBg{
        width: 100%;
        height: 5rem;
        display: block;
        overflow: hidden;
      }
      .header-leftButton{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        position: absolute;
        top: 2.82rem;
        left: 1.5rem;
        button{
          background: #ffffff;
          color: #F20A59;
          font-size: 0.2rem;
          border-radius: 0.29rem;
          padding: 0.2rem 0.6rem;
          border: none;
          display: block;
          margin-right: 0.1rem;
          opacity: 0;
        }
      }
    }
    .solution-center{
      padding-left: 0.9rem;
      padding-right: 0.9rem;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding-bottom: 0.8rem;
      .solution-left{
        padding-top: 0.36rem;
        .solution-ul{
          width: 2.54rem;
          border: 1px solid #EEEEEE;
          li{
            width:100%;
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
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
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
        width: 75%;
        padding-top: 0.7rem;
        padding-bottom: 0.24rem;
        word-wrap: break-word;
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
              line-height: 0.35rem;
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
              line-height: 0.35rem;
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
                      line-height: 0.3rem;
                    }
                  }
                }
                .listBottom-border{
                  width: 1px;
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
