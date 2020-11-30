import { debounce } from "common/utils.js";

// 混入：和原来的代码中混合在一起，不是取代
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