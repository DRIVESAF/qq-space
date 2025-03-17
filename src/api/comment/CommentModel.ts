// CommentModel.ts
export interface CommentModel {
  pkId: number
  shuoshuoId: number
  commentAuthor: number
  commentAuthorNickname: string
  commentContent: string
  createTime: string
  image: string | null
  shuoshuoAuthor: number
  shuoshuoAuthorNickname: string
}

export interface CommentResponse {
  code: number
  msg: string
  data: CommentModel[]
}

export interface Result<T> {
  code: number
  msg: string
  data: T
}
