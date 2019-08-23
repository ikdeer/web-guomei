import Vue from 'vue'
import Router from 'vue-router'
//CompanyHome
import CompanyHome from '@/views/CompanyHome/home'
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
      path: '/CompanyHome',
      name: '国美人脸认证开放平台',
      component: CompanyHome,
      meta: {
        title:'国美人脸认证开放平台',
      },
    },
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
          path: '/Index/userList',
          name: '用户管理',
          component: userList,
          meta: {
            title:'',
            code:2
          },
        },
        {
          path: '/Index/userInfo',
          name: '用户列表',
          component:userInfo ,
          meta: {
            title:'',
            code:2
          },
        },{
          path: '/Index/applicationList',
          name: '应用列表',
          component:applicationList ,
          meta: {
            title:'',
            code:3
          },
        },{
          path: '/Index/addApplication',
          name: '新增应用',
          component:addApplication ,
          meta: {
            title:'',
            code:3
          },
        },{
          path: '/Index/applicationDetail',
          name: '应用详情',
          component:applicationDetail ,
          meta: {
              title:'',
              code:3
          },
      },{
            path: '/Index/faceList',
            name: '人脸分组列表',
            component: faceList,
            meta: {
                title:'',
                code:4
              }
          },{
            path: '/Index/equipmentList',
            name: '设备管理',
            component: equipmentList,
            meta: {
                title:'',
                code:5
            }
          },{
            path: '/Index/statement',
            name: '监控报表',
            component: statement,
            meta: {
              title:'',
              code:6
            }
          },{
            path: '/Index/log',
            name: '操作日志',
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
      redirect: '/CompanyHome'
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
