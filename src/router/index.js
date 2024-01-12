import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

const checkAuth = async () => {
  try {
    const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)VueToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    if (!cookie) {
      console.log('請重新登入')
      return false
    }
    const api = `${import.meta.env.VITE_BASE_API_URL}/v2/api/user/check`
    const response = await axios.post(api, {})
    console.log('檢查權限', response?.data?.success)
    return response?.data?.success
  } catch (error) {
    console.log(error?.response?.data?.message)
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      next({
        // 沒有權限直接返回首頁。
        path: '/'
      })
    } else {
      // 有權限就繼續行動。
      next()
    }
  } else {
    // 不需要驗證的路由就繼續執行。
    next()
  }
})

export default router
