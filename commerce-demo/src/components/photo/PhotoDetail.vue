<template>
    <div>
        <navbar title="图文详情"></navbar>
        <div class="photo-title">
            <p>{{imageInfo.title}}</p>
            <span>发起日期:{{imageInfo.time}}</span>
            <span>{{imageInfo.click}}次浏览</span>


            <!--<ul  class="img-content">-->
                <!--<li v-for="(item,index) in thumImage" :key="index"><a href="javascriptLvoid(0)"><img :src="item.msrc" alt=""></a></li>-->
            <!--</ul>-->
            <vue-preview :slides="thumImage" @close="handleClose"></vue-preview>


            <div class="photo-desc">
                <p v-html="imageInfo.content"></p>
            </div>
            <comment :cid='$route.query.id'/>
        </div>
    </div>


</template>

<script>
    export default {
        name: "photo-detail",
        data(){
            return{
                imageInfo:{},
                thumImage:[]
            }
        },
        methods:{
            //关闭图片查看器
            handleClose () {
                console.log('close event')
            }
        },
        created(){
            let id=this.$route.query.id;
            // axios现实多个请求
            // var _this=this
            var getImageInfo= ()=> {
                 //console.log(this);//this undefined  如果使用普通函数声明 this undefine 建议使用 箭头函数改变this 指向
                return this.$axios.get('http://localhost:8085/getimageinfo');
            }

            var  getThumImages= ()=> {
                return this.$axios.get('http://localhost:8085/getthumimages');
            }

            this.$axios.all([getImageInfo(), getThumImages()])
                .then(this.$axios.spread( (acct, perms)=> {
                    // 两个请求现在都执行完成
                    // console.log(acct.data.list[0])
                    this.imageInfo=acct.data.list[0];
                    this.thumImage=perms.data.list;
                })).catch(function (err) {
                    console.log(err)
            });
        }
    }
</script>

<style scoped>
    .photo-title p{
        font-size: 20px;
        color: #0f80ff;
        margin: 15px 0;
        font-weight: 600;
        padding: 0 15px;
    }

    .photo-title span{
        padding: 10px 15px;
    }
    .img-content{
        display: block;
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .img-content li{
        float: left;
        width: 33%;
        margin-right:0.3%;
        margin-bottom: 0.3%;
    }
    .img-content li img{
        width: 100%;
        height: 100px;
        display: block;
    }

    .photo-desc p{
         color: #333333;
        font-size: 18px;
        padding: 0 15px;
        letter-spacing: 1px;
    }
</style>