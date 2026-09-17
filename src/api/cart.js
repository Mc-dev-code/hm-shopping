// 添加商品到购物车
import request from '@/utils/request'

const addCartApi = (queryObj) => {
  const res = request({
    url: 'index.php?s=/api/cart/add',
    method: 'post',
    headers: {
      'Access-Token': queryObj.token
    },
    data: {
      goodsId: queryObj.goodsId, // 商品ID
      goodsNum: queryObj.goodsNum, // 商品数量
      goodsSkuId: queryObj.goodsSkuId // 商品SKUID(可选)
    }
  })
  return res
}
// 购物车商品列表
const getShoppingCartListApi = (queryObj) => {
  const res = request({
    url: 'index.php?s=/api/cart/list',
    method: 'get',
    headers: {
      'Access-Token': queryObj.token
    }
  })
  return res
}
// 购物车商品更新提交后台
const cartListUpdateApi = (queryObj) => {
  const res = request({
    url: 'index.php?s=/api/cart/update',
    method: 'post',
    headers: {
      'Access-Token': queryObj.token
    },
    data: {
      goodsId: queryObj.goodsId,
      goodsNum: queryObj.goodsNum,
      goodsSkuId: queryObj.goodsSkuId
    }
  })
  return res
}
export {
  addCartApi,
  getShoppingCartListApi,
  cartListUpdateApi
}
