<template>
    <div class="goods_detail">
        <Navbar title="商品详情"></Navbar>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swiper :url="url" myHeight="180px"></my-swiper>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li>
                      <span class="product-desc-span">
                        随机标题:-{{goodsInfo.title}}
                      </span>
                </li>
                <li class="price-li">市场价： <s>￥{{goodsInfo.or_price}}</s>
                    销售价：<span style="font-size: 18px">￥{{goodsInfo.sell_price}}</span>
                </li>
                <li class="number-li">
                    购买数量：<span @click="substract">-</span><span>{{pickNum}}</span><span @click="addG">+</span>
                </li>
                <li>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="bollHandler">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>

        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号:{{goodsInfo.coed}}</li>
                <li>库存情况:{{goodsInfo.stock}}</li>
                <li>上架时间：{{goodsInfo.time |formatTime("YYYY-MM-DD HH:mm:ss")}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click.native="showShopInfo()">图文介绍</mt-button>

                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click.native="goodsComment">商品平论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import GoodsTool from "@/GoodsTool.js"

    export default {
        name: "goods-detail",
        data() {
            return {
                url: `goodsLunBo/${this.$route.params.id}`,
                goodsInfo: {},
                pickNum: 1,
                isShow: false
            }

        },
        methods: {
            //图文介绍
            showShopInfo() {
                this.$router.push({
                    name: "photo.info",
                    query: {
                        id: this.$route.params.id
                    }
                })
            },
            //     商品评论
            goodsComment() {
                this.$router.push({
                    name: 'goods.comment',
                    query: {
                        id: this.$route.params.id
                    }
                })
            },
            //    商品加减
            substract() {
                if (this.pickNum == 1) {
                    return;
                }
                this.pickNum--;

            },
            addG() {
                //增加时判断是否小于库存
                if (this.pickNum < this.goodsInfo.stock) {
                    this.pickNum++;
                }
            },

            //   加入购物车，小球动画效果
            bollHandler() {
                this.isShow = true;
            },
            afterEnter() {
                this.isShow = false;

                //  子组件触发bus对象 绑定事件 用$emit 传输数据 给父组件app.vue   父组件用on 绑定 事件，从而获取传输的数据
                this.$bus.$emit('sendPickNum', this.pickNum);
                //  添加到购物车的数据 商品唯一id和添加数量
                GoodsTool.add({
                    id: this.goodsInfo.id,
                    num: this.pickNum
                })
            },
        }
        ,
        created() {
            this.$axios.get(`goods/getinfo/${this.$route.params.id}`)
                .then(res => {
                    console.log("商品信息")
                    console.log(res)
                    this.goodsInfo = res.data.list;
                })
                .catch(err => {
                    console.log("获取商品详细信息，价格库存失败" + err)
                })
        }
    }
</script>

<style scoped>
    .goods_detail {
        padding-bottom: 65px;
    }

    .ball-enter-active {
        /*给一秒的时间让小球进入动画效果*/
        animation: bounce-in 1s;
    }

    .ball-leave {
        /*元素进入后，透明度为0 整个动画都是0*/
        /*元素离开默认是1 所以会闪一下，设置为0*/
        opacity: 0;
    }

    @keyframes bounce-in {
        0% {
            transform: translate3d(0, 0, 0);
        }
        50% {
            transform: translate3d(120px, -40px, 0);
        }
        75% {
            transform: translate3d(150px, 0, 0);

        }
        100% {
            transform: translate3d(120px, 300px, 0);
        }
    }

    .swiper {
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 8px;
        width: 95%;
        border-radius: 15px;
    }

    .outer-swiper, .product-desc, product-props, .product-info {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 3px;
    }

    ul {
        padding: 0;
    }

    ul li {
        list-style: none;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.5);
        margin-top: 8px;
    }

    .product-desc ul > :nth-child(1) span {
        color: blue;
        font-size: 18px;
        font-weight: 700;
    }

    .product-desc ul > :nth-child(1) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }

    .product-desc ul,
    product-props ul,
    .product-info ul {
        padding-left: 10px;
    }

    .price-li span {
        color: red;
        font-size: 25px;
    }

    .price-li s {
        margin-right: 16px;
    }

    /*加减*/
    .number-li span {
        display: inline-block;
        border: 2px solid rgba(0, 0, 0, .1);
        width: 25px;
    }

    /*商品参数*/
    .product-props ul > :nth-child(1) {
        text-align: left;
    }

    .product-props ul > :not(:nth-child(1)) {
        margin-left: 40px;
    }

    .product-info ul {
        margin-bottom: 70px;
        padding: 0.5px;
    }

    .number-li span {
        text-align: center;
    }

    .number-li > :nth-child(2) {
        width: 40px;
    }

    .ball {
        border-radius: 50%;
        background-color: red;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 390px;
        left: 120px;
        display: inline-block;
        z-index: 999;
    }

</style>