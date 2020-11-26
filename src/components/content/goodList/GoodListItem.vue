<template>
    <div class="GoodListItem">
      <img :src="goodsitem.show.img" alt="" @load="imgLoad">
      <div class="goodinfo">
        <p class="collect">{{goodsitem.title}}</p>
        <span class="price">{{goodsitem.price}}</span>
        <span class="collect">{{goodsitem.cfav}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props: {
      goodsitem: {
        type: Object,
        default: {}
      }
    },
    methods: {
      imgLoad() {
        // 事件总线
        this.$bus.$emit('itemImgLoad')
      }
    }
  };
</script>

<style scoped>
  .GoodListItem {
    padding-bottom: 40px;
    position: relative;
    width: 47%;
  }
  .GoodListItem img {
    width: 100%;
    border-radius: 5px;
  }
  .goodinfo {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goodinfo p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goodinfo .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goodinfo .collect {
    position: relative;
  }
  .goodinfo .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
