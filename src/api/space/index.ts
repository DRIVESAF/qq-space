import http from '../../http'
import type { Result, SpaceDTO, AccessSpaceDTO, Question } from './SpaceModel'

// 更新空间权限
export const updateSpacePermissionApi = async (
  spaceDTO: SpaceDTO
): Promise<Result<string>> => {
  return await http.put('/space/update', spaceDTO)
}

// 访问空间
export const accessSpaceApi = async (
  spaceId: number,
  userAnswer?: string
): Promise<Result<boolean>> => {
  const data = {
    spaceId,
    userAnswer
  }
  console.log('Request Data:', data)
  return await http.post(`/space/access/${spaceId}`, data)
}

// 查询空间权限
export const getAllowAccessScopeByUserIdApi = async (
  userId: number
): Promise<Result<number>> => {
  return await http.get(`/space/allowAccessScope/${userId}`)
}

// 查询空间访问问题
export const getSpaceQuestionByUserIdApi = async (
  userId: number
): Promise<Result<Question>> => {
  return await http.get(`/space/question/${userId}`)
}
