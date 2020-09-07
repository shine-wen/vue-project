<template>
    <div class="title-msg">
        <div class="title-box">
            <div class="mar-bt main-heading">{{title}}</div>
            <div class="mar-bt sub-heading">{{des}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header-des",
        props:['title','des'],
        data(){
            return{
                msg:'这是每个页面上,子组件的文字说明'
            }
        }
    }
</script>

<style scoped>
    /*顶部说明*/
    .title-msg{
        margin: 0 -20px 16px -20px;
    }
    .title-msg  .title-box{
        padding: 16px 32px 0 32px;
        background: #fff;
        border-bottom: 1px solid #e8eaec;
        display: flex;
        flex-direction: column;
    }
    .title-box  .mar-bt{
        margin-bottom: 16px;
        display: inline-block;
        color: #17233d;
        font-weight: 500;
    }
    .main-heading{
        font-size: 20px;
    }
    .sub-heading{
        font-size: 14px;
    }

</style>