<template>
    <div id="app">
        <!--加载中-->
        <loading v-show="loading"></loading>
        <NavView v-show="headerShow"></NavView>
        <transition name="slide-down">
            <keep-alive>
                <!--keep-alive 如果有数据 相当于不吊起ajax-->
                <router-view></router-view>
            </keep-alive>
        </transition>
        <FooterView v-show="hideFooter"></FooterView>
    </div>
</template>
<script>
    import NavView from './components/Nav.vue'
    import FooterView from './components/Footers.vue'
    import {mapGetters, matpActions} from 'vuex'
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        computed:mapGetters([
            'headerShow',
            'loading',
            'hideFooter'
        ]),
        watch:{
            //监听路由变化
            $route(to,from){
                if(to.path == '/user-info'){
                   // $store 重main.js 来 -> store.index.js 来  所以 index.js 要导出 store
                    this.$store.dispatch('hideHeader')
                }else {
                    this.$store.dispatch('showHeader')
                }

                //发送 隐藏footer的 action
                if(this.$route.path.indexOf('article')>0){
                    this.$store.dispatch('hideFooter');
                }else {
                    this.$store.dispatch('showFooter');
                }
            }
        },
        components: {
            NavView,
            FooterView
        }
    }
</script>

<style>
    @import "./assets/css/index.css";

    .slide-down-enter-active,
    .slide-down-leave-active{
          transition: 0.4s all ease;
        opacity: 0.7;
        transform: translate3d(0,5em,0);

    }

    .slide-down-enter,
    .slide-down-leave{
        opacity: 1;
        transform: translate3d(0,5em,0);
    }

</style>
