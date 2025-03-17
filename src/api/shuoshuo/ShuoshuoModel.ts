//shuoshuomodel.ts
export interface ShuoshuoModel {
  pkId: number
  content: string
  author: number
  nickname: string
  avatar: string
  likeNum: number
  isTop: number
  images: string[]
  transpondNum: number
  createTime: string
  updateTime: string
  isLiked?: boolean
  isExpanded?: boolean
  comments?: CommentModel[]
}

export interface ShuoshuoResponse {
  code: number
  msg: string
  data: ShuoshuoModel[]
}

export interface Result<T> {
  code: number
  msg: string
  data: T
}

export interface UpdateShuoshuoDTO {
  pkId: number
  content: string
  visibleScope: number
  visibleUser: number[]
}

export interface CommentModel {
  pkId: number
  commentAuthorNickname: string
  commentAuthorAvatar: string
  commentContent: string
  createTime: string
  image?: string
}
