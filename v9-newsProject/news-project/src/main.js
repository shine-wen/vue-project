import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config'
import store from './store'
//上面是引进 vuex数据管理index.js
// import axios from 'axios'
import Loading from './components/loading'
import axios from "axios/index";

import filters from './filters'

//Vue.filter(名字，函数)
// Object.keys() 方法会返回一个由给定对象的自身可枚举属性组成的数组，
// 数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致
// （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。
// 循环绑定到Vue.filter上：
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

console.log(Object.keys(filters).forEach(key =>
        console.log(filters[key]) //打印出每个过滤器函数，fun1 fun2
))
Vue.use(VueRouter);
Vue.use(Loading)

const router = new VueRouter({
    mode: 'history', //切换路径模式，变成history模式
    scrollBehavior: () => ({y: 0}), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes: routerConfig
})

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
    store.dispatch('showLoading')
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
    store.dispatch('hideLoading')
    return response;
}, function (error) {
    return Promise.reject(error);
});

/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
//axios.defaults.baseURL='http://localhost:8082/';
Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了

require("./assets/css/base.css");//全局引入


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
