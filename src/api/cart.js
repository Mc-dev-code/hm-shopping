// 添加商品到购物车
import request from '@/utils/request'

const addCartApi = (params) => {
  const res = request({
    url: 'index.php?s=/api/cart/add',
    method: 'post',
    headers: {
      'Access-Token': params.token
    },
    data: {
      goodsId: params.goodsId, // 商品ID
      goodsNum: params.goodsNum, // 商品数量
      goodsSkuId: params.goodsSkuId // 商品SKUID(可选)
    }
  })
  return res
}
// 购物车商品列表
const getShoppingCartListApi = (params) => {
  const res = request({
    url: 'index.php?s=/api/cart/list',
    method: 'get',
    headers: {
      'Access-Token': params.token
    }
  })
  return res
}
export {
  addCartApi,
  getShoppingCartListApi
}
