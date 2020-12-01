import { debounce } from "common/utils.js";
import BackTop from "components/common/backTop/BackTop.vue";

// 混入：和原来的代码中混合在一起，不是取代
// 生命周期内的代码会与mixin中的混合，如果是vue中methods中的代码，不会进行混入，只能加入一个新的methods中的方法
export const itemListenerMinxin = {
  data() {
    return {
      refresh: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.wrapper.refresh)
    this.refresh = () => {
      refresh();
    }
    this.$bus.$on('itemImgLoad', this.refresh)
    // console.log('我是混入中的内容');
  }
}

export const BackTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      showtop: false,
    }
  },
  methods: {
    topclick() {
      this.$refs.wrapper.scrollTo(0, 0);
    },
  }
}