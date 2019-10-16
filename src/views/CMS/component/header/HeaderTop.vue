<template>
    <div class="header">
        <div class="header-left">
          <div @click.stop="ClickURL">
            <img src="/static/images/logo_image@2x.png" alt="">
          </div>
          <span></span>
          <p>人脸认证开放平台</p>
        </div>
        <div class="header-right">
          <img class="header-issue" @click="ClickIcon" src="/static/images/Shape_btn@2x.png" alt="">
          <el-dropdown @command="handleCommand" @visible-change="visibleShow" placement="top">
            <div class="header-name">
              <img src="/static/images/sy_icon_me_64@2x.png" alt="">
              <span>{{userInfo.userName}}</span>
              <span :class="isIconShow ? 'el-icon-arrow-down gm-sbc' : 'el-icon-arrow-right gm-sbc'"></span>
            </div>
            <div class="gm-popUp">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user">用户中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" command="Quit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </el-dropdown>
        </div>
    </div>
</template>

<script>
  import {getUserLogout} from "@/HttpApi/login/loginApi";
  export default {
    name: "HeaderTop",
    data(){
      return {
        userInfo:{
          userName:'',//用户姓名
          userImg:'',//用户头像
          uid:'',//用户ID
        },
        isIconShow:false,
      }
    },
    methods:{
      handleCommand(command){
        let _this = this;
        if(command == 'Quit'){
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:'gm-config',
            type: 'warning'
          }).then(() => {
            getUserLogout().then(response => {
              if(response.data.success){
                _this.Cookies.remove('token');
                _this.Cookies.remove('userInfo');
                _this.$message({
                  type: 'success',
                  message: '退出登录成功!'
                });
                setTimeout(()=>{
                  _this.$router.push({path:'/Company/CompanyHome'});
                })
              }else{
                _this.$message.error(response.data.data.msg);
              }
            })
          }).catch(() => {});
        }else{
          this.$router.push({path:'/Index/userInfo',query:{id:this.userInfo.uid}});
        }
      },
      //角标icon显示隐藏
      visibleShow(isIconShow){
        this.isIconShow = isIconShow;
      },
      //跳转首页
      ClickURL(){
        let routeData = this.$router.resolve({
          path: '/Company/CompanyHome',
        });
        window.open(routeData.href, '_blank');
      },
      //跳转到接入须知
      ClickIcon(){
        let routeData = this.$router.resolve({
          path: '/Company/AccessToInformation',
        });
        window.open(routeData.href, '_blank');
      }
    },
    mounted(){
      let cookies = JSON.parse(this.Cookies.get('userInfo'));
      this.userInfo.userName = cookies ? cookies.userName : '智能国美';
      this.userInfo.userImg = cookies ? cookies.userImg : '';
      this.userInfo.uid = cookies ? cookies.uid : '';
    }
  }
</script>

<style lang="scss">
.header{
  width:100%;
  height: 60px;
  background: #1B1B1B;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.11);
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  .header-left{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-left: 30px;
    img{
      width: 90px;
      height: 30px;
      display: block;
      cursor: pointer;
    }
    >span{
      width: 2px;
      height: 20px;
      display: block;
      background: #ffffff;
      margin-left: 16px;
      margin-right: 16px;
    }
    >p{
      font-size: 18px;
      color: #ffffff;
      font-weight: 600;
    }
  }
  .header-right{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-right:30px;
    cursor: pointer;
    position: relative;
    .el-dropdown{
      display: flex;
      display: -webkit-flex;
      align-items: center;
    }
    .header-issue{
      width: 20px;
      height: 20px;
      display: block;
    }
    .header-name{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      margin-right: 10px;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        display: block;
      }
      >span{
        font-size: 14px;
        color: #999999;
        margin-left: 20px;
      }
    }
    .header-Badge{
      width: 14px;
      height: 8px;
      display: block;
    }
    .gm-sbc{
      color: #ffffff;
      display: block;
      font-size:18px;
    }
    .gm-sbc:hover + .gm-popUp{
      display: block;
    }
    .gm-popUp{
      width: 160px;
      position: absolute;
      top: 46px;
      right: -30px;
      background: #1B1B1B;
      z-index: 100;
      display: none;
      .gm-user{
        margin-left: 20px;
        height: 50px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        .el-icon-user{
          font-size:18px;
          color: #ffffff;
          margin-right: 15px;
        }
        button{
          font-size: 14px;
          color: #999999;
          margin-left: 15px;
        }
      }
      .gm-quit{
        margin-left: 20px;
        height: 50px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        .el-icon-switch-button{
          font-size:18px;
          color: #ffffff;
          margin-right: 15px;
        }
        button{
          font-size: 14px;
          color: #999999;
          margin-left: 15px;
        }
      }
    }
  }
}
.gm-config{
  .el-message-box__content{
    padding: 0.3rem 0.3rem;
    color: #333333;
    font-weight: 600;
    text-align: left;
  }
  .el-message-box__btns{
    button{
      padding: 0.09rem 0.25rem;
    }
  }
}

</style>
