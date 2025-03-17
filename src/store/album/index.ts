import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePhotoAlbumStore = defineStore('photoAlbum', () => {
  // 当前选择的相册
  const selectedAlbum = ref<{
    photoAlbumId: number
    albumName: string
    albumDesc: string
    coverUrl: string
    createTime: string
    updateTime: string
    visibleScope: number
  } | null>(null)

  // 设置当前选择的相册
  const setSelectedAlbum = (album: {
    photoAlbumId: number
    albumName: string
    albumDesc: string
    coverUrl: string
    createTime: string
    updateTime: string
    visibleScope: number
  }) => {
    selectedAlbum.value = album
  }

  return {
    selectedAlbum,
    setSelectedAlbum
  }
})
