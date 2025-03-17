import { createRouter, createWebHistory } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '../store/user'

// 引入组件
import Layout from '../views/Layout/index.vue'

// 定义路由数组
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home/index.vue')
      },
      {
        path: '/main',
        name: 'Main',
        component: () => import('../views/Main/index.vue')
      },
      {
        path: '/msgBoard',
        name: 'MsgBoard',
        component: () => import('../views/MsgBoard/index.vue')
      },
      {
        path: '/album',
        name: 'Album',
        component: () => import('../views/Album/index.vue')
      },
      {
        path: '/album/:id',
        name: 'AlbumDetail',
        component: () => import('../views/Album/album.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'UserProfileLayout',
    component: () => import('../views/UserProfileLayout/index.vue'),
    redirect: '/user',
    children: [
      {
        path: ':id',
        name: 'UserProfile',
        component: () => import('../views/UserProfile/UserProfile.vue'),
        meta: { requiresUserProfileLayout: true }
      },
      {
        path: ':id/album',
        name: 'UserAlbum',
        component: () => import('../views/UserAlbum/index.vue'),
        meta: { requiresUserProfileLayout: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  }
]

// 创建并导出路由实例
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.token !== ''

  if (!isLoggedIn && to.name !== 'Login') {
    message.error('请先登录')
    next({ name: 'Login' })
  } else {
    next()
  }
})

// 路由跳转后滚动到顶部
router.afterEach((to, from) => {
  // 使用 window.scrollTo 将页面滚动到顶部
  window.scrollTo(0, 0)
})

// 导出路由对象
export default router
