import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore(
  'searchStore',
  () => {
    const keyword = ref('')

    const setKeyword = (newKeyword: string) => {
      keyword.value = newKeyword
    }

    return {
      keyword,
      setKeyword
    }
  },
  {
    persist: true // 启用持久化
  }
)
