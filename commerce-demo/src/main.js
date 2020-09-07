// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  Axios from 'axios'
import Moment from  'moment' //时间格式化插件

import  EventBus from './EventBus' //挂载全局 公交车 用于 组件之间数传值
Vue.prototype.$bus=EventBus;

//模拟数据
import Mock from  './mock'
require("./mock")

Vue.config.productionTip = false

//引入全局自定义静态css
import '../static/css/global.css'

//注册全局导航栏组件
import Navbar from '@/components/Common/Navbar'
Vue.component(Navbar.name,Navbar)


//引用mint-ui 全局
// import Mint from 'mint-ui';
// Vue.use(Mint);
//按需加载组件
import {Toast,Loadmore,Swipe, SwipeItem,Lazyload,Header,Button,Switch,Badge,Indicator,Tabbar, TabItem}from "mint-ui"
Vue.component(Toast.name,Toast);
Vue.component(Loadmore.name,Loadmore);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
// Vue.component(Lazyload.name,Lazyload);
Vue.component(Header.name,Header);
Vue.component(Button.name,Button);
Vue.component(Switch.name,Switch);
Vue.component(Badge.name,Badge);
Vue.component(Tabbar.name,Tabbar);
Vue.component(TabItem.name,TabItem);
// Vue.component(Indicator.name,Indicator);
// Vue.use(Toast);//这种方式引用也行
Vue.use(Lazyload);

import 'mint-ui/lib/style.css'

//注册全局评论组件
import Comment from '@/components/Common/Comment'
Vue.component(Comment.name,Comment)

import MySwiper from '@/components/Common/MySwiper'
Vue.component(MySwiper.name,MySwiper)



//图片查看器
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview);//内部会执行 原型 vue.component('vue-preview',{})



//自定义全局过滤器
Vue.filter("formatTime",function (data,formatStr) {
   // 传来的可能是字符串，报错 无效日期 Invalid date
   return Moment(parseInt(data)).format(formatStr);
});
//控制字数显示过滤器;
Vue.filter('controllshow',function (str,num) {
       if(str.length<=num){
           return str;
       }else {
           return str.substr(0,num-1)+'...';//如果当前字符串 长度大于num,则截取
       }
})

//设置中文显示
Moment.locale('zh-cn');

//配置公共的URL
Axios.defaults.baseURL='http://localhost:8085/'
//配置axios
Vue.prototype.$axios=Axios;

// 添加请求拦截器  当需要显示加载提示框时，调用 open 方法
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Indicator.open({
        text: '玩命加载ing...',
        spinnerType: 'snake'
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Indicator.close();
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})

