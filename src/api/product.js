// 存放所有搜索商品相关的接口请求
import request from '@/utils/request'
// 商品列表
const getProListApi = (queryObj) => {
  const res = request({
    url: 'index.php?s=/api/goods/list',
    method: 'get',
    params: {
      categoryId: queryObj.categoryId,
      goodsName: queryObj.goodsName,
      page: queryObj.page
    }
  })
  return res
}
// 商品详情
const getGoodsDetailApi = (goodsId) => {
  const res = request({
    url: 'index.php?s=/api/goods/detail',
    methods: 'get',
    params: {
      goodsId: goodsId
    }
  })
  return res
}
// 商品评论
const getGoodsCommentApi = (queryObj) => {
  const res = request({
    url: 'index.php?s=/api/comment/listRows',
    methods: 'get',
    params: {
      goodsId: queryObj.goodsId,
      limit: queryObj.limit
    }
  })
  return res
}
export {
  getProListApi,
  getGoodsDetailApi,
  getGoodsCommentApi
}
