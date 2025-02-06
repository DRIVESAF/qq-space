export interface UserInfo {
  pkId: number
  phone: string
  qqOpenId: string
  avatar: string
  nickname: string
  gender: number
  birthday: string
}

export interface UserInfoResponse {
  code: number
  msg: string
  data: UserInfo
}

// 好友列表响应
export interface FriendListResponse {
  code: number
  msg: string
  data: UserInfo[]
}
