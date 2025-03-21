import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '../store/user' // 导入 Pinia Store
const config = {
  baseURL: 'http://localhost:8080/qq-space-api',
  timeout: 10000
}

// 定义返回值类型
export interface Result<T = unknown> {
  code: number
  msg: string
  data: T
}

class Http {
  // axios 实例
  private instance: AxiosInstance

  // 构造函数里初始化
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 定义拦截器
    this.interceptors()
  }

  // 拦截器
  private interceptors() {
    // axios 发送请求之前的处理
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const store = useUserStore()
        const token = store.token
        if (token) {
          config.headers!['Authorization'] = token
        }
        return config
      },
      (error) => {
        error.data = {}
        error.data.msg = '服务器异常，请联系管理员!'
        return Promise.reject(error)
      }
    )

    // axios 请求返回之后的处理
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.data.code == 0) {
          return res.data
        } else {
          message.error(res.data.msg || '服务器出错!')
          return Promise.reject(res.data.msg || '服务器出错')
        }
      },
      (error) => {
        error.data = {}
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.data.msg = '错误请求'
              break
            case 401:
              error.data.msg = '未授权，请重新登录'
              break
            case 403:
              error.data.msg = '拒绝访问'
              break
            case 404:
              error.data.msg = '请求错误, 未找到接口'
              break
            case 405:
              error.data.msg = '请求方法未允许'
              break
            case 408:
              error.data.msg = '请求超时'
              break
            case 500:
              error.data.msg = '服务器端出错'
              break
            case 501:
              error.data.msg = '网络未实现'
              break
            case 502:
              error.data.msg = '网络错误'
              break
            case 503:
              error.data.msg = '服务不可用'
              break
            case 504:
              error.data.msg = '网络超时'
              break
            case 505:
              error.data.msg = 'HTTP版本不支持该请求'
              break
            default:
              error.data.msg = `连接错误 ${error.response.status}`
          }
          message.error(error.data.msg)
        } else {
          error.data.msg = '连接到服务器失败'
          message.error(error.data.msg)
        }
        return Promise.reject(error)
      }
    )
  }

  /* GET 方法 */
  get<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.get(url, { params })
  }

  /* POST 方法 */
  post<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.post(url, data)
  }

  /* PUT 方法 */
  put<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.put(url, data)
  }

  /* DELETE 方法 */
  delete<T = Result>(url: string): Promise<T> {
    return this.instance.delete(url)
  }

  // 图片上传
  upload<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new Http(config)
