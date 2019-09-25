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
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu :index="child.id" v-for="(child,index) in dataList" :key="child.id">
            <!-- 判断二级是否有数据 （没有数据）-->
            <el-menu-item :index="child1.id" v-for="(child1,index1) in child.DataText" :key="child1.id" v-if="!child1.isDataText">{{child1.text}}</el-menu-item>
            <!-- 一级数据展示-->
            <template slot="title">
              <span>{{child.text}}</span>
            </template>
            <!-- 判断二级是否有数据 （有数据）-->
            <el-submenu :index="child1.id" v-for="(child1,index1) in child.DataText" :key="child1.id" v-if="child1.isDataText">
              <template slot="title">{{child1.text}}</template>
              <el-menu-item-group v-for="(child2,index2) in child1.DataText">
                <el-menu-item :index="child2.id">{{child2.text}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-submenu>
        </el-menu>
        <!--<div class="menu-list" v-for="(item,index) in dataList">
          &lt;!&ndash; 一级目录 &ndash;&gt;
          <div class="menu-gm" @click.stop="ClickMenu(item,index)">
            <span class="menu-text">{{item.text}}</span>
            <i class="el-icon-arrow-down gm-sbc"></i>
          </div>
          <div :class="item.isText ? 'menu-levelShow menu-level' : 'menu-level'"
               v-for="(itemS,indexS) in item.DataText">
            &lt;!&ndash; 二级目录 &ndash;&gt;
            <div class="level-gm" @click.stop="ClickLevel(itemS)">
              <span :class="itemS.isText && !itemS.isDataText ? 'menu-textColor' : 'menu-text'">{{itemS.text}}</span>
              <i v-if="itemS.isDataText" class="el-icon-arrow-down gm-sbc"></i>
            </div>
            &lt;!&ndash; 三级目录 &ndash;&gt;
            <div :class="itemS.isText ? 'menu-itm menu-itmShow' : 'menu-itm'"
                 @click.stop="ClickThreeLevel(itemSS)"
                 v-for="(itemSS,indexSS) in itemS.DataText">
              <span :class="itemSS.isText ? 'menu-textBgColor' : 'menu-text'">{{itemSS.text}}</span>
            </div>
          </div>
        </div>-->
      </div>
      <div class="gm-content">
        <nav class="gm-nav">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item>技术文档</el-breadcrumb-item>
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
    import {getTechDocConTentShow,getTechDocDetails} from "../../../HttpApi/TCFApi/TCFApi"
    export default {
      name: "APITCF",
      components:{Header_Nav},
      data(){
        return {
          dataList:[],
          bbsContent:'',//文本内容
          bbsTopTitle:'',//标题
          breadcrumb:[],
          catalogList:[],
        }
      },
      created(){
        this.getTechDocConTentShow();
      },
      methods:{
        //技术文档列表
        getTechDocConTentShow(){
          getTechDocConTentShow().then(response => {
            if(response.data.errorCode == 200){
              //数据拼接
              let arrData = [{text:'技术文档',isText:true,DataText:[]}];
              for(let i = 0; i < response.data.data.list.length; i++){
                arrData[0].DataText.push({
                  id:response.data.data.list[i].id,
                  text:response.data.data.list[i].title1,
                  isText:i == 0 ? true : false,
                  isDataText:response.data.data.list[i].title2 ? true : false, //判断二级目录是否有数据
                  DataText:[],
                });
                if(response.data.data.list[i].title2){
                 arrData[0].DataText[i].DataText.push({
                    id:response.data.data.list[i].id,
                    text:response.data.data.list[i].title2,
                    isText:false,
                  })
                }
              }
              if(!arrData[0].DataText[0].DataText.length){
                arrData[0].DataText[0].isText = true;
                this.getTechDocDetails(arrData[0].DataText[0].id);
              }else{
                arrData[0].DataText[0].isText = true;
                arrData[0].DataText[0].DataText[0].isText = true;
                this.getTechDocDetails(arrData[0].DataText[0].DataText[0].id);
              }
              this.dataList = arrData;
              console.log(this.dataList);
            }else{
              this.$message.error(response.data.errorInfo);
            }
          });
        },
        //技术文档详情
        getTechDocDetails(id){
          getTechDocDetails({id:id}).then(response => {
            if(response.data.errorCode == 200){
              this.bbsContent = response.data.data.techDoc.txt;
              this.bbsTopTitle = response.data.data.techDoc.name;
            }else{
              this.$message.error(response.data.errorInfo);
            }
          })
        },
        //一级目录
        ClickMenu(item,index){
          if(item.isText){
            for(let i =0; i < this.dataList[index].DataText.length; i++){
              this.dataList[index].DataText[i].isText = false;
            }
            item.isText = false;
          }else{
            for(let i =0; i < this.dataList.length; i++){
              this.dataList[i].isText = false;
            }
            item.isText = true;
          }
        },
        //二级目录
        ClickLevel(items){
          if(items.isText){
            for(let i =0; i < this.dataList.length; i++){
              for(let j =0; j < this.dataList[i].DataText.length; j++){
                this.dataList[i].DataText[j].isText = false;
              }
            }
            items.isText = false;
          }else{
            for(let i =0; i < this.dataList.length; i++){
              for(let j =0; j < this.dataList[i].DataText.length; j++){
                this.dataList[i].DataText[j].isText = false;
              }
            }
            items.isText = true;
          }
          if(!items.DataText.length){
            this.getTechDocDetails(items.id);
          }
        },
        //三级目录
        ClickThreeLevel(itemSS){
          for(let i =0; i < this.dataList.length; i++){
            for(let j =0; j < this.dataList[i].DataText.length; j++){
              for(let k = 0; k < this.dataList[i].DataText[j].DataText.length; k++){
                this.dataList[i].DataText[j].DataText[k].isText = false;
              }
            }
          }
          itemSS.isText = true;
          this.getTechDocDetails(itemSS.id);
        },
      }
    }
</script>

<style  lang="scss">
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
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
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
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
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
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
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
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .menu-textBgColor{
              font-size: 0.16rem;
              color:#036FE2;
              font-weight: 500;
              margin-left: 1.06rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
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
