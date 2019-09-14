import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
//CompanyHome
import Company from '@/views/CompanyHome/coupany'
import login from '@/views/CompanyHome/login/login'
import userLogin from '@/views/CompanyHome/login/userLogin'
import forgetPaw from '@/views/CompanyHome/login/forgetPaw'
import CompanyHome from '@/views/CompanyHome/home/home'
import product from '@/views/CompanyHome/product/product'
import solution from '@/views/CompanyHome/product/solution'
import APITCF from '@/views/CompanyHome/TCF/APITCF'
import AccessToInformation from '@/views/CompanyHome/TCF/AccessToInformation'
//CMS
import Index from '@/views/CMS/index'
import overview from '@/views/CMS/overview/overview'
import userList from '@/views/CMS/user/userList'
import userInfo from '@/views/CMS/user/userInfo'
import faceList from '@/views/CMS/face/faceList'
import addGroupOne from '@/views/CMS/face/addGroupOne'
import addGroupTwo from '@/views/CMS/face/addGroupTwo'
import groupList from '@/views/CMS/face/groupList'
import equipmentList from '@/views/CMS/equipment/equipmentList'
import statement from '@/views/CMS/statement/statement'
import log from '@/views/CMS/operationLog/log'
import applicationList from '@/views/CMS/applications/applicationList'
import addApplication from '@/views/CMS/applications/addApplication'
import applicationDetail from '@/views/CMS/applications/applicationDetail'
import TCFApiList from '@/views/CMS/tcf/TCFApiList'
import TCFApiAdd from '@/views/CMS/tcf/TCFApiAdd'
import TCFApiDetails from '@/views/CMS/tcf/TCFApiDetails'
import TCFApiEdit from '@/views/CMS/tcf/TCFApiEdit'
import instructionsList from '@/views/CMS/instructions/instructionsList'
import instructionsAdd from '@/views/CMS/instructions/instructionsAdd'
import instructionsDetails from '@/views/CMS/instructions/instructionsDetails'
import instructionsEdit from '@/views/CMS/instructions/instructionsEdit'
import categories from '@/views/CMS/categories/categories'
import SDKDownload from '@/views/CMS/SDKDownload/SDKDownload'
import productlist from '@/views/CMS/productService/productlist'
import productAdd from '@/views/CMS/productService/productAdd'

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
      path: '*',
      redirect: '/Company/CompanyHome'
    },
    {
      path: '/Company',
      name: '首页容器',
      component: Company,
      meta:{requireAuth:true},
      children:[
        {
          path: '/Company/login',
          name: '登录',
          component: login,
          meta: {
            title:'国美人脸认证开放平台',
            requireAuth:true
          },
        },
        {
          path: '/Company/userLogin',
          name: '注册',
          component: userLogin,
          meta: {
            title:'国美人脸认证开放平台',
            requireAuth:true
          },
        },
        {
          path: '/Company/forgetPaw',
          name: '忘记密码',
          component: forgetPaw,
          meta: {
            title:'国美人脸认证开放平台',
            requireAuth:true
          },
        },
        {
          path: '/Company/CompanyHome',
          name: '国美首页',
          component: CompanyHome,
          meta: {
            title:'国美人脸认证开放平台',
            requireAuth:true
          },
        },
        {
          path: '/Company/product',
          name: '产品服务',
          component: product,
          meta: {
            title:'国美人脸认证开放平台',
            requireAuth:true
          },
        },
        {
          path: '/Company/solution',
          name: '解决方案',
          component: solution,
          meta: {
            title:'国美人脸认证开放平台',
            requireAuth:true
          },
        },
        {
          path: '/Company/APITCF',
          name: '技术文档',
          component: APITCF,
          meta: {
            title:'国美人脸认证开放平台',
            requireAuth:true
          },
        },
        {
          path: '/Company/AccessToInformation',
          name: '接入须知',
          component: AccessToInformation,
          meta: {
            title:'国美人脸认证开放平台',
            requireAuth:true
          },
        },
      ]
    },
    {
      path: '/Index',
      name: '首页',
      component: Index,
      meta:{
        requireAuth:true
      },
      children:[
        {
          path: '/Index/overview',
          name: '概览',
          component: overview,
          meta: {
            title:'国美人脸认证管理后台',
            code:1,
          },
        },
        {
          path: '/Index/userList',
          name: '用户管理',
          component: userList,
          meta: {
            title:'国美人脸认证管理后台',
            code:2,
            requireAuth:true
          },
        },
        {
          path: '/Index/userInfo',
          name: '用户基本信息',
          component:userInfo ,
          meta: {
            title:'国美人脸认证管理后台',
            code:2,
            requireAuth:true
          },
        },{
          path: '/Index/applicationList',
          name: '应用列表',
          component:applicationList ,
          meta: {
            title:'国美人脸认证管理后台',
            code:3,
            requireAuth:true
          },
        },{
          path: '/Index/addApplication',
          name: '创建应用',
          component:addApplication ,
          meta: {
            title:'国美人脸认证管理后台',
            code:3,
            requireAuth:true
          },
        },{
          path: '/Index/applicationDetail',
          name: '应用详情',
          component:applicationDetail ,
          meta: {
              title:'国美人脸认证管理后台',
              code:3,
              requireAuth:true
          },
      },{
        path: '/Index/faceList',
        name: '人脸分组列表',
        component: faceList,
        meta: {
            title:'国美人脸认证管理后台',
            code:4,
            requireAuth:true
          }
      },{
        path: '/Index/addgroupone',
        name: '人脸创建分组',
        component: addGroupOne,
        meta: {
          title:'国美人脸认证管理后台',
          code:4,
          requireAuth:true
        }
      },{
         path: '/Index/addGroupTwo',
         name: '人脸创建分组',
         component: addGroupTwo,
         meta: {
           title:'国美人脸认证管理后台',
           code:4,
           requireAuth:true
         }
      },{
        path: '/Index/groupList',
        name: 'groupList',
        component: groupList,
        meta: {
          title:'国美人脸认证管理后台',
          code:4,
          requireAuth:true
        }
      },{
        path: '/Index/equipmentList',
        name: '设备管理',
        component: equipmentList,
        meta: {
            title:'国美人脸认证管理后台',
            code:5,
            requireAuth:true
        }
      },{
        path: '/Index/statement',
        name: '监控报表',
        component: statement,
        meta: {
          title:'国美人脸认证管理后台',
          code:6,
          requireAuth:true
        }
      },
        {
          path: '/Index/TCFApiList',
          name: '技术文档列表',
          component: TCFApiList,
          meta: {
            title:'国美人脸认证管理后台',
            code:7,
            requireAuth:true
          }
        },
        {
          path: '/Index/TCFApiAdd',
          name: '新增技术文档',
          component: TCFApiAdd,
          meta: {
            title:'国美人脸认证管理后台',
            code:7,
            requireAuth:true
          }
        },
        {
          path: '/Index/TCFApiEdit',
          name: '编辑技术文档',
          component:TCFApiEdit,
          meta: {
            title:'国美人脸认证管理后台',
            code:7,
            requireAuth:true
          }
        },
        {
          path: '/Index/TCFApiDetails',
          name: '查看技术文档',
          component: TCFApiDetails,
          meta: {
            title:'国美人脸认证管理后台',
            code:7,
            requireAuth:true
          }
        },
        {
          path: '/Index/instructionsList',
          name: '接入须知列表',
          component: instructionsList,
          meta: {
            title:'国美人脸认证管理后台',
            code:8,
            requireAuth:true
          }
        },
        {
          path: '/Index/instructionsAdd',
          name: '新增接入须知',
          component: instructionsAdd,
          meta: {
            title:'国美人脸认证管理后台',
            code:8,
            requireAuth:true
          }
        },
        {
          path: '/Index/instructionsEdit',
          name: '编辑接入须知',
          component: instructionsEdit,
          meta: {
            title:'国美人脸认证管理后台',
            code:8,
            requireAuth:true
          }
        },
        {
          path: '/Index/instructionsDetails',
          name: '查看接入须知',
          component: instructionsDetails,
          meta: {
            title:'国美人脸认证管理后台',
            code:8,
            requireAuth:true
          }
        },
        {
        path: '/Index/log',
        name: '操作日志',
        component: log,
        meta: {
          title:'国美人脸认证管理后台',
          code:9,
          requireAuth:true
        }
      },
        {
          path: '/Index/categories',
          name: '栏目管理',
          component: categories,
          meta: {
            title:'国美人脸认证管理后台',
            code:10,
            requireAuth:true
          }
        },
        {
          path: '/Index/SDKDownload',
          name: 'SDK下载',
          component: SDKDownload,
          meta: {
            title:'国美人脸认证管理后台',
            code:12,
            requireAuth:true
          }
        },
        {
          path: '/Index/productlist',
          name: '产品服务列表',
          component: productlist,
          meta: {
            title:'国美人脸认证管理后台',
            code:11,
            requireAuth:true
          }
        },
        {
          path: '/Index/productAdd',
          name: '产品服务新增',
          component: productAdd,
          meta: {
            title:'国美人脸认证管理后台',
            code:11,
            requireAuth:true
          }
        },
      ],
    }
  ]
})

// 免登录白名单
const whiteList = ['/Company/CompanyHome', '/Company/product'];
router.beforeEach((to,from,next)=>{
  if(Cookies.get('token')){
    if(to.fullPath === "/Company/login"){
      next({
        path:from.fullPath
      });
    }else{
      next();
    }
  }else{
    if(whiteList.indexOf(to.path) !== -1){
      next();
    }else{
      // 否则全部重定向到登录页
      //next({path: '/', query: { redirect: to.fullPath }});
      next();
    }
  }
  document.title = to.meta.title || '国美人脸认证开放平台';
});

export default router;
