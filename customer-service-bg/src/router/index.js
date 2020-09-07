import Vue from 'vue'
import Router from 'vue-router'

//整体布局框
import Layout from '../pages/Layout/Layout';

//路由懒加载()
// const  HelloWorld= ()=> import('@/components/HelloWorld');
const  Home= ()=> import('../pages/Home/Home');
const  Charts= ()=> import('../pages/Charts/Charts');
const  NewOrder= ()=> import('../pages/Order/NewOrder');
const  OrderDetail= ()=> import('../pages/Order/OrderDetail');
const  TotalOrder= ()=> import('../pages/Order/TotalOrders');
const  AddServicer= ()=> import('../pages/Servicer/AddServicer');
const  ListsServicer= ()=> import('../pages/Servicer/ListsServicer');


Vue.use(Router)
const routers=[
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'home',
                title: '首页',
                component:Home
            }
        ]
    },
    {
        path: '/charts',
        component: Layout,
        children: [
            {
                path: '/charts',
                name: 'charts',
                title: '图表管理',
                component:Charts
            }
        ]
    },
    {
        path: '/order',
        name: 'order',
        title: '订单管理',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [
            {
                path: 'newOrder',
                name: 'newOrder',
                title: '客服下单',
                component: NewOrder
            },
            {
                path: 'orderDetail',
                name: 'orderDetail',
                title: '订单详情',
                component: OrderDetail
            },
            {
                path: 'totalOrder',
                name: 'totalOrder',
                title: '全部订单',
                component: TotalOrder
            }
        ]
    },
    {
        path: '/servicer',
        name: 'servicer',
        title: '服务商管理',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [
            {
                path: 'addServicer',
                name: 'addServicer',
                title: '添加服务商',
                component: AddServicer
            },
            {
                path: 'listsServicer',
                name: 'listsServicer',
                title: '服务商列表',
                component: ListsServicer
            }
        ]
    },
]

const routerConfig = {
    // mode: 'history',
    linkActiveClass: 'active',
    routes: routers
};

const router =new Router(routerConfig)
export default router;