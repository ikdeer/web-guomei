<template>
    <div class="product-content">
      <!-- header导航组件 -->
      <Header_Nav></Header_Nav>
      <div class="product-center">
        <header class="product-header">
          <div class="header-left">
            <h4 class="header-leftTitle">人脸识别</h4>
            <p class="header-leftText">基于深度学习的人脸识别方案，准确识别图片中的人脸信息，提供人脸属性识别、关键点定位、人脸1：1比对、人脸1：N识别、活体检测等能力</p>
            <div class="header-leftButton">
              <el-button @click.stop="ClickApply">立即申请</el-button>
              <router-link tag="button" class="el-button el-button--default el-button--small" :to="{path:'/Company/APITCF'}">技术文档</router-link>
            </div>
            <p class="header-leftItem">国美家服务信息技术中心&nbsp;&nbsp;&nbsp;提供技术支持</p>
          </div>
          <div class="header-right">
            <img src="/static/images/product_banner_bg@2x.png" alt="">
          </div>
        </header>
        <div class="product-action">
          <div class="action-left">
            <ul class="action-ul">
              <li v-for="(item,index) in SolutionList"
                  :key="item.id"
                  :class="{'action-liBg':item.id  == productId}"
                  @click.stop="ClickSolution(item)">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </div>
          <div class="action-right" v-html="SolutionText"></div>
        </div>
      </div>
      <!-- footer底部导航组件 -->
      <Footer_Nav></Footer_Nav>
    </div>
</template>

<script>
    import Header_Nav from '@/views/CompanyHome/component/header/HeaderNav'
    import Footer_Nav from '@/views/CompanyHome/component/footer/FooterNav'
    import {getProductServiceShow,getDetail} from "../../../HttpApi/product/productApi";
    export default {
      name: "product",
      components:{Header_Nav,Footer_Nav},
      data(){
        return {
          //数据展示
          SolutionList:[],
          //右侧内容数据
          SolutionText:'',
          productId:0,
          groupID:'',//登录人员身份
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
              this.$message({message: '亲！你暂时没有权限哦', type: 'warning'});
            }
          }else{
            _this.$message.error('此功能需要登录过后才能查看');
            setTimeout(()=>{
              _this.$router.push({path:'/Company/login'});
            },300)
          }
        },
        //解决方案列表
        getProductServiceShow(){
          getProductServiceShow().then(response => {
            if(response.data.errorCode == 200){
              this.SolutionList = response.data.data ? response.data.data.list : [];
              this.productId = this.$route.query.productId || this.SolutionList[0].id;
              this.getDetail(this.productId);
            }else{
              this.$message.error(response.data.pagerManager);
            }
          })
        },
        //商品详情
        getDetail(id){
          getDetail({id:id}).then(response => {
            if(response.data.errorCode == 200){
              this.SolutionText = response.data.data ? response.data.data.txt : '';
            }else{
              this.$message.error(response.data.pagerManager);
            }
          })
        },
        //点击列表
        ClickSolution(item){
          this.productId = item.id;
          this.getDetail(this.productId);
        }
      },
      mounted(){
        let userInfo= this.Cookies.get('userInfo') || '';
        this.groupID = userInfo ? JSON.parse(userInfo).groupID : '';
        this.getProductServiceShow();
      }
    }
</script>

<style scoped lang="scss">
.product-content{
  width: 100%;
  .product-center{
    width: 100%;
    margin-top: 0.8rem;
    .product-header{
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
          color: #ffffff;
          padding-top:0.3rem;
          padding-bottom: 0.5rem;
          font-size: 0.22rem;
          line-height: 0.37rem;
        }
        .header-leftButton{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          padding-bottom: 0.38rem;
          button{
            background: #ffffff;
            color: #F20A59;
            font-size: 0.2rem;
            border-radius: 0.29rem;
            padding: 0.16rem 0.5rem;
            border: none;
            display: block;
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
    .product-action{
      padding-left: 0.91rem;
      padding-right: 2.13rem;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding-bottom: 0.8rem;
      .action-left{
        padding-top: 0.36rem;
        .action-ul{
          width: 100%;
          border: 1px solid #EEEEEE;
          li{
            padding-right:0.2rem;
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
            background:#036FE2;
            span{
              color: #ffffff;
            }
          }
          .action-liBg{
            background:#036FE2;
            span{
              color: #ffffff;
            }
          }
        }
      }
      .action-right{
        width: 70%;
        padding-top: 0.7rem;
        padding-bottom: 0.48rem;
        overflow: hidden;
        /*.action-introduce{
          .introduce-Text{
            position: relative;
            .introduce-TextH2{
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
          .introduce-content{
            padding-top: 0.65rem;
            p{
              font-size: 0.18rem;
              color: #666666;
              line-height: 0.3rem;
            }
          }
        }*/
        .action-demonstration{
          padding-top: 0.9rem;
          .demonstration-Text{
            position: relative;
            .demonstration-TextH2{
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
          .demonstration-content{
            padding-top: 0.65rem;
            p{
              font-size: 0.18rem;
              color: #666666;
              line-height: 0.3rem;
            }
          }
        }
        .action-scene{
          padding-top: 0.9rem;
          .scene-Text{
            position: relative;
            .scene-TextH2{
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
          .scene-content{
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 0.65rem;
            .scene-list{
              width: 25%;
              display: flex;
              display: -webkit-flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              border-right: 1px solid #D8D8D8;
              .scene-listPad{
                width: 80%;
                h5{
                  font-size: 0.24rem;
                  color: #333333;
                  text-align: center;
                  padding-bottom: 0.12rem;
                }
                p{
                  font-size: 0.18rem;
                  color: #666666;
                  padding-top: 0.12rem;
                  line-height: 0.3rem;
                }
              }
            }
            .scene-list:last-child{
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
