<template>
    <div class="detail">
<!--{{detail}}-->
        <Navbar :title="title"></Navbar>
        <div class="item">
            <p> {{detail.title}}</p>
            <div>
                <span> {{detail.click}}次点击</span>
                <span>分类：名商紧急</span>
                <span>添加时间： {{detail.time | formatTime("YYYY-MM-DD")}}</span>
            </div>
        </div>
        <div class="divider"></div>
        <div class="detail-content" v-html="detail.content"></div>
    </div>

</template>

<script>
    export default {
        name: "news-detail",
        props:['title'],
        data(){
            return{
                detail:{}
            }
        },
        created(){
            var _this=this;
           let id=this.$route.query.id;
             this.$axios.get('../../static/data/newsDetail.data').then(function (res) {
                 _this.detail=res.data[0];
                      console.log(_this.detail)
                 }).catch( function (err) {
                     console.log("新闻详情异常",err)
                 })
        } ,
        methods:{

        }
    }
</script>

<style scoped>
    .detail{
        padding-bottom: 100px;
    }
    .item p{
        color: #66CCFF;
        font-size: 24px;
        font-weight: 600;
    }
    .item span{
        margin-right: 20px;
        color: #999999;
    }
    .divider{
        width: 100%;
        height: 1px;
        background-color: #b3b3b3;
        margin: 5px 0;
    }
    .detail-content{
        padding: 3px;
    }
</style>