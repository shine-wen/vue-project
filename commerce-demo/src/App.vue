<template>
    <div id="app">
        <!--顶部栏-->
        <mt-header title="电商系统" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <!--路由组件出口-->
        <transition name="fade" mode="out-in">
        <router-view/>
        </transition>
        <!--底部栏-->
        <mt-tabbar v-model="selected">
            <mt-tab-item id="home">
                <img slot="icon" src="./assets/logo.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="vip">
                <img slot="icon" src="./assets/logo.png">
                会员
            </mt-tab-item>
            <mt-tab-item id="cart">
                <mt-badge size="small" color="#ff0000">{{pickNum}}</mt-badge>
                <img slot="icon" src="./assets/logo.png">
                购物车
            </mt-tab-item>
            <mt-tab-item id="search">
                <img slot="icon" src="./assets/logo.png">
                查找
            </mt-tab-item>
        </mt-tabbar>

    </div>
</template>

<script>
    import GoodsTool from "@/GoodsTool.js"
    export default {
        name: 'App',
        data() {
            return {
                selected: 'home',
                pickNum:0
            }
        },
        created() {
            //用于绑定底部导航的状态样式
            var curUrl = this.$route.path
            if (curUrl == "/vip") {
                this.selected="vip"
            } else if (curUrl == "/cart") {
                this.selected="cart"
            } else if (curUrl == "/search") {
                this.selected="search"
            } else {
                this.selected="home"
            }

           //实例化的 $bus 就是 new 一个 vm 把他挂载在全局上面，用来传输数据
            //绑定事件 用于购物车的 右上角角标数值  (data) 这个是回调函数 data 是传来的值
            this.$bus.$on('sendPickNum',(data)=>{
                this.pickNum+=data;
            })

        //   进获取原来购物车的数量
            this.pickNum=GoodsTool.gtTotalCount();
                console.log(new Date())
        },
        watch: {
            selected: function (newV, oldV) {
                this.$router.push({name: this.selected})
                // console.log(this.$router)
            }
        }
    }
</script>

<style scoped>
     #app{
         width: 100%;
         height: 100%;
         overflow: scroll;
     }


     /*组件动画*/
     .fade-enter-active, .fade-leave-active {
         transition: opacity .5s;
     }
     .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
         opacity: 0;
     }

     /*购物车的角标*/
    .mint-tab-item-label{
        position: relative;
    }
    .mint-badge{
        position: absolute;
        top: 5px;
        right: 100px;
    }

</style>
