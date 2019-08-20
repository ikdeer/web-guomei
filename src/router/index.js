import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import overview from '@/views/overview/overview'

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
          title: '概览',
          component: overview,
          meta: {
            title:'',
            code:1
          },
        }
      ],
    },
    {
      path: '*',
      redirect: '/Index'
    }
  ]
})

//路由拦截切
router.beforeEach((to, from, next)=>{
  document.title = to.meta.title || '国美人脸认证开放平台';
  next();
});

export default router;
