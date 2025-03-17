<template>
  <div class="flex items-center justify-center">
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
