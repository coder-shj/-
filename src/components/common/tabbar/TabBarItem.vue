<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isactive"><slot name="item-icon"></slot></div>
    
    <div v-else><slot name="item-icon-active"></slot></div>
    
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    
    <!-- <img src="../../assets/img/tabbar/home.svg">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    isactive() {
      //判断活跃的route和当前的path是否相同
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isactive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemclick() {
      this.$router.push(this.path)
    }
  }
}
</script>

<style>
.tab-bar-item {
  /* 使每个某块都有相同长度（弹性盒子） */
  flex: 1;

  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  margin-top: 3px;
  height: 24px;
  width: 24px;
  /* 去除图片下自动添加的像素值 */
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
