<template>
  <div class="detail">
    <detail-nav-bar ref="navbar" class="detailnav" @itemClick="itemClick"></detail-nav-bar>
    <better-scroll ref="wrapper" class="content" :probeType="3" @scroll="scroll">
      <detail-swipper :imgs="topImages"></detail-swipper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageload="imageload"/>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </better-scroll>
    <detail-bottom-bar @cartAdd="cartAdd"></detail-bottom-bar>
    <back-top @click.native="topclick"  class="backtop" v-show="showtop"></back-top>
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
  import DetailBottomBar from './childrenComps/DetailBottomBar'

  import BetterScroll from "components/common/betterScroll/BetterScroll.vue"
  import GoodList from "components/content/goodList/GoodList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
  import {itemListenerMinxin} from 'common/mixin.js'
  import {debounce} from 'common/utils.js'
  import {BackTopMixin} from 'common/mixin.js'

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
        recommends: [],
        themeTopY:[],
        refresh: null,
        getY: null,
        nowindex: 0
      }
    },
    mixins: [itemListenerMinxin, BackTopMixin],
    components: {
      DetailNavBar,
      DetailSwipper,
      DetailBaseInfo,
      DetailShopInfo,
      BetterScroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      DetailBottomBar
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

        // 获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 在这里直接获取offsetTop的值，是错误的
        // 因为在这里$el还没有渲染

        this.$nextTick(() => {
          // 在这里获取offsetTop的值，依旧是错误的
          // 根据最新的数据，对应的DOM是已经被渲染了出来
          // 但是图片依旧没有加载完（所获取到的offsetTop不包含其中的图片）
          // offsetTop值不对的时候，都是因为图片的问题
        })
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.refresh = debounce(() =>{
        this.$refs.wrapper.refresh();
      }, 100)

      this.getY = debounce(() => {
        this.themeTopY = [];
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.param.$el.offsetTop -44)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopY.push(Number.MAX_VALUE)
      }, 100)
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.refresh)
    },
    methods: {
      cartAdd() {
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newprice
        product.iid = this.id

        this.$store.dispatch('addCart', product)
      }
      ,imageload() {
        // 刷新betterscroll
        this.refresh()
        // 获取组建的Y值
        this.getY()
      },
      itemClick(index) {
        this.$refs.wrapper.scrollTo(0, -this.themeTopY[index])
      },
      scroll(position) {
        const positionY = -position.y
        const length = this.themeTopY.length
        for(let i = 0 ; i < length -1 ; i++){
          if(this.nowindex !== i && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1]){
            this.nowindex = i
            this.$refs.navbar.nowIndex = this.nowindex
          }
        }

        // 判断backTop是否显示
        this.showtop = position.y < -1000;
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
    100% - 102px
  );
  /* height: 100px; */
}
.backtop {
  position: absolute;
  right: 8px;
  bottom: 55px;
}
</style>
