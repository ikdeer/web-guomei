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
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="action-right"
               v-for="(item,index) in SolutionText"
               v-if="item.ProductId == productId">
            <div class="action-introduce">
              <div class="introduce-Text">
                <h2 class="introduce-TextH2">{{item.FunctionTitle}}</h2>
                <span></span>
              </div>
              <div class="introduce-content">
                <p>{{item.FunctionText}}</p>
              </div>
            </div>
            <div class="action-demonstration">
              <div class="demonstration-Text">
                <h2 class="demonstration-TextH2">{{item.DomeTitle}}</h2>
                <span></span>
              </div>
              <div class="demonstration-content">
                <p>{{item.DomeText}}</p>
              </div>
            </div>
            <div class="action-scene">
              <div class="scene-Text">
                <h2 class="scene-TextH2">{{item.DomeModeTitle}}</h2>
                <span></span>
              </div>
              <div class="scene-content">
                <div class="scene-list" v-for="(itemS,indexS) in item.DomeModeTextList">
                  <div class="scene-listPad">
                    <h5>{{itemS.PrimaryTitle}}</h5>
                    <p>{{itemS.PrimaryText}}</p>
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
    import {getSolutionShow} from "../../../HttpApi/product/productApi";
    export default {
      name: "product",
      components:{Header_Nav,Footer_Nav},
      data(){
        return {
          //数据展示
          SolutionList:[
            {id:1,flag:false,name:'人脸检测与属性分析'},
            {id:2,flag:false,name:'人脸对比'},
            {id:3,flag:false,name:'人脸搜索'},
            {id:4,flag:false,name:'活体检测'},
            {id:5,flag:false,name:'视频流人脸采集'},
            {id:6,flag:false,name:'离线识别SDK'},
          ],
          //右侧内容数据
          SolutionText:[
            {
              ProductId:1,
              FunctionTitle:'功能介绍',
              FunctionText:'检测图中的人脸，并为人脸标记出边框。检测出人脸后，可对人脸进行分析，获得眼、口、鼻轮廓等150个关键点定位，准确识别多种人脸属性，如性别，年龄，表情等信息。该技术可适应大角度侧脸，遮挡，模糊，表情变化等各种实际环境。',
              DomeTitle:'功能演示',
              DomeText:'检测图中的人脸，并为人脸标记出边框。检测出人脸后，可对人脸进行分析，获得眼、口、鼻轮廓等150个关键点定位，准确识别多种人脸属性，如性别，年龄，表情等信息。该技术可适应大角度侧脸，遮挡，模糊，表情变化等各种实际环境。',
              DomeModeTitle:'功能演示',
              DomeModeTextList:[
                {PrimaryTitle:'人脸检测与属性分析',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸检测与属性分析',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸检测与属性分析',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸检测与属性分析',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'}
              ]
            },
            {
              ProductId:2,
              FunctionTitle:'功能介绍',
              FunctionText:'午夜街头不管怎么喧闹与繁荣，终将在星辰倦月之中慢慢安静，空气有着这个城市独有的气息，还有春天飞扬的柳絮，不远处飘过来的烧烤摊独有的味道，那是不愿意睡去的调味剂，那些竭斯底里的折腾的灵魂依旧在酒精里精彩，从白天一直到晨曦拂晓。',
              DomeTitle:'功能演示',
              DomeText:'我与战友从酒吧里出来，坐着车子回到酒店门口，看着还有余温的城市居然一时也不肯上去，虽然已经很疲惫，也带着酒精微醺的微醉。天空有一轮明月，皎洁得就如一个特大号的路灯，在月光与灯光里依稀看见散落在天空的星星，偶然有闪烁的亮点移动，那也不过是来去在空中的旅人。',
              DomeModeTitle:'功能演示',
              DomeModeTextList:[
                {PrimaryTitle:'人脸对比',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸对比',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸对比',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸对比',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'}
              ]
            },
            {
              ProductId:3,
              FunctionTitle:'功能介绍',
              FunctionText:'你感叹这说，时间真快，在部队那会都是一块鲜嫩爽口的鲜肉，而今却腊味十足。我鄙视的看着他二十几年未曾变过的身材与依旧帅气的脸，我慢慢的说，何必攻击我呢。他看了我一眼哈哈大笑了起来，声音在午夜里传不了多远，就在不远处给那个烧烤摊独有的热闹轰散了，',
              DomeTitle:'功能演示',
              DomeText:'我们说着在部队里琐琐碎碎的事，每次训练如何偷懒，说着谁谁一些糗事，然后又炫耀着各自用汗水与坚强换回来的荣耀，也许这些在现实中不值一提，也真的不能和任何经济挂钩事物比较，但却没有任何一样的物质能够那样的真挚与深刻。',
              DomeModeTitle:'功能演示',
              DomeModeTextList:[
                {PrimaryTitle:'人脸搜索',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸搜索',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸搜索',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'人脸搜索',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'}
              ]
            },
            {
              ProductId:4,
              FunctionTitle:'功能介绍',
              FunctionText:'偶然会说说彼此成就，但不是炫耀，更多的只是平淡的诉说，心里真的希望彼此过的越来越好，也会说说一些烦恼一些不如意，也不是慰求怜悯，仅仅是一种信赖的倾诉。“与子同袍”虽然没有上过战场，但只要穿过那身军装的，都知道在短短几十年里那是最信赖的后背。',
              DomeTitle:'功能演示',
              DomeText:'更细腻的情感不是因为细腻的人生，而是在豪情壮志，在奋勇搏击的路上，那离别后的思念。不管有没有战火硝烟，与子同衣就是代表着无私的信任与坦然。脱下军装走进社会，当经历这各种繁华，在每个酒醉后，在每个疲惫不堪躯体躺在床上时候，那段简单却激情的岁月，那一张张熟悉却遥远的脸孔慢慢浮现，梦里那一声声奋力的吼叫，醒来也就没有懦弱退缩的理由。',
              DomeModeTitle:'功能演示',
              DomeModeTextList:[
                {PrimaryTitle:'活体检测',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'活体检测',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'活体检测',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'活体检测',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'}
              ]
            },
            {
              ProductId:5,
              FunctionTitle:'功能介绍',
              FunctionText:'你问我过的如何，我也只是说凑合着，也努力着。我问你如何，你说也在努力着。但彼此说的最多的却是，注意身体，然后说着那么些年走过来的点点滴滴。没有保留也无需保留，就像那杯酒，举起来也就干了，各自奉承着各自的酒量，却没发现眼前人影开始摇晃。',
              DomeTitle:'功能演示',
              DomeText:'每个人都会有很好的朋友，还有很好的兄弟姐妹，但是我们却会比别人多一样，战友。',
              DomeModeTitle:'功能演示',
              DomeModeTextList:[
                {PrimaryTitle:'视频流人脸采集',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'视频流人脸采集',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'视频流人脸采集',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'视频流人脸采集',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'}
              ]
            },
            {
              ProductId:6,
              FunctionTitle:'功能介绍',
              FunctionText:'岂曰无衣?与子同袍。王于兴师，修我戈矛。与子同仇。',
              DomeTitle:'功能演示',
              DomeText:'岂曰无衣?与子同泽。王于兴师，修我矛戟。与子偕作。岂曰无衣?与子同裳。王于兴师，修我甲兵。与子偕行。',
              DomeModeTitle:'功能演示',
              DomeModeTextList:[
                {PrimaryTitle:'离线识别SDK',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'离线识别SDK',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'离线识别SDK',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'},
                {PrimaryTitle:'离线识别SDK',PrimaryText:'离线调用人脸检测、人脸追踪、人脸采集等能力，快速获取人脸图片'}
              ]
            }
          ],
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
        getSolutionShow(){
          getSolutionShow().then(response => {
            if(response.data.errorCode == 200){
              if(response.data.data.list && response.data.data.list.length != 0){
                response.data.data.list.forEach((item,index) => {
                  item.flag = false;
                });
                response.data.data.list[0].flag = true;
                this.SolutionList = response.data.data.list;
              }else{
                this.SolutionList = [];
              }
            }else{
              this.$message.error(response.data.pagerManager);
            }
          })
        },
        //点击列表
        ClickSolution(item){
          for(let i =0; i < this.SolutionList.length; i++){
            this.SolutionList[i].flag = false;
          }
          this.productId = item.id;
        }
      },
      mounted(){
        let userInfo= this.Cookies.get('userInfo') || '';
        this.groupID = userInfo ? JSON.parse(userInfo).groupID : '';
        this.productId = this.$route.query.productId || 1;
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
    .product-action{
      padding-left: 0.91rem;
      padding-right: 2.13rem;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .action-left{
        width: 2.54rem;
        padding-top: 0.36rem;
        .action-ul{
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
        .action-introduce{
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
        }
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
