<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BSscroll, { PullUpLoad } from 'better-scroll'

  export default {
    name: "BetterScroll",
    data() {
      return {
        bscroll: null
      }
    },
    methods: {
      scrollTo(x, y, time = 500) {  //time给予默认值300
      // scrollTo中有三个参数x,y,time(毫秒)
        this.bscroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.bscroll.finishPullUp()
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 1、创建bscroll对象
      this.bscroll = new BSscroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 2、监听滚动位置
      this.bscroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 3、上拉加载更多
      this.bscroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  };
</script>

<style scoped>

</style>
