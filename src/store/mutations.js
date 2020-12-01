import {
  ADDCOUNTER,
  ADDTOCART
} from './mutations-types.js'

export default {
  // mutations的唯一目的是为了修改state中的状态
  // mutations中的每个方法尽可能完成的时间单一一点
  [ADDCOUNTER](state, payload) {
    payload.count++
  },
  [ADDTOCART](state, payload) {
    state.cartList.push(payload)
  }
}