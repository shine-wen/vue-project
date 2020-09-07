<template>
    <div class="content">
        <div class="newsList">
            <ul>
                <li v-for="(item,index) in arrList">
                    <!--<router-link>-->
                    <h2>{{index+1}} . {{item.title}}</h2>
                    <p>{{item.detail}}</p>
                    <!--</router-link>-->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "follow",
        data() {
            return {
                arrList: []
            }
        },
        mounted() { //加载完
            this.fetchData();
        },
        methods: {
            fetchData() {
                var _this = this;

                this.$http.get('src/data/follow.data').then(function (res) {
                    console.log("就够恶日囧人人家光荣ij")
                  console.log(res)
                    _this.arrList = res.data
                }).catch(function (err) {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>