import Vue from 'vue'
import Router from 'vue-router'
//CompanyHome
import Company from '@/views/CompanyHome/coupany'
import login from '@/views/CompanyHome/login/login'
import userLogin from '@/views/CompanyHome/login/userLogin'
import CompanyHome from '@/views/CompanyHome/home/home'
import product from '@/views/CompanyHome/product/product'
import solution from '@/views/CompanyHome/product/solution'
import APITCF from '@/views/CompanyHome/TCF/APITCF'
//CMS
import Index from '@/views/CMS/index'
import overview from '@/views/CMS/overview/overview'
import userList from '@/views/CMS/user/userList'
import userInfo from '@/views/CMS/user/userInfo'
import faceList from '@/views/CMS/face/faceList'
import addGroup from '@/views/CMS/face/addGroup'
import groupList from '@/views/CMS/face/groupList'
import equipmentList from '@/views/CMS/equipment/equipmentList'
import statement from '@/views/CMS/statement/statement'
import log from '@/views/CMS/operationLog/log'
import applicationList from '@/views/CMS/applications/applicationList'
import addApplication from '@/views/CMS/applications/addApplication'
import applicationDetail from '@/views/CMS/applications/applicationDetail'

//控制跳转同一个路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

const router = new Router({
  mode:'history',
  //路由跳转后页面回到顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/Company',
      name: '首页容器',
      component: Company,
      children:[
        {
          path: '/Company/login',
          name: '登陆',
          component: login,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
        {
          path: '/Company/userLogin',
          name: '注册',
          component: userLogin,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
        {
          path: '/Company/CompanyHome',
          name: '国美首页',
          component: CompanyHome,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
        {
          path: '/Company/product',
          name: '产品服务',
          component: product,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
        {
          path: '/Company/solution',
          name: '解决方案',
          component: solution,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
        {
          path: '/Company/APITCF',
          name: '技术文档',
          component: APITCF,
          meta: {
            title:'国美人脸认证开放平台',
          },
        },
      ]
    },
    {
      path: '/Index',
      name: '首页',
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
        path: '/Index/addGroup',
        name: 'addGroup',
        component: addGroup,
        meta: {
          title:'',
          code:4
        }
      },{
        path: '/Index/groupList',
        name: 'groupList',
        component: groupList,
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

//路由处理函数
router.beforeEach((to, from, next)=>{
  document.title = to.meta.title || '国美人脸认证开放平台';
  next();
});

export default router;
