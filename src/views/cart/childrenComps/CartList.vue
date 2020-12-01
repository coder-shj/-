<template>
  <div class="CartList">
    <cart-list-item v-for="(item, index) in cartList" :itemInfo="item" :key="index"/>
  </div>
</template>

<script>
  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components: {
      CartListItem
    },
    computed: {
      ...mapGetters([
        'cartList'
      ])
    }
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>

</style>
