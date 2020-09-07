<template>
    <div id="home">

         <my-swiper url="getlunbo" myHeight="180px"></my-swiper>
        <!--轮播图-->
        <!--<mt-swipe :auto="2500" class="swipe-contents">-->
            <!--<mt-swipe-item v-for="(item,index) in imgS" :key="index">-->
                <!--<img :src='item.img' alt="" />-->
            <!--</mt-swipe-item>-->
        <!--</mt-swipe>-->
        <!--九宫格-->
        <div class="list">
            <ul >
                <li v-for="(grids,index) in grids":key="grids.id">
                    <router-link :to="grids.router">
                        <img :src="grids.src" alt="">
                    </router-link>
                    <p>{{grids.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    var grids=[
        {id:1,router:{name:'new.list',params:{categoryId:0}},src:require('../../assets/logo.png'),title:'新闻资讯'},
        {id:2,router:{name:'photo.list',params:{categoryId:0}},src:require('../../assets/logo.png'),title:'图文分享'},
        {id:3,router:{name:'goods.list',params:{page:1}},src:require('../../assets/logo.png'),title:'商品展示'},
        {id:4,router:{name:'new.list',params:{categoryId:0}},src:require('../../assets/logo.png'),title:'咨询'},
        {id:5,router:{name:'new.list',params:{categoryId:0}},src:require('../../assets/logo.png'),title:'留言反馈'},
        {id:6,router:{name:'new.list',params:{categoryId:0}},src:require('../../assets/logo.png'),title:'联系我们'}
    ]
    export default {
        name: "home",
        data() {
            return {
                //轮播图
                // imgS: [
                //     {"img": require('../../assets/images/banner3.jpg')},
                //     {"img":  require('../../assets/images/banner1.jpg')},
                //     {"img":  require('../../assets/images/banner2.jpg')},
                //     {"img":  require('../../assets/images/banner0.jpg')}
                //     ],
                grids:grids
            }
        },
        created() {
            // this.$axios.get('/xx').then(res=>{
            //       console.log(res)
            //     this.imgS-res.data
            // }).catch(err=>{
            //       console.log(res)
            // })
        }
    }
</script>

<style scoped>
    .swipe-contents {
        width: 100%;
        /*height: 180px;*/
        background-color: red;
    }

    .swipe-contents img {
        width: 100%;
        /*height: 180px;*/
        display: block;
    }

    /*九宫格*/
    .list{
        width: 100%;

    }
    .list ul{
        display: flex;
        flex-wrap: wrap;
    }
    .list ul li{
        width: 33.3%;
        height: 100px;
        text-align: center;
        font-size: 14px;
        margin-top: 20px;
    }
    .list ul li a{
        width: 50px;
        height: 50px;
        display: inline-block;
        margin: 0 auto;
    }
    .list ul li a img{
        width: 100%;
        height: 100%;
    }
    .list ul li p{

    }

    </style>