import http from '../../http'
import type { UserInfoResponse, FriendListResponse } from './UserModel'

// 获取用户信息
export const getInfoApi = async (): Promise<UserInfoResponse> => {
  return await http.get('/user/info')
}

// 发送短信验证码接口
export const sendCode = (phone: string | number) => {
  return http.post(`/common/sendSms?phone=${encodeURIComponent(String(phone))}`)
}

// 手机验证码登录接口
export const phoneLogin = (phone: string | number, code: string) => {
  const params = new URLSearchParams()
  params.append('phone', String(phone))
  params.append('code', code)
  return http.post('/auth/login', params)
}

// 密码登录接口
export const passwordLogin = (qq_open_id: string, password: string) => {
  const params = new URLSearchParams()
  params.append('qq_open_id', qq_open_id)
  params.append('password', password)
  return http.post('/auth/login/account', params)
}

// 查询好友接口
export const getUserFriendsApi = async (): Promise<FriendListResponse> => {
  return await http.get('/user/friends')
}
