import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import md5 from 'js-md5'
import Cookie from 'js-cookie'
import './style/common.css'
import 'babel-polyfill'
//头部组件
import Header from '@/views/CMS/component/header/header.vue'
import breadcrumb from '@/views/CMS/component/header/BoxHeader.vue'
import layout from '@/views/CMS/component/layout/layout.vue'

Vue.prototype.$md5 = md5;

Vue.prototype.Cookies = Cookie;

Vue.use(ElementUI,{
    size:'small'
});

//注册全局组件
Vue.component('layout-Header',Header)
Vue.component('layout-Sider',layout)
Vue.component('layout-breadcrumb',breadcrumb)

Vue.config.productionTip = false;

window.onresize = function () {
  rem();
}
rem();
// 进行rem的计算 因为是已1920px为基准进行计算的，所以为了方便，把1rem等于100px
function rem() {
  let designSize = 1920; // 设计图尺寸
  let html = document.documentElement;
  let wW = html.clientWidth;// 窗口宽度
  let rem = wW * 100 / designSize;
  document.documentElement.style.fontSize = rem + 'px';
}

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
