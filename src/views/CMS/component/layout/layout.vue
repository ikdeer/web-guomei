<template>
    <div class="sider">
      <ul class="sider-ul">
        <li v-for="(item,index) in dataIcon"
            :class="{'sider-li':$route.meta.code == item.code}"
            @click="clickRouter(item)">
          <img :src="$route.meta.code == item.code ? item.iconImgShow : item.iconImgHide">
           <span>{{item.iconText}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
    import layout from '@/JSON/layout'
    import {getMenuList} from '@/HttpApi/layout/layoutApi'
    export default {
        name: "layout",
        data(){
          return {
            dataIcon:[],
            groupID:'',
          }
        },
        methods:{
          //路径跳转
          clickRouter(item){
            //判断普通用户点击跳转到首页技术文档和接入须知
            if(this.groupID == 20){
              if(item.code == 7){
                this.$router.push({path:'/Company/APITCF'});
              }else if(item.code == 8){
                this.$router.push({path:'/Company/AccessToInformation'});
              }else{
                this.$router.push({path:item.iconRouter});
              }
            }else{
              this.$router.push({path:item.iconRouter});
            }
          },
          MenuList(){
            let arr = [];
            getMenuList().then(response => {
              if(response.data.errorCode == 200){
                let list = response.data.data || [];
                for(let i = 0; i < layout.length; i++){
                  for(let j = 0; j < list.length; j++){
                    if(layout[i].code == list[j].id){
                      arr.push(layout[i]);
                    }
                  }
                }
                this.dataIcon = arr;
              }
            })
          },
        },
        mounted(){
          let userInfo = this.Cookies.get('userInfo') || '';
          this.groupID =userInfo ? JSON.parse(userInfo).groupID : '';
          this.MenuList();
        }
    }
</script>

<style lang="scss">
.sider{
  width: 260px;
  height: calc(100% - 0.6rem);
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
      cursor: pointer;
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
        font-size:18px;
        color:#666666;
        display: block;
        text-align: left;
      }
    }
    .sider-li{
      background:#F8F8F8;
      font-weight: 600;
      border-left: 4px solid #FE023F;
      span{
        color: #FE023F;
      }
    }
  }
}
</style>
