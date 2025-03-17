export interface SpaceModel {
  spaceId: number
  spaceName: string
  allowAccessScope: number
  allowedUserIds: number[]
  questionId: number
  deleteFlag: number
  updateTime: string
  createTime: string
  createUserId: number
}

export interface SpaceDTO {
  spaceId: number
  spaceName?: string
  allowAccessScope?: number
  allowedUserIds?: number[]
  questionId?: number
}

export interface AccessSpaceDTO {
  spaceId: number
  userAnswer?: string
}

export interface Result<T> {
  code: number
  msg: string
  data: T
}
