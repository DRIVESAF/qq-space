<template>
  <div class="px-100 w-auto">
    <div>
      <!-- 左侧名称 -->
      <div class="inline-flex items-center py-6">
        <div
          class="text-2xl text-[#157c8c] [text-shadow:1px_1px_2px_rgba(0,0,0,0.2)]"
        >
          。的空间
        </div>
        <img src="@/assets/images/dengji.png" class="w-7 h-7 pl-3" />
      </div>
      <!-- 右侧点赞 -->
      <div class="justify-end flex pb-10">
        <div
          class="iconfont icon-dianzan_kuai text-white bg-[#939393] w-13 h-10 flex items-center justify-center rounded-full bg-opacity-80"
        ></div>
      </div>
    </div>
    <!-- 操作栏 -->
    <Msg />
  </div>
</template>

<script setup lang="ts">
import Msg from './Msg.vue'
</script>

<style scoped></style>
