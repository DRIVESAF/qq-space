export interface PhotoModel {
  photoId: number
  photoAlbumId: number
  userId: number
  photoUrl: string
  photoDesc?: string
  uploadTime: string
  albumName: string
}

export interface PhotoResponse {
  code: number
  msg: string
  data: PhotoModel[]
}
