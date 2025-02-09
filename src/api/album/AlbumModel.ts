export interface PhotoAlbumModel {
  photoAlbumId: number
  userId: number
  albumName: string
  albumDesc: string
  coverUrl: string
  createTime: string
  updateTime: string
  visibleScope: number
}

export interface PhotoAlbumResponse {
  code: number
  msg: string
  data: PhotoAlbumModel[]
}

export interface UploadCoverResponse {
  code: number
  msg: string
  data: string
}
