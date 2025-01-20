<template>
  <div>
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref<string>('hello')
console.log('aaa')
</script>

<style scoped></style>
