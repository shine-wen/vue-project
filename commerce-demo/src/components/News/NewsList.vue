<template>
     <div class="news">
         <Navbar title="新闻列表"></Navbar>
           <div class="newList">
               <ul>
                   <li v-for='(news,index) in newsList':key="news.id">
                       <router-link  :to='{name:"detail",query:{id:news.id}}'>
                           <div class="new_img">
                               <img  v-lazy="news.img_url" alt="">
                           </div>
                           <div class="content">
                               <p class="title">{{news.title}}</p>
                                <div class="news-desc">
                                    <p class="summary">{{news.content}}</p>
                                     <p>
                                         <span class="praise">点赞数:{{news.click}}</span>
                                          <span class="time">发表时间:{{news.time | formatTime("YYYY-MM-DD")}}</span>
                                     </p>
                                </div>

                           </div>
                       </router-link>
                       
                   </li>
               </ul>
           </div>  
     </div>
</template>

<script>
    export default {
        name: "news-list",
        data(){
            return{
                newsList:[]
            }
        },
        created() {
            var _this=this
            this.$axios.get('../../static/data/newsList.data').then(function (res) {
                 _this.newsList=res.data
            }).catch(function (err) {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .news{
        /*padding-top: 41px;*/
        /*padding-bottom: 55px;*/
    }
    .newList{
        width: 100%;
        border-bottom: 1px solid #ccc;
        font-size: 12px;
        padding-bottom: 100px;
    }
    .newList ul li{
        position: relative;
    }
    .newList ul li a{
        display: block;
        width: 100%;
        height: 150px;
        color: #888888;
        display: flex;

    }
    .new_img{
        width: 30%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
     .newList ul li a img{
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .content{
        padding: 0 10px;
    }
    .content .title{
        font-size: 15px;
        display: inline-block;
        color: #131f3c;
        letter-spacing: 1px;
        padding-bottom: 7px;
        margin-top: 10px;
    }

    .content .news-desc{
        /*margin-top: 20px;*/
    }
    .news-desc span{
        color: #ff6700;
    }
    .summary{
        padding: 5px 0;
    }
    .time{
        margin-left: 30px;
    }
</style>