import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.css'

//头部组件
import Header from '@/components/header/header.vue'
import layout from '@/components/layout/layout.vue'
import breadcrumb from '@/components/header/BoxHeader.vue'

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
  let width = document.body.clientWidth;
  let fontSize = document.getElementsByTagName('html')[0].style.fontSize = width / 19.2 + "px";
}

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
