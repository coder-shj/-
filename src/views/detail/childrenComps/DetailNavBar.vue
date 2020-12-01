<template>
  <div class="DetailNavBar">
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="item,index in titles" 
          class="title-item" 
          :class="{active: nowIndex == index}"
          @click="itemClick(index)"
        >
        {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        nowIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.nowIndex = index
        this.$emit('itemClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 15px;
  }
  .active {
    color: var(--color-tint);
  }
  .back {
    padding-top: 6px;
  }
</style>
