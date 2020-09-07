// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'common/stylus/index.styl'
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
// 解决300ms 点击延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
