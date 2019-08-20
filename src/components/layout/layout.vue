<template>
    <div class="sider">
      <ul class="sider-ul">
        <li>
          <img src="/static/images/overview_selected_icon@2x.png" alt="">
           <span>概览</span>
        </li>
        <li>
          <img src="/static/images/yonghuguanli_unselected_icon@2x.png" alt="">
          <span>用户管理</span>
        </li>
        <li>
          <img src="/static/images/list_unselected_icon@2x.png" alt="">
          <span>用户列表</span>
        </li>
        <li>
          <img src="/static/images/management_unselected_icon@2x.png" alt="">
          <span>人脸分组管理</span>
        </li>
        <li>
          <img src="/static/images/report_unselected_icon@2x.png" alt="">
          <span>监控报表</span>
        </li>
        <li>
          <img src="/static/images/operation_unselected_icon@2x.png" alt="">
          <span>操作日志</span>
        </li>
        <li>
          <img src="/static/images/document_unselected_icon@2x.png" alt="">
          <span>技术文档</span>
        </li>
        <li>
          <img src="/static/images/download_unselected_icon@2x.png" alt="">
          <span>SDK下载</span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data(){
          return {

          }
        }
    }
</script>

<style lang="scss">
.sider{
  width: 14%;
  height: 100%;
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
  z-index: 1;
  .sider-ul{
    width: 100%;
    margin: 0;
    padding: 20px 0 0 0 ;
    li:first-child{
      background:#F8F8F8;
      border-left: 4px solid #FE023F;
      span{
        color: #FE023F;
      }
    }
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
  }
}
</style>
