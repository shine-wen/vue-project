<template>
    <div class="box">
        <el-container>
            <!--侧边栏-->
            <el-aside class="aside-wrapper" :style="{width: this.isCollapse?'64px':'200px'}">
                 <div class="left-nav">
                     <div class="logo">LOGO</div>
                     <el-menu
                             @open="handleOpen"
                             @close="handleClose"
                             background-color="#1d1e23"
                             text-color="#fff"
                             active-text-color="#ffd04b"
                             :collapse="isCollapse"
                             router
                             :default-active="$route.path">
                         >
                         <template v-for="(item, index) in sider_menu_data">
                             <el-menu-item class="menu-item" v-if="!item.children" :index="item.path" :key="index">
                                 <i :class="item.icon"></i>
                                 <span slot="title">{{item.title}}</span>
                             </el-menu-item>

                             <el-submenu v-else :index="item.path"  :key="index">
                                 <template slot="title">
                                     <i :class="item.icon"></i>
                                     <span slot="title">{{item.title}}</span>
                                 </template>

                                 <el-menu-item class="menu-item" v-for="(sub_item, sub_index) in item.children" :index="sub_item.path"
                                               :key="sub_index">
                                     <span slot="title" style="margin-left:12px;">{{sub_item.title}}</span>
                                 </el-menu-item>
                             </el-submenu>

                         </template>
                     </el-menu>
                 </div>
            </el-aside>
            <!--右侧主体-->
            <el-container class="right-content" :style="{width: this.isCollapse?'calc(100% - 64px)':'calc(100% - 200px)'}">
                <el-header class="header_bg " height="64px" :style="{left: this.isCollapse?'64px':'200px'}">
                    <div class="menu-collapse-wrapper float-left" @click="changeNav">
                        <i class="el-icon-s-fold" :style="{transform: 'rotateZ(' + (this.isCollapse ? '90' : '0') + 'deg)'}"></i>
                    </div>
                    <div class="nav-title color-text-primary float-left">后台管理系统模板</div>
                    <div class="right-nav float-right">
                        <el-dropdown class="dropdown-nav">
                          <span class="el-dropdown-link">
                            <i class="el-icon-headset"></i>Simon同学<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>设置</el-dropdown-item>
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </div>
                </el-header>

                <el-main class="mian-cont">
                         <router-view>

                         </router-view>
                    <!--<iframe  id="iframe1" :src="currentUrl"  frameborder="0" style="position: absolute;left: 0;top: 0;bottom: 0;right: 0;width: 100%;height: 100%"rameborder="0"></iframe>-->

                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data() {
            return {
                isCollapse: false,
                activeIndex: '1',
                activeIndex2: '1',
                sider_menu_data: [
                    {
                        path: '/home',
                        title: '首页',
                        icon: 'el-icon-menu'
                    },
                    {
                        path: '/order',
                        title: '订单管理',
                        icon: 'el-icon-document',
                        children: [
                            {path: '/order/newOrder', title: '客服下单'},
                            {path: '/order/orderDetail', title: '订单详情'},
                            {path: '/order/totalOrder', title: '全部订单'}
                        ]
                    },
                    {
                        path: '/servicer',
                        title: '服务商管理',
                        icon: 'el-icon-s-custom',
                        children: [
                            {path: '/servicer/addServicer', title: '添加服务商'},
                            {path: '/servicer/listsServicer', title: '服务商列表'}
                        ]
                    },
                    {
                        path: '/charts',
                        title: '图表管理',
                        icon: 'el-icon-s-data'
                    }

                ],
                currentUrl:'http://www.baidu.com'

            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log("打开的")
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log("关闭的")
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log("选择的")
                console.log(key, keyPath);
            },
            //   侧边栏伸缩
            changeNav() {
                this.isCollapse = !this.isCollapse;
            }
        }
    }


</script>

<style lang="scss" >
    /*@import '../../assets/css/variable';*/

   .box{
       position: relative;
       width: 100%;
       height: 100%;
    }

    /*左侧侧边栏*/
    .aside-wrapper {
        min-height: 100vh;
        position: relative;
        background-color: $my-bg-color;
        transition: all .5s ease-in-out;
        z-index: 100;
    }
    .left-nav{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        transition: all .5s ease-in-out;
        z-index: 100;
        width: inherit;
    }

    /*左上角logo 图*/
    .logo {
        width: 100%;
        height: 64px;
        text-align: center;
        line-height: 64px;
        color: $my-text-color;
        overflow: hidden;
    }
    .nav-title{
        line-height: 64px;
        font-size: $my-font-size16;
        color: $my-text-color;
    }

    /*侧边栏消除默认右边框*/
    .el-menu {
        border-right: none;
    }

     /*--------------------右边顶部导航*/
    /*顶部导航栏样式*/
    .right-content{
        transition: all .5s ease-in-out;
    }

    .header_bg {
        background-color: $my-bg-color;
        transition: all .5s ease-in-out;
    }

    .el-header {
        padding: 0px;
        position: fixed;
        right: 0;
        top:0;
        z-index: 100;
    }

    .menu-collapse-wrapper {
        height: 100%;
        width: 64px;
        text-align: center;
        cursor: pointer;
        line-height: 64px;
        /*background-color: #1d1e23;*/
    }
    .menu-collapse-wrapper i {
        font-size: $my-font-size22;
        color: $my-text-color;
        display: inline-block;
        vertical-align: middle;
    }
    .menu-collapse-wrapper:hover {
        background-color: rgba(29,30,35,0.7);
    }

    /*顶部导航右侧*/
    .right-nav{
        padding-right: 25px;
        height: 100%;
    }
    .dropdown-nav{
        height: 100%;
        height: 64px;
        line-height: 64px;
    }

    .dropdown-nav.el-dropdown,.el-dropdown-menu__item{
        color: $my-text-color;
    }
    el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
        /*background-color: #ecf5ff;*/
        /*color: #66b1ff;*/
        background-color: $my-bg-color;
        color: $my-text-color;
    }

    /*登录头像区域*/
    .el-dropdown-link {
        cursor: pointer;
    }
    .el-icon-headset{
        font-size: 18px;
        padding-right: 12px;
    }
    .el-dropdown-link i:nth-child(2){


    }
    .el-icon-arrow-down {
        font-size: 12px;
        padding-left:2px;
    }

    /*整个内容高度*/
    .el-container {
        min-height: 100vh;
        /*使用iframe 修改的*/
        overflow: hidden;
    }

    /*路由展示区域*/
    .el-main.mian-cont{
        position: relative;
        margin-top: 64px;
        background: #f5f7f9;
    }


</style>