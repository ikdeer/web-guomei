import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import overview from '@/views/overview/overview'
import userList from '@/views/user/userList'
import userInfo from '@/views/user/userInfo'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/Index',
      name: '主页容器',
      component: Index,
      children:[
        {
          path: '/Index/overview',
          name: '概览',
          component: overview,
          meta: {
            title:'',
            code:1
          },
        },
        {
          path: '/Index/userInfo',
          name: '用户管理',
          component: userInfo,
          meta: {
            title:'',
            code:2
          },
        },
        {
          path: '/Index/userList',
          name: '用户列表',
          component: userList,
          meta: {
            title:'',
            code:3
          },
        },
      ],
    },
    {
      path: '*',
      redirect: '/Index'
    }
  ]
})

//路由拦截切
var routeList = [];
router.beforeEach((to, from, next)=>{
  var index = -1;
  for(let i = 0; i < routeList.length; i++){
    if(routeList[i].name == to.name){
      index = i;
      break;
    }
  }
  if(index !== -1){
    routeList.splice(index + 1, routeList.length - index - 1);
  }else{
    routeList.push({ name: to.name, path: to.path});
  }
  to.meta.routeList = routeList;
  document.title = to.meta.title || '国美人脸认证开放平台';
  next();
});

export default router;
