<template>
      <div>
          <Navbar title="商品评论"></Navbar>
          <comment :cid="$route.query.id" />
      </div>
</template>

<script>
    export default {
        name: "goods-comment"
    }
</script>

<style scoped>

</style>