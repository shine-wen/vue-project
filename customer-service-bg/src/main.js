// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

//引入 element-ui 库
import ElementUI from 'element-ui';
//默认主题样式 蓝色为主
import 'element-ui/lib/theme-chalk/index.css';

//自定义主题样式 黄色为主
// import './theme/index.css'

//自定义scss 文件样式 (自己更改样式)
import './assets/css/variable.scss'
//使用
Vue.use(ElementUI);
//公共样式
import './assets/css/base.css'

//注册全局组件
import HeaderDes from './components/HeaderDes/HeaderDes'
Vue.component(HeaderDes.name,HeaderDes)

// 配置 ajax 请求
import axios from 'axios'
// axios.defaults.timeout = 5000;/响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头
// axios.defaults.baseURL ='http://localhost:8080';   //配置接口地址
Vue.prototype.$ajax= axios;

// 在请求或响应被 then 或 catch 处理前拦截它们。
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
      return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//数据拦截+数据模拟
// import Mock from './mock'  //手动引入 不需要时需要注释代码或者删除 (需要 index.js文件  export default Mock)
require("./mock")

process.env.NODE_ENV ==="development" && require("./mock")  // 打包时忽略
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
