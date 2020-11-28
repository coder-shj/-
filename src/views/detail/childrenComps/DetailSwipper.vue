<template>
  <div class="DetailSwipper">
    <swiper class="detail-swiper">
      <swiper-item v-for="item,index in imgs" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwipper",
    props: {
      imgs: {
        type: Array,
        default: []
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>
  .detail-swiper {
    height: 400px;
  }
</style>
