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

Vue.use(ElementUI)

//注册全局组件
Vue.component('layout-Header',Header)
Vue.component('layout-Sider',layout)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
