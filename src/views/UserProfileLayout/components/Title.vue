<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex flex-col ju">
      <!-- 左侧名称 -->
      <div class="inline-flex items-center py-6">
        <div
          class="text-2xl text-[#157c8c] [text-shadow:1px_1px_2px_rgba(0,0,0,0.2)]"
        >
          {{ store.nickname }}的空间
        </div>
        <img src="@/assets/images/dengji.png" class="w-7 h-7 pl-3" />
      </div>
      <div class="w-250"></div>

      <!-- 右侧点赞 -->
      <div class="justify-end flex pb-10">
        <div
          class="iconfont icon-dianzan_kuai text-white bg-[#939393] w-13 h-10 flex items-center justify-center rounded-full bg-opacity-80"
        ></div>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="w-auto flex justify-between items-end">
      <!-- 左侧头像 -->
      <div class="flex items-center pb-8">
        <div
          class="w-35 h-35 flex justify-center items-center bg-white shadow-md"
        >
          <img :src="store.avatar" class="w-33 h-33" />
        </div>
        <div class="px-4 flex text-lg text-[#387c8c]"></div>
      </div>

      <!-- 功能区 -->
      <div class="flex">
        <div
          class="px-10 text-lg text-[#293233] cursor-pointer"
          @click="goToMain"
        >
          主页
        </div>
        <div class="px-10 text-lg text-[#293233] cursor-pointer">日志</div>
        <div
          class="px-10 text-lg text-[#293233] cursor-pointer"
          @click="goToPhotoAlbum"
        >
          相册
        </div>
        <div class="px-10 text-lg text-[#293233] cursor-pointer">留言板</div>
        <div class="px-10 text-lg text-[#293233] cursor-pointer">说说</div>
      </div>
      <!-- 右侧访客量 -->
      <div class="flex items-center pb-8">
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
  </div>
</template>

<script setup lang="ts">
import { useFriendStore } from '../../../store/user/friend.ts'
import { useRouter } from 'vue-router'

const store = useFriendStore()
const userId = store.userInfo?.pkId

const router = useRouter()

const goToPhotoAlbum = () => {
  router.push(`/user/${userId}/album`)
}

const goToMain = () => {
  console.log('Current userInfo:', store.userInfo)
  router.push(`/user/${store.userInfo?.pkId}`)
}
</script>

<style scoped></style>
