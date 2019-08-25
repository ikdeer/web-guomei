import Vue from 'vue'
import Router from 'vue-router'
//CompanyHome
import Company from '@/views/CompanyHome/coupany'
import login from '@/views/CompanyHome/login/login'
import userLogin from '@/views/CompanyHome/login/userLogin'
import CompanyHome from '@/views/CompanyHome/home/home'
import product from '@/views/CompanyHome/product/product'
//CMS
import Index from '@/views/CMS/index'
import overview from '@/views/CMS/overview/overview'
import userList from '@/views/CMS/user/userList'
import userInfo from '@/views/CMS/user/userInfo'
import faceList from '@/views/CMS/face/faceList'
import equipmentList from '@/views/CMS/equipment/equipmentList'
import statement from '@/views/CMS/statement/statement'
import log from '@/views/CMS/operationLog/log'
import applicationList from '@/views/CMS/applications/applicationList'
import addApplication from '@/views/CMS/applications/addApplication'
import applicationDetail from '@/views/CMS/applications/applicationDetail'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/Company',
      name: '首页容器',
      component: Company,
      children:[
        {
          path: '/Company/login',
          name: 'login',
          component: login,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
        {
          path: '/Company/userLogin',
          name: 'userLogin',
          component: userLogin,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
        {
          path: '/Company/CompanyHome',
          name: 'CompanyHome',
          component: CompanyHome,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
        {
          path: '/Company/product',
          name: 'product',
          component: product,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
      ]
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children:[
        {
          path: '/Index/overview',
          name: 'overview',
          component: overview,
          meta: {
            title:'',
            code:1
          },
        },
        {
          path: '/Index/userList',
          name: 'userList',
          component: userList,
          meta: {
            title:'',
            code:2
          },
        },
        {
          path: '/Index/userInfo',
          name: 'userInfo',
          component:userInfo ,
          meta: {
            title:'',
            code:2
          },
        },{
          path: '/Index/applicationList',
          name: 'applicationList',
          component:applicationList ,
          meta: {
            title:'',
            code:3
          },
        },{
          path: '/Index/addApplication',
          name: 'addApplication',
          component:addApplication ,
          meta: {
            title:'',
            code:3
          },
        },{
          path: '/Index/applicationDetail',
          name: 'applicationDetail',
          component:applicationDetail ,
          meta: {
              title:'',
              code:3
          },
      },{
            path: '/Index/faceList',
            name: 'faceList',
            component: faceList,
            meta: {
                title:'',
                code:4
              }
          },{
            path: '/Index/equipmentList',
            name: 'equipmentList',
            component: equipmentList,
            meta: {
                title:'',
                code:5
            }
          },{
            path: '/Index/statement',
            name: 'statement',
            component: statement,
            meta: {
              title:'',
              code:6
            }
          },{
            path: '/Index/log',
            name: 'log',
            component: log,
            meta: {
              title:'',
              code:7
            }
          },
      ],
    },
    {
      path: '*',
      redirect: '/Company/CompanyHome'
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
