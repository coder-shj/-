<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 向子组件传递参数时，需要加上v-bind，不然传递过去的数值只会为String -->
    <better-scroll ref = "wrapper" 
      class = "content"
      :probe-type = "3"
      @scroll = "scroll"
      :pullUpLoad = "true"
      @pullingUp = "loadmore">
      <home-swiper :banners='banners'></home-swiper>
      <home-recommed-view :recommends='recommends'></home-recommed-view>
      <feature-view></feature-view>
      <tab-control @itemclick="tabclick" class="tab-control" :titles="['流行', '新款', '精选']"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </better-scroll>
    <back-top @click.native="topclick" class="backtop" v-show="showtop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childrenComps/HomeSwiper'
import HomeRecommedView from './childrenComps/HomeRecommedView'
import FeatureView from './childrenComps/FeatureView'

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/common/tabControl/TabControl.vue"
import GoodList from "components/content/goodList/GoodList"
import BetterScroll from "components/common/betterScroll/BetterScroll.vue"
import BackTop from "components/content/backTop/BackTop.vue"

import { getHomeMultidate, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommedView,
    FeatureView,
    TabControl,
    GoodList,
    BetterScroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.nowType].list
    }
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page:0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []}
      },
      nowType: 'pop',
      showtop: false
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidate()

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 3、监听item中图片加载完成
    // 不在created中做的原因：防止在better-scroll还未加载完成时，就调用此代码
    this.$bus.$on('itemImgLoad', () => {
      this.$refs.wrapper.refresh()
      console.log('----');
    })
  },
  methods: {
    /**
     * 监听事件相关的方法
     */
    topclick() {
      this.$refs.wrapper.scrollTo(0, 0)
    },
    tabclick(index) {
      switch(index) {
        case 0:
          this.nowType = 'pop'
        break;
        case 1:
          this.nowType = 'new'
        break;
        case 2:
          this.nowType = 'sell'
        break
      }
    },
    scroll(position) {
      this.showtop = position.y < -1000
    },
    loadmore() {
      this.getHomeGoods(this.nowType)
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidate() {
      getHomeMultidate().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // 扩展运算
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.wrapper.finishPullUp()
      })
    }
  }
};
</script>
// scoped实现作用域效果，在其内设置样式只在该组件内生效
<style scoped>
#home {
  /* padding-top: 43px; */
  height: 100vh;

  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  z-index: 9;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
}

/* 引用better-scroll后sticky属性不起作用，因为js原生滚动已经不在应用 */
/* .tab-control {
  position: sticky;
  top: 43px;
  z-index: 6;
} */

/* 方法一 */
/* .content {
  height: calc(
    100% - 93px
  );
  margin-top: 43px;
  overflow: hidden;
} */
/* 方法二 */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0%;
  right: 0%;
}
</style>
