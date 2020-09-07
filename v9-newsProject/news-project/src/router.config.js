import  Home from './components/Home.vue'
import  Follow from './components/Follow.vue'
import  Column from './components/Column.vue'
import  UserInfo from './components/UserInfo.vue'
import  Article from  './components/Article.vue'
export default [
    {
        path:'/home',
        component:Home
    },
    {
        path:'/follow',
        component:Follow
    },
    {
        path:'/column',
        component:Column
    },
    {
        path:'/user-info',
        component:UserInfo
    }
    ,
    {
        path:'/article/:id',
        component:Article
    }
    ,
    {
        path:'/',
        redirect:'/home'
    }
    //上面是设置进来首页显示
    //下面 如果路由没有（就是乱输入路径）就显示 主页 重定向
    ,
    {
        path:'*',
        redirect:'/home'
    }

]