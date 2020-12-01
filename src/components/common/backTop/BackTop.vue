<template>
  <div class="BackTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>
.BackTop img {
  height: 50px;
}
</style>
