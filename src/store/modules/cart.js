
const state = () => {
  return {
    cartList: []
  }
}
const mutations = {
  setCartList (state, cartList) {
    state.cartList = cartList
  }
}
const actions = {}
const getters = {
  // 购物车里的所有商品数量
  cartTotal (state) {
    return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
  },
  // 选中的商品项
  selCartList (state) {
    return state.cartList.filter((item) => { return item.isChecked })
  },
  // 选中的商品总数
  selCount (state, getters) {
    return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
  },
  // 选中的商品总价
  selPrice (state, getters) {
    return getters.selCartList.reduce((sum, item) => {
      return (sum + item.goods.goods_price_min * item.goods_num)
    }, 0).toFixed(2)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
