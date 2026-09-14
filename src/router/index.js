import Vue from 'vue'
import VueRouter from 'vue-router'
// 配置路由可以写到文件夹,如果里面是index.vue的话,也可以写到具体的vue文件
import LoginPage from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/searchList.vue'
import MyOrder from '@/views/myorder/index.vue'
import Pay from '@/views/pay/index.vue'
import ProDetail from '@/views/prodetail/index.vue'
import Home from '@/views/layout/home.vue'
import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'
import User from '@/views/layout/user.vue'
import NotFind from '@/views/notFind/notFind.vue'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFind
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'cart', component: Cart },
      { path: 'category', component: Category },
      { path: 'user', component: User }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/myorder',
    component: MyOrder
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/prodetail',
    component: ProDetail
  }
]

const router = new VueRouter({
  routes
})
// 定义一个数组,专门存放需要权限访问的页面
const authUrl = ['/pay', '/myorder']
// 配置全局导航守卫
router.beforeEach((to, from, next) => {
  // 每个守卫方法接收两个参数：
  // to: 即将要进入的目标
  // from: 当前导航正要离开的路由
  // 返回 false 以取消导航
  if (authUrl.includes(to.path)) {
    // 需要权限的页面,做判断
    const token = store.getters.getToken
    // console.log(token)
    // 权限的处理逻辑
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 不需要权限的页面,放行
    next()
  }
})
export default router
