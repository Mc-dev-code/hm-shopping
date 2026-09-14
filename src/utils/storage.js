// 1.设置一个通用的键名
const INFO_KEY = 'hm_shopping_user_info'
const HISTORY_KEY = 'hm_history_list'
// 获取个人信息
const getInfo = () => {
  // 如果后台没有就返回空
  const defaultObj = { userId: '', token: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}
// 设置个人信息
const setInfo = (user) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(user))
}
// 移除个人信息
const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
// 获取搜索历史
const getHistory = () => {
  const history = localStorage.getItem(HISTORY_KEY)
  return JSON.parse(history)
}
// 存储搜索历史
const setHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, history)
}
// 移除搜索历史
const emptyHistory = () => {
  localStorage.removeItem(HISTORY_KEY)
}
export {
  getInfo,
  setInfo,
  removeInfo,
  getHistory,
  setHistory,
  emptyHistory
}
