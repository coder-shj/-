import {
  ADDCOUNTER,
  ADDTOCART
}from './mutations-types.js'

export default {
  addCart(context, payload) {
    // 方法一
    // let oldProduct = null
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // if(oldProduct) {
    //   oldProduct.count += 1
    // }else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }

    // 方法二
    // find函数，当返回值为true时，返回该item
    // let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // if (oldProduct) {
    //   context.commit(ADDCOUNTER, oldProduct)
    // } else {
    //   context.commit(ADDTOCART, payload)
    // }

    // 包装个Promise
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADDCOUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        context.commit(ADDTOCART, payload)
        resolve('商品已添加到购物车')
      }
    })
  }
}