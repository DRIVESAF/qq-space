<template>
  <div class="w-auto flex justify-between items-end">
    <!-- 左侧头像 -->
    <div class="flex items-center">
      <div
        class="w-35 h-35 flex justify-center items-center bg-white shadow-md"
      >
        <img :src="avatar" class="w-33 h-33" />
      </div>
      <div class="px-4 flex text-lg text-[#387c8c]">{{ nickname }}</div>
    </div>
    <!-- 右侧访客量 -->
    <div class="flex items-center">
      <img src="@/assets/images/liulan.png" class="w-15 h-15" />
      <div>
        <div class="flex">
          <div class="text-[#387c8c] px-2">
            今日访客 <span class="font-bold">0</span>
          </div>
          <div class="text-[#387c8c]">
            被挡访客 <span class="font-bold">483</span>
          </div>
        </div>
        <div class="text-[#387c8c] px-2">
          访客总量 <span class="font-bold">13768</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../../store/user/index.ts'

const store = useUserStore()
const avatar = store.avatar
const nickname = store.nickname
</script>

<style scoped></style>
