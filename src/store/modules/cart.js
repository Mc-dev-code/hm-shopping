
const state = () => {
  return {
    cartList: []
  }
}
const mutations = {
  setCartList (state, cartList) {
    state.cartList = cartList
  },
  toggleCheck (state, goodsId) {
    // 让对应的id的选中状态取反
    const index = state.cartList.findIndex((item) => {
      return item.goods_id === goodsId
    })
    state.cartList[index].isChecked = !state.cartList[index].isChecked
  },
  toggleAllCheck (state, flag) {
    // 处理全选框的逻辑, 让所有商品的选中框都跟随传过来的值true/false
    state.cartList.forEach(item => {
      item.isChecked = flag
    })
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
  },
  // 全选框的属性
  isAllChecked (state) {
    return state.cartList.every((item) => {
      return item.isChecked
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
