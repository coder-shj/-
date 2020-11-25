<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <home-recommed-view :recommends='recommends'></home-recommed-view>
    <feature-view></feature-view>
    <tab-control @itemclick="tabclick" class="tab-control" :titles="['流行', '新款', '精选']"></tab-control>
    <good-list :goods="showGoods"></good-list>

  </div>
</template>

<script>
import HomeSwiper from './childrenComps/HomeSwiper'
import HomeRecommedView from './childrenComps/HomeRecommedView'
import FeatureView from './childrenComps/FeatureView'

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/common/tabControl/TabControl.vue"
import GoodList from "components/content/goodList/GoodList"

import { getHomeMultidate, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommedView,
    FeatureView,
    TabControl,
    GoodList
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
      nowType: 'pop'
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidate()

    // 请求商品数据1
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  methods: {
    /**
     * 网络请求相关的方法
     */
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
    /**
     * 网络请求相关的方法
     */
    getHomeMultidate() {
      getHomeMultidate().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        // console.log(this.banners);
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        // 扩展运算
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // console.log(this.goods[type]);
      })
    }
  }
};
</script>

<style>
#home {
  padding-top: 43px;
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
.tab-control {
  position: sticky;
  top: 43px;
  z-index: 6;
}
</style>
