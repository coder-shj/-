<template>
  <div class="detail">
    <detail-nav-bar class="detailnav"></detail-nav-bar>
    <better-scroll ref="wrapper" class="content">
      <detail-swipper :imgs="topImages"></detail-swipper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageload="imageload"/>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"/>
      <good-list :goods="recommends"></good-list>
    </better-scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childrenComps/DetailNavBar'
  import DetailSwipper from './childrenComps/DetailSwipper'
  import DetailBaseInfo from './childrenComps/DetailBaseInfo'
  import DetailShopInfo from './childrenComps/DetailShopInfo'
  import DetailGoodsInfo from './childrenComps/DetailGoodsInfo'
  import DetailParamInfo from './childrenComps/DetailParamInfo'
  import DetailCommentInfo from './childrenComps/DetailCommentInfo'

  import BetterScroll from "components/common/betterScroll/BetterScroll.vue"
  import GoodList from "components/content/goodList/GoodList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
  import {itemListenerMinxin} from 'common/mixin.js'

  export default {
    name: "detail",
    data() {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: []
      }
    },
    mixins: [itemListenerMinxin],
    components: {
      DetailNavBar,
      DetailSwipper,
      DetailBaseInfo,
      DetailShopInfo,
      BetterScroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList
    },
    created() {
      this.id = this.$route.params.id
      
      getDetail(this.id).then(res => {
        const data = res.result
        // 获取顶部轮播图的图片
        this.topImages = data.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品信息
        this.detailInfo = data.detailInfo

        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 去除评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.refresh)
    },
    methods: {
      imageload() {
        this.$refs.wrapper.refresh();
      }
    }
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>
.detailnav {
  position: relative;
  z-index: 9;
  background-color: white;
}
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(
    100% - 44px
  );
  /* height: 100px; */
}
</style>
