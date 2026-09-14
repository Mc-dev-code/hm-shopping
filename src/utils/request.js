// 引入axios
import axios from 'axios'
import { Toast } from 'vant'
// 创建一个axios实例,不希望污染原始的axios
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在请求发送之前执行某些操作
    // 加载提示,背景点击禁用
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
    return config
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 状态码在 2xx 范围内的响应会触发此函数
    // 处理响应数据
    const res = response.data
    if (res.status !== 200) {
      // 1.给提示
      Toast(res.message)
      // 2.抛出一个错误的promise异常
      return Promise.reject(res.message)
    } else {
      // 返回正确就走这里,并关闭加载动画
      Toast.clear()
    }
    return response
  },
  function (error) {
    // 状态码不在 2xx 范围内的响应会触发此函数
    // 处理响应错误
    return Promise.reject(error)
  }
)
export default instance
