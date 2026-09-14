// 存放所有搜索商品相关的接口请求
import request from '@/utils/request'
const getProListApi = (obj) => {
  const res = request({
    url: 'index.php?s=/api/goods/list',
    method: 'get',
    params: {
      categoryId: obj.categoryId,
      goodsName: obj.goodsName,
      page: obj.page
    }
  })
  return res
}
export {
  getProListApi
}
