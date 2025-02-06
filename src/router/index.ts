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
      }
      // 动态路由
      // {
      //   path: '/articles/:id',
      //   name: 'ArticleDetail',
      //   component: () => import('../views/ArticleDetail.vue'),
      //   children: [
      //     {
      //       path: 'comments',
      //       name: 'comments',
      //       component: () => import('../views/Comment.vue')
      //     }
      //   ]
      // }
      // 嵌套路由
      // {
      //   path: '/user',
      //   component: () => import('../views/UserDashboard.vue'),
      //   redirect: '/user/profile',
      //   children: [
      //     {
      //       path: 'profile',
      //       name: 'UserProfile',
      //       component: () => import('../views/UserProfile.vue')
      //     },
      //     {
      //       path: 'setting',
      //       name: 'UserSetting',
      //       component: () => import('../views/UserSetting.vue')
      //     }
      //   ]
      // }
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

// 导出路由对象
export default router
