export interface ShuoshuoModel {
  pkId: number
  content: string
  author: string
  avatar: string
  likeNum: number
  isTop: number
  transpondNum: number
  createTime: string
  updateTime: string
}

export interface ShuoshuoResponse {
  code: number
  msg: string
  data: ShuoshuoModel[]
}
