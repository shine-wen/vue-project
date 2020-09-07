<template>
    <div class="photoList">
        <navbar title="图文列表"></navbar>
        <div class="category-list">
            <ul>
                <li v-for='(category,index) in categoryList' @click="clickNav(index,index)">
                    <a href="javascript:void(0)"  :class="{active:index==currentIndex}">{{category.title}}</a>
                </li>
            </ul>
        </div>

        <!--图片展示-->
        <div class="photo-list">
            <ul>
                <li v-for='(item ,index) in imgList ' :key="item.id">
                    <router-link :to='{name:"photo.detail",query:{id:item.id}}'>
                        <!--<img :src="item.img_url" alt="">-->
                        <!--用mint UI 图片懒加载-->
                        <img v-lazy="item.img_url" >
                    </router-link>
                    <p>
                        <span>{{item.title}}{{item.id}}</span>
                        <br/>
                        <span>{{item.zhaiyao}}</span>

                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    export default {
        name: "photo-list",
        data() {
            return {
                categoryList: [],
                imgList: [],
                currentIndex:0,//导航下标默认全部 0
            }
        },
        methods: {
            clickNav(id,index){
                 //由于数据上的缺陷，用导航下标来作为请求数据的id号,美女导航项 制作没有数据下的情况
                 this.$router.push({name:'photo.list',params:{categoryId:id}})
                 //导航下标，用于绑定类名
                 this.currentIndex=index
            },

            loadImgByCategoryId(id) {
                var _this=this;

                this.$axios.get('../../static/data/imgList.json?id='+id)
                    .then(function (res) {
                        _this.imgList = res.data.msg
                        //判断 没有数据，显示弹框 _this.imgList.length===0
                        //这里用美女导航下标来判断
                        if(id==3){
                            _this.imgList=[];
                            Toast('没有数据！')
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }

        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            this.loadImgByCategoryId(to.params.categoryId)
            next();
        },
        created() {
            var _this = this;
             _this.loadImgByCategoryId(0)
            this.$axios.get('../../static/data/getImgCategory.json')
                .then(function (res) {
                    // 导航内容
                    _this.categoryList = res.data.msg;
                    //往导航上添加 “全部” 栏
                    _this.categoryList.unshift({"id":0,"title":"全部"})
                    // console.log(_this.categoryList)
                })
                .catch(function (err) {

                })
        }
    }
</script>

<style scoped>
    .category-list {
        position: relative;
        height: 40px;
        width: auto;
        overflow: hidden;

    }

    .category-list ul {
        height: 40px;
        width: auto;
        overflow: scroll;
        white-space: nowrap;
    }

    .category-list ul li {
        display: inline-block;
        width: 25%;
        height: 100%;
        font-size: 18px;
        line-height: 40px;
        text-align: center;

    }

    .category-list ul li a {
        text-decoration: none;
        font-size: 16px;
    }

    .category-list ul li a.active {
        color: #fc0280;
    }

    .photo-list ul li{
        position: relative;
    }
    .photo-list ul li a {
        display: block;
        width: 100%;
    }

    .photo-list ul li a img {
        width: 100%;
    }

    .photo-list ul li p {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        padding: 5px 0;
    }

    .photo-list ul li p span {
        color: #c6c6c6;
        font-size: 16px;
    }

    .photoList {
        padding-bottom: 100px;
    }

    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

    .icon-meiyoutupian {
        width: 50px;
        height: 50px;
    }

</style>