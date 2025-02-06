<template>
  <div class="px-90 w-auto">
    <!-- 功能区 -->
    <div class="px-30 flex">
      <div class="px-10 text-lg text-[#293233]">主页</div>
      <div class="px-10 text-lg text-[#293233]">日志</div>
      <div class="px-10 text-lg text-[#293233]">相册</div>
      <div class="px-10 text-lg text-[#293233]">留言板</div>
      <div class="px-10 text-lg text-[#293233]">说说</div>
    </div>
    <!-- 板块区 -->
    <div class="mt-8 flex justify-between">
      <left></left>
      <min></min>
      <right></right>
    </div>
  </div>
</template>

<script setup lang="ts">
import left from './banner-left.vue'
import min from './banner-min.vue'
import right from './banner-right.vue'
</script>

<style scoped></style>
