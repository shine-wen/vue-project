<template>
    <div id="cart">
        <Navbar title="购物车"></Navbar>

        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(shop,index) in shopCart" :key="shop.id">
                    <mt-switch v-model="shop.isSelected"></mt-switch>
                    <img :src="shop.src" alt="">
                    <div class="pay-calc">
                        <p>{{shop.title}}</p>
                        <div class="calc">
                            <span>￥{{shop.sell_price}}</span>
                            <span @click="substract(shop)">-</span>
                            <span>{{shop.num}}</span>
                            <span @click="addNum(shop)">+</span>
                            <a href="javascript:;" @click="del(shop,index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费)</p>
                <span>已经选择商品{{payment.count}}件，总价￥{{payment.total}}</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import GoodsTool from "@/GoodsTool.js"
    export default {
        name: "cart",
        data() {
            return {
                shopCart: []
            }
        },
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`

            let res = confirm("确定要离开吗？")
            if (res) {
                let obj = {};
                this.shopCart.forEach((shop) => {
                    obj[shop.id] = shop.num;
                })
                GoodsTool.saveGoods(obj);
                next();
            }else {
                next();//取消导航
            }


        },
        created() {
            let arrNum = [];
            let getGoodsList = GoodsTool.getGoodsList();
            let ids = Object.keys(getGoodsList).join(",");//获取商品的id
            let val = Object.values(getGoodsList).join(",");//获取商品的id
            arrNum = val.split(",")
            console.log("数量：", arrNum)

            this.$axios.get(`goods/shopCarList/${ids}`)
                .then(res => {
                    this.shopCart = res.data.list;

                    //  vue 会将shopCart中的对象的所有属性进行监听，完成响应式
                    /**
                     Object.defineProperty(this,"shopCart",{
                         set:function(){
                         判断shopCart元素是否有属性}
                     })

                     * */

                    //给数组的元素添加属性num (购物车上的商品数量 以id区分)
                    for (var i = 0; i < this.shopCart.length; i++) {
                        let shop = this.shopCart[i];//获取每条数据对象
                        // let num=getGoodsList[shop.id];//正常情况下根据对象中相同id 获取value 值，即选择的数量（这里由于id用mock 生成，并不一样所以不对应）
                        let num = arrNum[i]; //非正常情况 （由于id 不对应只能根据下标，下标不足，就设置为num=1）
                        if (num) {
                            //手动对对象添加属性
                            // shop.num = num;
                            // shop.isSelected = true

                            // 用vue提供的方法添加属性（自己的数据不完整，要添加新属性，就要手动通知vue，进行数据双向绑定）
                            this.$set(shop, 'num', num)
                            this.$set(shop, 'isSelected', true)

                        } else {
                            // shop.num = 1;
                            // shop.isSelected = false
                            this.$set(shop, 'num', 1)
                            this.$set(shop, 'isSelected', true)
                        }
                    }
                    console.log("购物车列表数据----")
                    console.log(this.shopCart)
                })
                .catch(err => {
                    console.log("获取购物信息失败", err)
                })


        },
        computed: {
            payment() {
                //默认只有getter方法
                let total = 0;
                let count = 0;
                this.shopCart.forEach((shop) => {
                    console.log(shop)
                    if (shop.isSelected) {
                        count += parseInt(shop.num);
                        total += parseInt(shop.num) * parseInt(shop.sell_price)
                    }
                })
                return {
                    total, count
                }

            }
        },
        methods: {
            addNum(shop) {
                shop.num++;
                console.log(shop)

            },
            substract(shop) {
                if (shop.num == 1) {
                    return;
                }
                shop.num--;
                console.log(shop)
            },

            del(shop, index) {
                //    删除数组元素
                this.shopCart.splice(index, 1);
                //    删除shop
                delete GoodsTool[shop.id]

            }


        }
    }
</script>

<style scoped>
    #cart {
        padding: 0px 0px 130px;
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    .pay-detail ul li {
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 3px;
    }

    .pay-detail ul {
        padding-left: 5px;
        margin-top: 5px;
    }

    .pay-detail ul li img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
    }

    .pay-detail ul l > :nth-child(1),
    .pay-detail ul l > :nth-child(3) {
        display: inline-block;
    }

    .pay-calc p {
        display: inline-block;
        width: 250px;
        overflow: hidden;
        color: blue;
        font-size: 15px;
        margin-bottom: 10px;
    }

    .pay-detail ul l > :nth-child(1) {
        line-height: 80px;
    }

    .calc:nth-child(1) {
        color: red;
        font-size: 20px;
    }

    .calc span:not(:nth-child(1)) {
        border: 1px solid rgba(0, 0, 0, 0.3);
        width: 20px;
        display: inline-block;
        text-align: center;
    }

    .calc a {
        margin-left: 20px;
    }

    .show-1, .show-2 {
        display: inline-block;
        margin-left: 30px;
    }

    .show-price {
        background-color: rgba(0, 0, 0, 0.2);
    }

</style>