import http from '../../http'
import type { PhotoModel } from './PhotoModel'

// 上传照片接口
export const uploadPhotoApi = (
  file: File,
  photoAlbumId: number,
  photoDesc?: string
): Promise<PhotoModel> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('photoAlbumId', String(photoAlbumId))
  if (photoDesc) {
    formData.append('photoDesc', photoDesc)
  }

  return http
    .upload('/photo/upload', formData)
    .then((response) => {
      console.log('上传成功，返回数据:', response) // 打印接口返回的数据
      return response.data as PhotoModel
    })
    .catch((error) => {
      console.error('照片上传失败:', error)
      throw error
    })
}

// 删除照片接口
export const deletePhotoApi = (photoId: number): Promise<void> => {
  return http.post(`/photo/delete/${photoId}`)
}

// 查询相册内所有照片接口
export const getPhotosByAlbumIdApi = (
  albumId: number
): Promise<PhotoModel[]> => {
  return http.get(`/photo/album/${albumId}`)
}

// 查询用户所有照片接口
export const getUserPhotosApi = (userId: number): Promise<PhotoModel[]> => {
  return http
    .get(`/photo/user/${userId}`)
    .then((response) => {
      return response.data as PhotoModel[]
    })
    .catch((error) => {
      console.error('查询用户照片失败:', error)
      throw error
    })
}
