<!-- banner-right.vue -->
<template>
  <div class="w-50 ml-6">
    <!-- 签到开始 -->
    <div class="w-full h-25 flex border-[1px] border-[#ddedf0] border-solid">
      <div
        class="bg-[#c7e5eb] w-20 h-full flex justify-center items-center flex-col"
      >
        <div class="text-[#267c8c] text-sm">02.06</div>
        <div class="text-[#267c8c] text-2xl">签到</div>
      </div>
      <div class="bg-white flex justify-center items-center flex-col flex-grow">
        <div class="text-[#267c8c] text-sm">本月签到次数</div>
        <div class="text-[#267c8c] text-2xl">0次</div>
      </div>
    </div>
    <!-- 签到结束 -->
    <!-- 浏览开始 -->
    <div class="w-full bg-white my-3 py-1">
      <!-- tab开始 -->
      <div class="flex">
        <div
          class="text-sm px-1 border-r-[1px] border-r-solid border-r-[#dfedf2]"
        >
          谁看过我
        </div>
        <div
          class="text-sm px-1 border-r-[1px] border-r-solid border-r-[#dfedf2] text-[#157c98]"
        >
          我看过谁
        </div>
        <div class="text-sm px-1 text-[#157c98]">被挡访客</div>
      </div>
      <!-- tab结束 -->
      <!-- 访客列表开始 -->
      <div class="p-1">
        <!-- 用户 -->
        <div class="flex gap-2">
          <div class="w-14 h-21 flex flex-col justify-between items-center">
            <img
              src="https://first-buckt.oss-cn-nanjing.aliyuncs.com/2025/02/04/2e1eeeab-a792-44b4-ad69-664efd36fcdf.png"
              class="w-14 h-14 rounded-md"
            />
            <div class="text-xs">1月24</div>
          </div>
        </div>
      </div>
      <!-- 访客列表结束 -->
      <!-- 访客统计开始 -->
      <div
        class="border-t-[1px] border-t-[#ddedf0] border-t-solid flex justify-center items-center mt-2"
      >
        <div class="flex flex-col justify-center items-center m-2">
          <div class="text-xs">今日浏览</div>
          <div class="text-xs">0</div>
        </div>
        <div class="flex flex-col justify-center items-center m-2">
          <div class="text-xs">总浏览</div>
          <div class="text-xs">1</div>
        </div>
        <div class="flex flex-col justify-center items-center m-2">
          <div class="text-xs">被挡访客</div>
          <div class="text-xs">0</div>
        </div>
      </div>
      <!-- 访客统计结束 -->
    </div>
    <!-- 浏览结束 -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
