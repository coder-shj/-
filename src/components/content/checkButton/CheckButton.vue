<template>
  <div class="CheckButton" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>
  .CheckButton {
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  .check {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
