import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '../../api/user/UserModel' // 导入 User 类型
// 定义 store
export const useUserStore = defineStore(
  'userStore',
  () => {
    const userId = ref('')
    const token = ref('')
    const userInfo = ref<UserInfo | null>(null)
    const isFetching = ref(false)
    const avatar = ref('')
    const nickname = ref('')
    const setUser = (newUser: UserInfo) => {
      userInfo.value = newUser
    }

    const setUserId = (newUserId: string) => {
      userId.value = newUserId
    }

    const setToken = (newToken: string) => {
      token.value = newToken
    }
    const setAvatar = (newAvatar: string) => {
      avatar.value = newAvatar
    }
    const setNickname = (newNickname: string) => {
      nickname.value = newNickname
    }
    // 重置状态的方法
    const reset = () => {
      userId.value = ''
      token.value = ''
      userInfo.value = null
      isFetching.value = false // 根据需要重置其他状态
    }

    // 定义计算属性
    const getUserInfo = computed(() => userInfo.value)

    // 返回状态和方法
    return {
      userId,
      token,
      userInfo,
      isFetching,
      getUserInfo,
      nickname,
      avatar,
      setNickname,
      setAvatar,
      setUser,
      setUserId,
      setToken,
      reset // 添加重置方法
    }
  },
  {
    persist: true // 启用持久化
  }
)
