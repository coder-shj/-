<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSscroll, { PullUpLoad } from "better-scroll";

export default {
  name: "BetterScroll",
  data() {
    return {
      bscroll: null,
    };
  },
  methods: {
    scrollTo(x, y, time = 400) {
      //time给予默认值300
      // scrollTo中有三个参数x,y,time(毫秒)
      // 判断下bscroll是否加载完成，决定是否执行此代码
      this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.bscroll.finishPullUp();
    },
    refresh() {
      // console.log('------');
      this.bscroll && this.bscroll.refresh();
    },
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 1、创建bscroll对象
    this.bscroll = new BSscroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
    });

    // 2、监听滚动位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.bscroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    // 3、上拉加载更多
    if (this.pullUpLoad) {
      this.bscroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        console.log("监听滚动到底部");
      });
    }
  },
};
</script>

<style scoped>
</style>
