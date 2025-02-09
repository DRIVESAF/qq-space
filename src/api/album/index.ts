import http from '../../http'
import type { PhotoAlbumResponse } from './AlbumModel'

// 新建相册
export const createPhotoAlbumApi = (photoAlbum: {
  albumName: string
  albumDesc: string
  coverUrl: string
  visibleScope: number
}): Promise<void> => {
  return http.post('/photoAlbum/create', photoAlbum)
}

// 图片上传接口
export const uploadImageApi = (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  // 调用上传接口
  return http
    .upload('/common/upload/img', formData)
    .then((response) => {
      // 返回上传后的图片 URL
      return response.data as string
    })
    .catch((error) => {
      console.error('图片上传失败:', error)
      throw error
    })
}

// 查询用户的相册列表
export const getUserPhotoAlbumsApi = (
  userId: number
): Promise<PhotoAlbumResponse> => {
  return http.get(`/photoAlbum/${userId}/albumList`)
}

// 编辑相册
export const editPhotoAlbumApi = (photoAlbum: {
  albumName: string
  albumDesc: string
  coverUrl: string | null
  visibleScope: number
}): Promise<void> => {
  return http.put('/photoAlbum/edit', photoAlbum)
}

// 删除相册
export const deletePhotoAlbumApi = (photoAlbumId: number): Promise<void> => {
  return http.post(`/photoAlbum/delete/${photoAlbumId}`)
}
