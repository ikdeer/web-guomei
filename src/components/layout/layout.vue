<template>
    <div class="sider">
      <ul class="sider-ul">
        <li v-for="(item,index) in dataIcon" :class="{'sider-li':$route.meta.code == item.code}" @click="clickRouter(item)">
          <img :src="$route.meta.code == item.code ? item.iconImgShow : item.iconImgHide">
           <span>{{item.iconText}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data(){
          return {
            dataIcon:[
              {
                iconText:'概览',
                iconImgShow:'/static/images/overview_selected_icon@2x.png',
                iconImgHide:'/static/images/overview_unselected_icon@2x.png',
                iconRouter:'/Index/overview',
                code:1,
              },
              {
                iconText:'用户管理',
                iconImgShow:'/static/images/Combined Shape@2x.png',
                iconImgHide:'/static/images/yonghuguanli_unselected_icon@2x.png',
                iconRouter:'/Index/userList',
                code:2,
              },
              {
                iconText:'用户列表',
                iconImgShow:'/static/images/list_selected_icon@2x.png',
                iconImgHide:'/static/images/list_unselected_icon@2x.png',
                iconRouter:'/Index/userInfo',
                code:3,
              },
              {
                iconText:'人脸分组管理',
                iconImgShow:'/static/images/management_selected_icon@2x.png',
                iconImgHide:'/static/images/management_unselected_icon@2x.png',
                iconRouter:'',
                code:4,
              },
              {
                iconText:'监控报表',
                iconImgShow:'/static/images/report_selected_icon@2x.png',
                iconImgHide:'/static/images/report_unselected_icon@2x.png',
                iconRouter:'',
                code:5,
              },
              {
                iconText:'操作日志',
                iconImgShow:'/static/images/operation_selected_icon@2x.png',
                iconImgHide:'/static/images/operation_unselected_icon@2x.png',
                iconRouter:'',
                code:6,
              },
              {
                iconText:'技术文档',
                iconImgShow:'/static/images/document_selected_icon@2x.png',
                iconImgHide:'/static/images/document_unselected_icon@2x.png',
                iconRouter:'',
                code:7,
              },
              {
                iconText:'SDK下载',
                iconImgShow:'/static/images/download_selected_icon@2x.png',
                iconImgHide:'/static/images/download_unselected_icon@2x.png',
                iconRouter:'',
                code:8,
              }
            ]
          }
        },
        methods:{
          //路径跳转
          clickRouter(item){
            this.$router.push({path:item.iconRouter});
          }
        },
        mounted(){

        }
    }
</script>

<style lang="scss">
.sider{
  width: 260px;
  height: calc(100% - 90px);
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
  z-index: 10;
  background: #fff;
  position: fixed;
  overflow-y: auto;
  .sider-ul{
    width: 100%;
    margin: 0;
    padding: 20px 0 0 0 ;
    li{
      height: 60px;
      list-style-type:none;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      img{
        width: 20px;
        height: 20px;
        display: block;
        margin-right: 20px;
      }
      span{
        width: 120px;
        font-size:20px;
        color:#666666;
        display: block;
        text-align: left;
      }
    }
    .sider-li{
      background:#F8F8F8;
      border-left: 4px solid #FE023F;
      span{
        color: #FE023F;
      }
    }
  }
}
</style>
