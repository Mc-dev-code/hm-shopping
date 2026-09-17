import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  // getters 是计算属性, 在外面使用 store.getters.getToken
  getters: {
    // 封装一个全局的获取token的函数
    getToken (state) {
      return state.user.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
