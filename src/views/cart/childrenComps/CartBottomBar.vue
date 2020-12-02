<template>
  <div class="CartBottomBar">
    <div class="check">
      <check-button class="check-button" @click.native="clickButton" :isChecked="checked"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: "CartBottomBar",
    data() {
      return {
        checked: true
      }
    },
    components: {
      CheckButton
    },
    methods: {
      clickButton() {
        this.checked = !this.checked
      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.isSelect
        }).reduce((preValue, item) => {
          return item.price * item.count + preValue
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => {
          return item.isSelect
        }).length
      }
    }
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>
  .CartBottomBar {
    display: flex;
    line-height: 44px;
    height: 44px;
    background-color: #eee;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 49px;
  }
  .check {
    display: flex;
    align-items: center;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-right: 3px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 80px;
    background-color: red;
  }
</style>
