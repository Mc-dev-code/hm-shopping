// 存放分类商品信息的请求
import request from '@/utils/request.js'

const getCategoryDataApi = () => {
  const res = request({
    url: 'index.php?s=/api/category/list',
    method: 'get'
  })
  return res
}
export {
  getCategoryDataApi
}
