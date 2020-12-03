<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <better-scroll ref="scroll" class="content">
      <cart-list></cart-list>
    </better-scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
  
</template>

<script>
  import CartList from './childrenComps/CartList'
  import CartBottomBar from './childrenComps/CartBottomBar'

  import BetterScroll from "components/common/betterScroll/BetterScroll.vue"
  import NavBar from 'components/common/navbar/NavBar'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      BetterScroll,
      NavBar,
      CartList,
      CartBottomBar
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    computed: {
      // mapGetters的两种应用的方式
      // 一、数组方式：
      // ...mapGetters(['cartLength', 'cartList']),
      // 二、如果想要使用别名，则用对象的形式
      ...mapGetters({
        length: 'cartLength',
        cartList: 'cartList'
      })
    }
  };
</script>

<style scoped>
  .cart {
    height: 100%;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 89px;
    overflow: hidden;
  }
</style>
