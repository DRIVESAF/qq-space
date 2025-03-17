//shuoshuo/index.ts
import http from '../../http'
import type {
  ShuoshuoResponse,
  Result,
  UpdateShuoshuoDTO
} from './ShuoshuoModel'

// 获取用户和好友的说说
export const getUserAndFriendShuoshuoApi =
  async (): Promise<ShuoshuoResponse> => {
    return await http.get('/shuoshuo/select')
  }

// 查询用户的说说
export const getUserShuoshuoApi = (
  authorId: number
): Promise<ShuoshuoResponse[]> => {
  return http.get(`/shuoshuo/user/${authorId}/shuoshuos`)
}

// 搜索说说
export const searchShuoshuoApi = (
  keyword: string
): Promise<ShuoshuoResponse[]> => {
  return http.get(`/shuoshuo/search?keyword=${encodeURIComponent(keyword)}`)
}

// 发布说说
export const publishShuoshuoApi = (shuoshuo: {
  content: string
  visibleScope: number
  visibleUser: number[]
}): Promise<void> => {
  return http.post('/shuoshuo/publish', shuoshuo)
}

// 删除说说
export const deleteShuoshuoApi = (id: number): Promise<void> => {
  return http.post(`/shuoshuo/delete/${id}`)
}

// 更新说说
export const updateShuoshuoApi = (
  shuoshuoDTO: UpdateShuoshuoDTO
): Promise<Result<null>> => {
  return http.put('/shuoshuo/update', shuoshuoDTO)
}

// 查询当前用户是否对某条说说进行过点赞
export const hasLikedShuoshuoApi = async (
  shuoshuoId: number
): Promise<boolean> => {
  const response = await http.get<{ data: boolean }>(
    `/shuoshuo/hasLiked?shuoshuoId=${shuoshuoId}`
  )
  return response.data
}

// 查询点赞数
export const getLikeNumApi = async (
  shuoshuoId: number
): Promise<Result<number>> => {
  return await http.get(`/shuoshuo/likeNum/${shuoshuoId}`)
}

//  AI 帮写接口
export const aiWriteApi = async (
  userInput: string
): Promise<Result<string>> => {
  return await http.post(
    `/shuoshuo/ai-write?userInput=${encodeURIComponent(userInput)}`
  )
}
