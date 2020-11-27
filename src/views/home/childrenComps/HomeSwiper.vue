<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        isload: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imgload() {
        if(!this.isload){
          this.$emit('swiperload')
          this.isload = true
        }
      }
    }
  };
</script>

<style scoped>

</style>
