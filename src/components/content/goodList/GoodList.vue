<template>
    <div class="GoodList">
      <good-list-item v-for="item,index in goods" :goodsitem="item" :key="index"/>
    </div>
</template>

<script>
  import GoodListItem from "./GoodListItem.vue"
  export default {
    name: "GoodList",
    props: {
      goods: {
        type: Array,
        default: []
      }
    },
    components: {
      GoodListItem
    }
  };
</script>

<style scoped>
  .GoodList {
    display: flex;
    
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
