import http from '../../http'
import type { ShuoshuoResponse } from './ShuoshuoModel'

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
export const updateShuoshuoApi = (shuoshuoDTO: {
  pkId: number
  content: string
}): Promise<void> => {
  return http.put('/shuoshuo/update', shuoshuoDTO)
}
