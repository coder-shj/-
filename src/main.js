import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'
// 安装toast插件  在插件安装之时，会自动调用其中的install对象
Vue.use(toast)

Vue.config.productionTip = false
// 添加事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟
FastClick.attach(document.body)
// 图片懒加载的调用
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/xiaomai.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
