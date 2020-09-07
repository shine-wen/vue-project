import Vue from 'vue'
import Router from 'vue-router'
1
//引入组件
// import Home from '@/components/Home/Home'
// import Vip from '@/components/Vip/Vip'
// import Cart from '@/components/Cart/Cart'
// import Search from '@/components/Search/Search'
// import NewsList from '@/components/News/NewsList'
// import  NewsDetail from '@/components/News/NewsDetail'
// import  PhotoList from '@/components/Photo/PhotoList'
// import  PhotoDetail from '@/components/Photo/PhotoDetail'
// import  GoodsList from '@/components/Goods/GoodsList'
// import  GoodsDetail from '@/components/Goods/GoodsDetail'
// import  GoodsComment from '@/components/Goods/GoodsComment'

//按需加载引入
const Home=() => import( '@/components/Home/Home');
const Vip=() => import( '@/components/Vip/Vip');
const Cart=() => import(  '@/components/Cart/Cart');
const Search=() => import( '@/components/Search/Search');
const NewsList=() => import(  '@/components/News/NewsList');
const  NewsDetail =() => import( '@/components/News/NewsDetail');
const  PhotoList=() => import( '@/components/Photo/PhotoList');
const  PhotoDetail =() => import(  '@/components/Photo/PhotoDetail');
const  GoodsList =() => import( '@/components/Goods/GoodsList');
const  GoodsDetail =() => import( '@/components/Goods/GoodsDetail');
const  GoodsComment =() => import(  '@/components/Goods/GoodsComment');


//使用vue-router插件 Vue.prototype.$router=Router;
Vue.use(Router)

export default new Router({
     mode: 'history', //切换路径模式，变成history模式 (会去掉原来的那个#) 变成好看的路由 但这种路由，如直接访问地址，可能会找不到，需要后端处理一下路径
    scrollBehavior: () => ({y: 0}), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
   routes: [
       {
           path:'/',
           redirect:'/home'
       }
       //上面是设置进来首页显示
       //下面 如果路由没有（就是乱输入路径）就显示 主页 重定向
       , {
           path:'*',
           redirect:'/home'
       },
    //   主页路径
    {
      path: '/home',
      name: 'home',
      component: Home
    },
      {
          path: '/vip',
          name: 'vip',
          component: Vip
      },
      {
          path: '/cart',
          name: 'cart',
          component: Cart
      },
      {
          path: '/search',
          name: 'search',
          component: Search
      },
       //新闻列表
       {
           path: '/news/list/:categoryId',
           name: 'new.list',
           component: NewsList
       },
  //     新闻详情
       {
           path:'/news/detail',
           name:'detail',
           component: NewsDetail,
           props:{
               title:'新闻详情啊'
           }
       },
  //     图文列表
       {
           path:'/photo/list/:categoryId',
           name:'photo.list',
           component: PhotoList
       },
    //     图文详情
       {
           path:'/photo/detail',
           name:'photo.detail',
           component: PhotoDetail
       },

       // 商品列表
       {
           path:'/goods/list/:page',
           name:'goods.list',
           component:GoodsList
       },
       //商品介绍
       {
           path:'/goods/detail/:id',
           name:'goods.detail',
           component: GoodsDetail
       },
       //商品图文介绍
       {
           path:'/goods/photo/info',
           name:'photo.info',
           component:NewsDetail,
            props:{
               title:'图文介绍啊'
            }
       },
       //商品评论
       {
           path:'/goods/comment',//后面的query不用写
           name:'goods.comment',
           component:GoodsComment
       }
  ]
})
