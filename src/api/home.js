import request from '@/utils/request.js'
// 存放首页的请求
const getHomeDataApi = () => {
  const res = request({
    url: 'index.php?s=/api/page/detail',
    method: 'get',
    params: {
      pageId: '0'
    }
  })
  return res
}

export { getHomeDataApi }
