import http from '../../http'
import type { CommentResponse, Result, CommentModel } from './CommentModel'

// 发布评论
export const publishCommentApi = (
  shuoshuoId: number,
  commentContent: string,
  image?: File
): Promise<Result<CommentModel>> => {
  const formData = new FormData()
  formData.append('commentContent', commentContent)
  if (image) {
    formData.append('image', image)
  }
  return http
    .post(`/comment/publish/${shuoshuoId}`, formData)
    .then((response) => {
      console.log('评论发布成功，返回数据:', response)
      return response.data as Result<CommentModel>
    })
    .catch((error) => {
      console.error('评论发布失败:', error)
      throw error
    })
}

// 查询某条说说的评论列表
export const getCommentsApi = (
  shuoshuoId: number
): Promise<CommentResponse> => {
  return http.get(`/comment/list/${shuoshuoId}`)
}

// 删除评论
export const deleteCommentApi = (id: number): Promise<void> => {
  return http.post(`/comment/delete/${id}`)
}
