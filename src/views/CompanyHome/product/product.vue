<template>
    <div class="product-content">
      <!-- header导航组件 -->
      <Header_Nav></Header_Nav>
      <div class="product-center">
        <header class="product-header">
          <img :src="bannerImg" class="product-ImgBg" alt="">
          <div class="header-leftButton">
            <el-button @click.stop="ClickApply">立即申请</el-button>
            <el-button @click.stop="ClickApi">技术文档</el-button>
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
    import {getProductServiceShow,getDetail,getBannerShow} from "../../../HttpApi/product/productApi";
    export default {
      name: "product",
      components:{Header_Nav,Footer_Nav},
      data(){
        return {
          bannerURL1:'',//banner1跳转地址
          bannerURL2:'',//banner2跳转地址
          bannerImg:'',//图片
          //数据展示
          SolutionList:[],
          //右侧内容数据
          SolutionText:'',
          productId:0,
          groupID:'',//登录人员身份
        }
      },
      methods:{
        //banner图片
        getBannerShow(){
          getBannerShow({page:1,pageSize:100}).then(response => {
            if(response.data.errorCode == 200){
              let bannerList = response.data.data ? response.data.data.list : [];
              for(let i =0; i < bannerList.length; i++){
                if(bannerList[i].differentiate == 2){
                  this.bannerImg = bannerList[i].imgUrl;
                  this.bannerURL1 = bannerList[i].url1;
                  this.bannerURL2 = bannerList[i].url2;
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
          if(this.bannerURL1 == '/Index/addApplication'){
            if(this.Cookies.get('token')){
              if(this.groupID == '20'){
                _this.$router.push({path:this.bannerURL1,query:{type:'add'}});
              }else{
                this.$message({message: '亲！你暂时没有权限哦~~~~', type: 'warning'});
              }
            }else{
              _this.$message.error('此功能需要登录过后才能查看');
              setTimeout(()=>{
                _this.$router.push({path:'/Company/login'});
              },300)
            }
          }else{
            window.open(handleBrowsingItemLink(this.bannerURL1),'_blank');
          }
        },
        //跳转技术文档
        ClickApi(){
          if(this.bannerURL2 == '/Company/APITCF'){
            this.$router.push({path:this.bannerURL2});
          }else{
            window.open(handleBrowsingItemLink(this.bannerURL2),'_blank');
          }
        },
        //解决方案列表
        getProductServiceShow(){
          getProductServiceShow({page:1,pageSize:100}).then(response => {
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
        this.getBannerShow();
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
      width: 100%;
      height: 5rem;
      position: relative;
      .product-ImgBg{
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
        top: 3rem;
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
    .product-action{
      padding-left: 0.9rem;
      padding-right: 0.9rem;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding-bottom: 0.8rem;
      .action-left{
        padding-top: 0.36rem;
        .action-ul{
          width: 2.54rem;
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
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
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
        width: 75%;
        padding-top: 0.7rem;
        padding-bottom: 0.48rem;
        word-wrap: break-word;
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
