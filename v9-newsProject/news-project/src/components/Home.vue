<template>
    <div id="home">
        <div class="content">
        <BannerView></BannerView>
        <div class="newsList">
            <ul>
                <li v-for="(item,index) in arrList">
                    <router-link :to="'/article/'+ item.id">
                        <h2>{{index+1}} . {{item.title}}</h2>
                        <p>{{item.detail}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        </div>
    </div>
</template>

<script>
    import BannerView from './Banner.vue'

    export default {
        name: "home",
        data(){
            return{
                 arrList:[]
            }
        },
        components: {
            BannerView
        },
        mounted() { //加载完
            this.fetchData();
        },
        methods: {
            fetchData() {
                var _this=this
                this.$http.get('src/data/index.data').then(function (res) {
                          console.log(res)
                    _this.arrList=res.data
                }).catch(function (err) {
                     console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>