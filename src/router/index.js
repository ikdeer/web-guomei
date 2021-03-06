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
import productList from '@/views/CMS/productService/productList'
import productAdd from '@/views/CMS/productService/productAdd'
import productDetails from '@/views/CMS/productService/productDetails'
import productEdit from '@/views/CMS/productService/productEdit'
import solutionList from '@/views/CMS/solution/solutionList'
import solutionAdd from '@/views/CMS/solution/solutionAdd'
import solutionDetails from '@/views/CMS/solution/solutionDetails'
import solutionEdit from '@/views/CMS/solution/solutionEdit'
import bannerList from '@/views/CMS/banner/bannerList'
import bannerAdd from '@/views/CMS/banner/bannerAdd'
import bannerDetails from '@/views/CMS/banner/bannerDetails'
import bannerEdit from '@/views/CMS/banner/bannerEdit'

//控制跳转同一个路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

const router = new Router({
  mode:'hash',
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
      children:[
        {
          path: '/Company/login',
          name: '登录',
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
          path: '/Company/forgetPaw',
          name: '忘记密码',
          component: forgetPaw,
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
        {
          path: '/Company/AccessToInformation',
          name: '接入须知',
          component: AccessToInformation,
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
          },
        },
        {
          path: '/Index/userInfo',
          name: '用户基本信息',
          component:userInfo ,
          meta: {
            title:'国美人脸认证管理后台',
            code:2,
          },
        },{
          path: '/Index/applicationList',
          name: '应用列表',
          component:applicationList ,
          meta: {
            title:'国美人脸认证管理后台',
            code:3,
          },
        },{
          path: '/Index/addApplication',
          name: '创建应用',
          component:addApplication ,
          meta: {
            title:'国美人脸认证管理后台',
            code:3,
          },
        },{
          path: '/Index/applicationDetail',
          name: '应用详情',
          component:applicationDetail ,
          meta: {
            title:'国美人脸认证管理后台',
            code:3,
          },
        },{
          path: '/Index/faceList',
          name: '人脸分组列表',
          component: faceList,
          meta: {
            title:'国美人脸认证管理后台',
            code:4,
          }
        },{
          path: '/Index/addgroupone',
          name: '人脸创建分组',
          component: addGroupOne,
          meta: {
            title:'国美人脸认证管理后台',
            code:4,
          }
        },{
          path: '/Index/addGroupTwo',
          name: '人脸创建分组',
          component: addGroupTwo,
          meta: {
            title:'国美人脸认证管理后台',
            code:4,
          }
        },{
          path: '/Index/groupList',
          name: 'groupList',
          component: groupList,
          meta: {
            title:'国美人脸认证管理后台',
            code:4,
          }
        },{
          path: '/Index/equipmentList',
          name: '设备管理',
          component: equipmentList,
          meta: {
            title:'国美人脸认证管理后台',
            code:5,
          }
        },{
          path: '/Index/statement',
          name: '监控报表',
          component: statement,
          meta: {
            title:'国美人脸认证管理后台',
            code:6,
          }
        },
        {
          path: '/Index/TCFApiList',
          name: '技术文档列表',
          component: TCFApiList,
          meta: {
            title:'国美人脸认证管理后台',
            code:7,
          }
        },
        {
          path: '/Index/TCFApiAdd',
          name: '新增技术文档',
          component: TCFApiAdd,
          meta: {
            title:'国美人脸认证管理后台',
            code:7,
          }
        },
        {
          path: '/Index/TCFApiEdit',
          name: '编辑技术文档',
          component:TCFApiEdit,
          meta: {
            title:'国美人脸认证管理后台',
            code:7,
          }
        },
        {
          path: '/Index/TCFApiDetails',
          name: '查看技术文档',
          component: TCFApiDetails,
          meta: {
            title:'国美人脸认证管理后台',
            code:7,
          }
        },
        {
          path: '/Index/instructionsList',
          name: '接入须知列表',
          component: instructionsList,
          meta: {
            title:'国美人脸认证管理后台',
            code:8,
          }
        },
        {
          path: '/Index/instructionsAdd',
          name: '新增接入须知',
          component: instructionsAdd,
          meta: {
            title:'国美人脸认证管理后台',
            code:8,
          }
        },
        {
          path: '/Index/instructionsEdit',
          name: '编辑接入须知',
          component: instructionsEdit,
          meta: {
            title:'国美人脸认证管理后台',
            code:8,
          }
        },
        {
          path: '/Index/instructionsDetails',
          name: '查看接入须知',
          component: instructionsDetails,
          meta: {
            title:'国美人脸认证管理后台',
            code:8,
          }
        },
        {
          path: '/Index/log',
          name: '操作日志',
          component: log,
          meta: {
            title:'国美人脸认证管理后台',
            code:9,
          }
        },
        {
          path: '/Index/categories',
          name: '栏目管理',
          component: categories,
          meta: {
            title:'国美人脸认证管理后台',
            code:10,
          }
        },
        {
          path: '/Index/solutionList',
          name: '解决方案列表',
          component: solutionList,
          meta: {
            title:'国美人脸认证管理后台',
            code:11,
          }
        },
        {
          path: '/Index/solutionAdd',
          name: '解决方案新增',
          component: solutionAdd,
          meta: {
            title:'国美人脸认证管理后台',
            code:11,
          }
        },
        {
          path: '/Index/solutionDetails',
          name: '解决方案查看',
          component: solutionDetails,
          meta: {
            title:'国美人脸认证管理后台',
            code:11,
          }
        },
        {
          path: '/Index/solutionEdit',
          name: '解决方案编辑',
          component: solutionEdit,
          meta: {
            title:'国美人脸认证管理后台',
            code:11,
          }
        },
        {
          path: '/Index/SDKDownload',
          name: 'SDK下载',
          component: SDKDownload,
          meta: {
            title:'国美人脸认证管理后台',
            code:12,
          }
        },
        {
          path: '/Index/productList',
          name: '产品服务列表',
          component: productList,
          meta: {
            title:'国美人脸认证管理后台',
            code:13,
          }
        },
        {
          path: '/Index/productAdd',
          name: '产品服务新增',
          component: productAdd,
          meta: {
            title:'国美人脸认证管理后台',
            code:13,
          }
        },
        {
          path: '/Index/productDetails',
          name: '产品服务查看',
          component: productDetails,
          meta: {
            title:'国美人脸认证管理后台',
            code:13,
          }
        },
        {
          path: '/Index/productEdit',
          name: '产品服务编辑',
          component: productEdit,
          meta: {
            title:'国美人脸认证管理后台',
            code:13,
          }
        },
        {
          path: '/Index/bannerList',
          name: 'banner位置',
          component: bannerList,
          meta: {
            title:'国美人脸认证管理后台',
            code:14,
          }
        },
        {
          path: '/Index/bannerAdd',
          name: 'banner位置新增',
          component: bannerAdd,
          meta: {
            title:'国美人脸认证管理后台',
            code:14,
          }
        },
        {
          path: '/Index/bannerDetails',
          name: 'banner位置查看',
          component: bannerDetails,
          meta: {
            title:'国美人脸认证管理后台',
            code:14,
          }
        },
        {
          path: '/Index/bannerEdit',
          name: 'banner位置编辑',
          component: bannerEdit,
          meta: {
            title:'国美人脸认证管理后台',
            code:14,
          }
        },
      ],
    }
  ]
})

// 免登录白名单
const whiteList = ['/Company/forgetPaw','/Company/userLogin','/Company/CompanyHome', '/Company/product','/Company/solution','/Company/APITCF','/Company/AccessToInformation'];
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title || '国美人脸认证开放平台';
  if(Cookies.get('token')){
    if(to.fullPath === "/Company/login"){
      next({path:from.fullPath});
    }else{
      next();
    }
  }else{
    if(to.path === "/Company/login" || whiteList.indexOf(to.path) !== -1){
      next();
    }else{
      // 否则全部重定向到登录页
      next({path: '/Company/login',query:{redirect:to.fullPath}});
    }
  }
});

export default router;
