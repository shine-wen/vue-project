<template>
    <mt-swipe :auto="2500" class="swipe-contents" :style="{height:myHeight}">
        <mt-swipe-item v-for="(item,index) in imgS" :key="index">
            <img :src='item.img || item.src' alt="" />
        </mt-swipe-item>
    </mt-swipe>
    
</template>

<script>
    export default {
        name: "my-swiper",
        props:['url','myHeight'],
        data(){
            return{
                imgS: [
                    // {"img": require('../../assets/images/banner3.jpg')},
                    // {"img":  require('../../assets/images/banner1.jpg')},
                    // {"img":  require('../../assets/images/banner2.jpg')},
                    // {"img":  require('../../assets/images/banner0.jpg')}
                ],
            }
        },
        created(){
            this.$axios.get(this.url)
                .then(res=>{
                     this.imgS=res.data.list;
                })
                .catch(err=>{
                    console.log('轮播图异常：'+err)
                })
        }
    }
</script>

<style scoped>
    img{
        width: 100%;
        height: 100%;
    }

</style>