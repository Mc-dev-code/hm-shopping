<template>
  <div id="app">
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" router>
      <van-tabbar-item name="home" to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item name="search" to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item name="friends" to="cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item name="setting" to="user" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 'home'
    }
  }
}
</script>
<style lang="less">

</style>
