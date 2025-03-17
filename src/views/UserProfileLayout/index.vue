<template>
  <div class="box">
    <!-- 导航栏 -->
    <Navbar />
    <div
      class="flex-col justify-center items-center relative absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#c3e8fe] to-[rgba(233,233,233,0)]"
    >
      <!-- 空间名和等级 -->
      <Title />
      <!-- 主体内容 -->
      <router-view />
      <!-- 背景图 -->
      <div class="absolute inset-0 bg-banner-gradient w-300 h-120"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Title from './components/Title.vue'
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

<style scoped>
/* 渐变背景 */
.bg-banner-gradient {
  background:
    /* 下方渐变 */
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 70%,
      rgba(255, 255, 255, 1) 100%
    ),
    /* 左右渐变 */
      linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 1) 100%
      ),
    /* 背景图 */ url('@/assets/images/banner-bg.jpg') no-repeat center / cover;
  z-index: -666;
  position: absolute;
  inset: 0;
}
</style>
