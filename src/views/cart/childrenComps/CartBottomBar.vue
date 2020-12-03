<template>
  <div class="CartBottomBar">
    <div class="check">
      <check-button class="check-button" @click.native="clickButton" :isChecked="checkedAll"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="goCalc">
      去计算&nbsp&nbsp({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      clickButton() {
        if(this.checkedAll) {
          this.cartList.forEach(element => element.isSelect = false);
        } else {
          this.cartList.forEach(item => item.isSelect = true)
        }
      },
      goCalc() {
        if(this.checkLength === 0){
          this.$toast.show('请选择需要计算的商品')
        } else {
          this.$toast.show('请支付' + this.totalPrice + '元')
        }
      }
    },
    computed: {
      ...mapGetters([
        'cartList'
      ]),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.isSelect
        }).reduce((preValue, item) => {
          return item.price * item.count + preValue
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => {
          return item.isSelect
        }).length
      },
      checkedAll() {
        if(this.cartList.length === 0) return false

        // 1、使用filter
        // return !(this.cartList.filter(item => !item.isSelect).length)
        // 2、使用find  较1更加快
        return !this.cartList.find(item => !item.isSelect)

        // 3、使用普通遍历
        // for(let item of this.cartList) {
        //   if(!item.isSelect) {
        //     return false
        //   }
        // }
        // return true
      }
    }
  };
</script>

// scoped实现作用域效果，在其内设置样式只在该组件内生效

<style scoped>
  .CartBottomBar {
    display: flex;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
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
    width: 100px;
    padding-left: 10px;
    background-color: red;
  }
</style>
