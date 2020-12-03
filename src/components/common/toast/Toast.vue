<template>
  <div class="Toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isshow: false
      }
    },
    methods: {
      show(message, duration=1500) {
        this.isshow = true;
        this.message = message
        setTimeout(() => {
          this.isshow = false
          this.message = ''
        }, duration);
      }
    }
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>
  .Toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 5px;
    border-radius: 5px;
    font-size: 15px;

    z-index: 999;

    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
