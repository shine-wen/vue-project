<template>
    <div>
        <Navbar title="商品列表"></Navbar>
        <div class="page-loadmore">
            <!--:style="{ height: wrapperHeight + 'px' }"-->
            <div class="page-loadmore-wrapper" ref="wrapper">
                <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                             :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
                    <ul class="page-loadmore-list">
                        <li v-for="(goods,index) in goodsList" :key="goods.id">
                            <router-link :to='{name:"goods.detail",params:{id:goods.id}}'>
                                <img src="https://img11.360buyimg.com/n7/jfs/t1/23266/14/1601/424662/5c137895E3c5d967e/8bde6141b27fb500.jpg"
                                     alt="">
                                <div class="title">{{goods.title | controllshow(11)}}</div>
                                <div class="desc">
                                    <div class="sell">
                                        <span>￥{{goods.sell_price}}</span>
                                        <span>￥{{goods.or_price}}</span>
                                    </div>
                                    <div class="detail">
                                        <div class="hot">
                                            热卖中
                                        </div>
                                        <div class="count">
                                            剩{{goods.stock}}件
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                    <div class="nodata" v-if="allLoaded">没有更多数据了</div>
                </mt-loadmore>
            </div>
        </div>

    </div>

</template>

<script>
    /*
      mt-loadmore 中的属性
      1  bottomload 函数
      2机制 bottom ：bottom-all-loaded 默认为false 可以上啦， true禁止上啦
      3 auto-fill 默认为true 自动检测父容器，并调用bottomload直到撑满父容器（相当就是一直加载数据的ajax 函数 ）
      4 pull拉动为满足70 ，drop 达到70px ,loading 加载中
      5 loadmore 组件对象onBottmLoaded() 通知结束loading 进入pull 状态
      6 组件上 写上 ref='xx'在js 中 通过this,$refs.xx 可以获取组件对象
      通过在普通标签写 ref 在 js 中通过 this.$refs.xx 获取dom 对象
     7  上拉加载更多公式
      进入检测机制==》 可视的高度+页面卷起的高度=设备的高度
     */

    export default {
        name: "goods-list",
        data() {
            return {
                page: this.$route.params.page,
                goodsList: [],
                allLoaded: false,//值为false 是上拉加载中的状态 true则关闭加载
                wrapperHeight:0,
                autoFill:false
            }
        },
        methods: {
            loadBottom() {
                console.log("上拉被调用！");

                //    接下来是通知状态改变
                this.loadGoodsByPage();//加载数据

                setTimeout(()=>{
                    this.$refs.loadmore.onBottomLoaded(); //通知结束loading 进入oull 状态
                },1500)

            },
            handleBottomChange(status) {
                console.log(status)
            },

            //加载商品列表数据 方法
            loadGoodsByPage() {
                this.$axios.get(`http://localhost:8085/getgoods/?pageindex=${this.page}`)
                    .then(res => {
                        //这里用page=4 来显示没有更多数据 即返回的最后的几条数据
                        if(this.page==4){
                            this.$toast('没有更多数据了！');
                        //          如果为true 表明所有数据都加载完了,禁止上啦行为
                             this.allLoaded=true;

                             return;
                        }

                        if (this.page == 1) {
                            this.goodsList = res.data.list;
                        } else {
                            //不是第一页的表明是上啦加载的数据
                            this.goodsList = this.goodsList.concat(res.data.list);
                        }
                        this.page++;
                    })
                    .catch(err => {
                        console.log('获取商品列表失败')
                    })

            }
        },
        created() {
            //  进来加载商品第一页的数据
            this.loadGoodsByPage()
        },
        mounted() {
            //用于解决 页面在点击鼠标左键拉动时，难拉动的情况及拉动报错
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    }

</script>

<style scoped>
    .page-loadmore {
        padding: 0px 0 110px;
        height: 100%;
        box-sizing: border-box;
    }

    .page-loadmore-list {
        overflow: hidden;
        /*height: 100%;*/
    }

    .page-loadmore-list li {
        width: 50%;
        float: left;

    }

    li > a:not(.mui-btn) {
        margin: 0px;
        padding: 0;
        border: 1px solid #5c5c5c;
        width: 100%;
        display: block;
    }

    li > a:not(.mui-btn) img {
        width: 100%;
    }

    .sell span {
        color: red;
        text-align: left;
    }

    .sell span:nth-child(1) {
        float: left;
    }

    .sell span:nth-child(1) {
        float: right;
    }

    .detail > .hot {
        float: left;
        text-align: left;
        font-size: 15px;
    }

    .detail > .count {
        float: right;
        text-align: right;
        font-size: 15px;
    }

    /*撑开，清除浮动没有高度*/
    .detail {
        overflow: hidden;
    }

    .desc {
        color: rgba(92, 92, 92, 0.8);
        background-color: rgba(0, 0, 0, 0.2);
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    img {
        height: 200px;
    }

    .page-loadmore-listitem {
        border-bottom: 1px solid #eee;

    }

    .page-loadmore-listitem {
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    .page-loadmore-listitem:first-child {
        border-top: 1px solid #eee;
    }

    .page-loadmore-wrapper {
        overflow: scroll;
    }

    .mint-loadmore-bottom span {
        display: inline-block;
        -webkit-transition: .2s lineat;
        transition: .2s linear;
        vertical-align: center;

    }

    .mint-loadmorm-bottom span.is-rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    /*没有更多数据提示底部*/
    .nodata{
        color: #666;
        opacity: 0.8;
        padding: 10px 0;
        text-align: center;
    }
</style>