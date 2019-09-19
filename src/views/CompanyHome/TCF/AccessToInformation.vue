<template>
  <div class="gm-api">
    <!-- header导航组件 -->
    <Header_Nav></Header_Nav>
    <div class="gm-apiContent">
      <div class="gm-menu">
        <div class="menu-introduction">
          <span class="menu-text">文档目录</span>
          <i class="el-icon-s-fold"></i>
        </div>
        <div class="menu-list">
          <!-- 一级目录 -->
          <div class="menu-gm" @click.stop="ClickMenu">
            <span class="menu-text">接入须知</span>
            <i class="el-icon-arrow-down gm-sbc"></i>
          </div>
          <div :class="isLevelShow ? 'menu-level menu-levelShow' : 'menu-level'">
            <!-- 二级目录 -->
            <div class="level-gm" v-for="(item,index) in dataList" @click.stop="ClickLevel(item)">
              <span :class="item.isText ? 'menu-textColor' : 'menu-text'">{{item.Title}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="gm-content">
        <nav class="gm-nav">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item>技术文档</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
        <div class="gm-contentPad">
          <h4 class="gm-contentPadText">{{bbsTopTitle}}</h4>
          <div class="gm-contentArea">
            <div class="ql-editor contentArea-left" v-html="bbsContent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header_Nav from '@/views/CompanyHome/component/header/HeaderNav'
  import {getAccessNoteContentShow,getAccessNoteDetails} from "../../../HttpApi/instructions/instructionsListAPi";

  export default {
    name: "AccessToInformation",
    components:{Header_Nav},
    data(){
      return {
        dataList:[],
        bbsContent:'',//文本内容
        bbsTopTitle:'',//标题
        breadcrumb:[],
        isLevelShow:false,//二级目录显示
      }
    },
    created(){
      this.getAccessNoteContentShow();
    },
    methods:{
      //技术文档列表
      getAccessNoteContentShow(){
        getAccessNoteContentShow().then(response => {
          if(response.data.errorCode == 200){
            //数据拼接
            let List = response.data.data.list || [];
            let arrData = [];
            for(let i = 0; i < List.length; i++){
              arrData.push({isText:false,Title:List[i].title1,id:List[i].id});
            }
            arrData[0].isText = true;
            this.isLevelShow = true;
            this.getAccessNoteDetails(arrData[0].id);
            this.dataList = arrData;
          }else{
            this.$message.error(response.data.errorInfo);
          }
        });
      },
      //技术文档详情
      getAccessNoteDetails(id){
        getAccessNoteDetails({id:id}).then(response => {
          if(response.data.errorCode == 200){
            this.bbsTopTitle = response.data.data.accessNote.name;
            this.bbsContent = response.data.data.accessNote.txt;
          }else{
            this.$message.error(response.data.errorInfo);
          }
        })
      },
      //一级目录
      ClickMenu(){
        this.isLevelShow =! this.isLevelShow;
        if(!this.isLevelShow){
          for(let i =0; i < this.dataList.length; i++){
            this.dataList[i].isText = false;
          }
        }else{
          this.dataList[0].isText = true;
          this.getAccessNoteDetails(this.dataList[0].id);
        }
      },
      //二级目录
      ClickLevel(item){
        for(let i =0; i < this.dataList.length; i++){
          this.dataList[i].isText = false;
        }
        item.isText = true;
        this.getAccessNoteDetails(item.id);
      },
    }
  }
</script>

<style scoped lang="scss">
  .gm-api{
    width: 100%;
    .header-nav{
      position:static;
      cursor: pointer;
    }
    .gm-apiContent{
      width: 100%;
      background:#F8F8F8;
      .gm-menu{
        width: 2.6rem;
        height: 100%;
        background: #ffffff;
        position: absolute;
        left: 0;
       /* box-shadow:0 0.02rem 0.04rem 0 rgba(0,0,0,0.1);*/
        z-index: 100;
        cursor: pointer;
        .menu-introduction{
          padding-left: 0.4rem;
          padding-right: 0.3rem;
          min-height: 0.6rem;
          line-height: 0.6rem;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          .menu-text{
            font-size: 0.16rem;
            color: #666666;
          }
          .el-icon-s-fold{
            font-size: 0.2rem;
            color: #666666;
          }
        }
        .menu-list{
          width: 100%;
          cursor: pointer;
          .menu-gm{
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 0.4rem;
            padding-right: 0.3rem;
            min-height: 0.6rem;
            line-height: 0.6rem;
            .menu-text{
              font-size: 0.16rem;
              color: #333333;
              font-weight: 600;
            }
            .gm-sbc{
              font-size: 0.2rem;
              color: #dddddd;
            }
          }
          .menu-levelShow{
            display: block !important;
            -webkit-animation: slide-down .5s linear;
            transition: max-height .3s linear;
            transform-origin: 50% 0;
          }
          @-webkit-keyframes slide-down{
            from {transform: scale(1,0);}
            to{transform: scale(1,1);}
          }
          .menu-level{
            width: 100%;
            display: none;
            .level-gm{
              display: flex;
              display: -webkit-flex;
              align-items: center;
              justify-content: space-between;
              padding-left: 0.73rem;
              padding-right: 0.3rem;
              min-height: 0.6rem;
              line-height: 0.6rem;
              .menu-text{
                font-size: 0.16rem;
                color: #666666;
                font-weight: 500;
              }
              .menu-textColor{
                font-size: 0.16rem;
                font-weight: 500;
                color:#036FE2;
              }
              .gm-sbc{
                font-size: 0.2rem;
                color: #dddddd;
              }
            }
            .menu-itmShow{
              -webkit-animation: slide-down .5s ease-in;
              transition: max-height .3s ease-in;
              transform-origin: 50% 0;
              display: block !important;
            }
            @-webkit-keyframes slide-down{
              0%{transform: scale(1,0);}
              25%{transform: scale(1,1.2);}
              50%{transform: scale(1,0.85);}
              75%{transform: scale(1,1.05);}
              100%{transform: scale(1,1);}
            }
            .menu-itm{
              width: 100%;
              display: none;
              min-height: 0.6rem;
              line-height: 0.6rem;
              background: #F8F8F8;
              .menu-text{
                font-size: 0.16rem;
                color: #666666;
                font-weight: 500;
                margin-left: 1.06rem;
              }
              .menu-textBgColor{
                font-size: 0.16rem;
                color:#036FE2;
                font-weight: 500;
                margin-left: 1.06rem;
              }
            }
          }
        }
      }
      .gm-content{
        width: 86%;
        position: absolute;
        right: 0;
        left: 2.6rem;
        background: #F8F8F8;
        padding-bottom: 0.3rem;
        .gm-nav{
          width: auto;
          height: 0.56rem;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          border-bottom: 1px dashed #979797;
          margin-left: 0.32rem;
          .el-breadcrumb{
            font-size:0.16rem;
            color:#999999;
          }
        }
        .gm-contentPad{
          width: auto;
          margin-left:0.32rem;
          .gm-contentPadText{
            width: 100%;
            line-height:0.6rem;
            font-size: 0.18rem;
            color:#333333;
          }
          .gm-contentArea{
            width: 100%;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            .contentArea-left{
              width: 100%;
              background: #ffffff;
              box-shadow:0 0.02rem 0.04rem 0.01rem rgba(0,0,0,0.1);
              border-radius:0.1rem;
              overflow-x: hidden;
              padding: 0.5rem 0.3rem;
            }
            .contentArea-right{
              width: 15%;
              display: flex;
              display: -webkit-flex;
              justify-content: center;
              cursor: pointer;
              .contentArea-catalogue{
                width: 80%;
                .catalogue-h4{
                  font-size:0.18rem;
                  color: #333333;
                }
                .catalogue-p{
                  font-size:0.16rem;
                  color: #333333;
                  padding: 0.2rem 0;
                }
                .catalogue-list{
                  span{
                    display: block;
                    font-size:0.14rem;
                    color: #333333;
                    margin-bottom: 0.1rem;
                    text-indent:0.1rem;
                  }
                  span:first-child{
                    color:#036FE2;
                    border-left: 0.02rem solid #036FE2;
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
