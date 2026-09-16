import { setInfo, getInfo } from '@/utils/storage'

const state = () => {
  const user = getInfo()
  return user
}
const mutations = {
  setUser (state, user) {
    state.user = user
    setInfo(state.user)
    // console.log(state.user)
  }

}
const actions = {}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
