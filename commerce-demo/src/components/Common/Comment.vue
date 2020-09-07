<template>
    <div class="tmp1">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div class="">
                        <span>提交评论</span>
                        <span><a href="javascript:void(0)">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols="50" rows="10" v-model="commentContent"></textarea>
                </li>
                <li class="btn" @click="commentHandler">
                    发表评论按钮
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(item,index) in commentList" :key="index">
                 <span style="color: #26a2ff">{{item.canme}}</span> : {{item.content}}
                    <span style="color:#ff0000">{{item.time}}</span>
                </li>

            </ul>
              <div class="btn more" @click="loadmMre(page)">
                  加载更多按钮
              </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "comment",
        props: ['cid'],
        data() {
            return {
                commentList:[],
                page:1,//进来默认第一页数据 分页效果
                commentContent:''
            }
        },
        methods:{
            //提交评论数据
            commentHandler(){
                this.$axios.post(`http://localhost:8085/postcomments/${this.cid}`,`content=`+this.commentContent)
                    .then(res=>{
                        let txt=res.data.list;
                        txt.content=this.commentContent;
                        // reverse 将 数组倒序 用于当前评论显示在第一条
                        this.commentList=this.commentList.concat(txt).reverse();
                        //清空文本框
                        this.commentContent='';
                    })
                    .catch(err=>{
                        console.log("提交评论失败："+err)
                    })
            },
            //加载更多数据
            loadmMre(page){
                this.$axios.get(`http://localhost:8085/getcomments/${this.cid}?pageindex=${this.page}`)
                    .then(res => {
                        console.log(res.data.list)
                        //模拟没有数据  page=4 判断没有数据提示效果
                        if(page==4){
                            this.$toast('没有更多数据了!');
                            return;
                        }
                        //判断 有参数，表明是点击获取更多按钮的，没有侧 是进来首次获取数据
                        if(page){
                            this.commentList=this.commentList.concat(res.data.list)
                        }else {
                            this.commentList=res.data.list
                        }

                        //加载后 页面 自增1页;
                        this.page++;
                    })
                    .catch(err=>{
                        console.log("获取分页数据失败"+err)
                    })
            }
        },
        created() {
            let page = this.$route.query.id || '1';
             this.loadmMre();
        }
    }
</script>

<style scoped>
    .tmp1 {
        padding-bottom: 100px;
    }

    .pthoto-comment > div span:nth-child(1) {
        float: left;
        font-weight: bold;
        margin-left: 5px;

    }

    .photo-comment > div span:nth-child(2) {
        float: right;
    }

    .photo-comment {
        height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        line-height: 30px;
        margin-bottom: 5px;

    }

    .txt-comment {
        padding: 5.5px;
    }

    .txt-comment textarea {
        margin-bottom: 5px;
    }

    .comment-list li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 5px;
        padding-left: 5px;
        padding-bottom: 5px;
        width: 100%;
        box-sizing: border-box;
        word-wrap:break-word;
        word-break: break-all;
        overflow: hidden;
        padding: 4px 12px;
    }

    li {
        list-style: none;
    }

    ul {
        margin: 0;
        padding: 0;

    }

    textarea {
        width: 100%;
        border: 1px solid #333;
    }
    .btn{
        width: 90%;
        margin: 20px auto;
        height: 36px;
        line-height: 36px;
        background-color: #26a2ff;
        color: #fff;
        text-align: center;
        border-radius: 4px;
    }
    .more{
        background-color: #fe552e;
    }
</style>