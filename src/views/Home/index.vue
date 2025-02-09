<template>
  <div class="">
    <!-- 主体内容 -->
    <Banner />
  </div>
</template>

<script setup lang="ts">
import Banner from './components/Banner.vue'
import { onMounted } from 'vue'
import { getInfoApi } from '../../api/user/index.ts'
import { useUserStore } from '../../store/user/index.ts'

// 获取用户 Store
const store = useUserStore()

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const response = await getInfoApi()
    if (response.code === 0) {
      // 更新 Store 中的用户信息
      store.setUser(response.data)
      store.setAvatar(response.data.avatar)
      store.setNickname(response.data.nickname)
    } else {
      console.error('获取用户信息失败:', response.msg)
    }
  } catch (error) {
    console.error('调用用户信息接口时出错:', error)
  }
}

// 组件加载时调用获取用户信息
onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped></style>
