<!-- Navbar.vue -->
<template>
  <div
    class="w-auto bg-[#04b1cc] px-50 flex justify-between items-center"
    @click="goToHome"
  >
    <!-- 导航栏左侧 -->
    <div class="flex">
      <!-- logo -->
      <div class="flex items-center p-2 cursor-pointer">
        <img
          src="https://first-buckt.oss-cn-nanjing.aliyuncs.com/2025/01/23/QQ%E7%A9%BA%E9%97%B4.png"
          mode="scaleToFill"
          class="w-8 h-8"
        />
        <div class="text-xl text-white">QQ空间</div>
      </div>
      <!-- 我的主页 -->
      <div class="flex items-center px-2 h-auto cursor-pointer">
        <div class="iconfont icon-home_before mr-1 text-white"></div>
        <div class="text-base text-white">他的主页</div>
      </div>
      <!-- 好友 -->
      <div class="flex items-center px-2 h-auto cursor-pointer">
        <div class="iconfont icon-31haoyou mr-1 font-bold text-white"></div>
        <div class="text-base text-white">他的动态</div>
      </div>
      <!-- 亲密度 -->
      <div class="flex items-center px-2 h-auto cursor-pointer">
        <div class="iconfont icon-qinmifu mr-1 text-white"></div>
        <div class="text-base text-white">亲密度</div>
      </div>
    </div>
    <!-- 导航栏右侧 -->
    <div class="flex items-center">
      <div
        class="w-40 h-7 bg-[#43c5d9] mx-2 items-center flex px-2 text-[#b7e9f0] justify-between"
      >
        <input
          v-model="searchKeyword"
          type="text"
          class="bg-transparent outline-none border-none placeholder-[#b7e9f0] flex-grow text-[#b7e9f0]"
          placeholder="用户/游戏/动态"
          @keyup.enter="handleSearch"
        />
      </div>
      <img :src="avatar" class="w-8 h-8 mx-1" />
      <div class="text-white mx-2">{{ nickname }}</div>
      <div class="iconfont icon-tuichu text-white mx-1" @click="logout"></div>
      <div class="iconfont icon-shezhi text-white mx-1"></div>
      <img
        src="@/assets/images/huangzuan.png"
        mode="scaleToFill"
        class="w-7 h-7"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../../store/user/index.ts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useSearchStore } from '../../../store/shuoshuo/index.ts'

const store = useUserStore()
const avatar = store.avatar
const nickname = store.nickname

const router = useRouter()

const searchKeyword = ref('')
const searchStore = useSearchStore()

const goToHome = () => {
  router.push('/home')
}

const handleSearch = () => {
  searchStore.setKeyword(searchKeyword.value.trim())
}

const logout = () => {
  console.log('Logout clicked')
  store.reset()
  localStorage.clear()
  router.push({ name: 'Login' })
}
</script>

<style scoped></style>
