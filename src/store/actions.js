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
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct) {
      context.commit(ADDCOUNTER, oldProduct)
    } else {
      payload.count = 1
      context.commit(ADDTOCART, payload)
    }
  }
}