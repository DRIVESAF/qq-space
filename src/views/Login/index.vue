<template>
  <div class="background-image absolute">
    <!-- 主体开始 -->
    <div class="w-300 h-200 mt-30 relative mx-auto">
      <!-- 标题 -->
      <div class="w-80">
        <div class="flex items-center">
          <img
            src="https://first-buckt.oss-cn-nanjing.aliyuncs.com/2025/01/23/QQ%E7%A9%BA%E9%97%B4.png"
            alt="qq空间"
            class="w-30 h-30"
          />
          <div class="text-5xl tracking-wider text-white">QQ空间</div>
        </div>
        <div class="flex justify-around">
          <div class="font-light text-xl tracking-widest text-white">
            分享生活
          </div>
          <div class="font-light text-xl tracking-widest text-white">
            留住感动
          </div>
        </div>
      </div>
      <!-- 登录窗口 -->
      <div class="flex justify-end">
        <div class="bg-white w-130 h-100 rounded">
          <!-- 内容区 -->
          <div class="flex-col flex items-center">
            <div class="text-xl my-3">
              {{ loginMode === 'captcha' ? '手机登录' : '密码登录' }}
            </div>
            <div class="mb-5">
              推荐使用
              <span class="text-blue-500">快捷登录</span>
              ，防止盗号。
            </div>
            <!-- 登录功能 -->
            <div>
              <div class="flex-1">
                <a-input
                  v-model:value="phone"
                  placeholder="请输入账号"
                  class="my-2 w-80 h-12 text-base"
                  type="tel"
                />
              </div>
              <div
                v-if="loginMode === 'captcha'"
                class="flex-1 flex justify-between"
              >
                <div>
                  <a-input
                    v-model:value="captcha"
                    placeholder="请输入验证码"
                    class="my-2 text-base h-12 w-40"
                    type="tel"
                  ></a-input>
                </div>
                <div>
                  <a-button
                    type="primary"
                    class="my-2 text-base h-12 w-auto"
                    style="background-color: #0099ff"
                    :disabled="!phone || timer"
                    @click="getCaptcha"
                  >
                    {{ timer ? `还剩下${count}秒` : '获取验证码' }}
                  </a-button>
                </div>
              </div>
              <div v-else class="flex-1">
                <a-input
                  v-model:value="password"
                  placeholder="请输入密码"
                  class="my-2 text-base h-12 w-80"
                  type="password"
                ></a-input>
              </div>
              <div class="flex-1 flex mt-7">
                <a-button
                  type="primary"
                  class="my-2 w-80 h-12 text-base"
                  style="background-color: #0099ff"
                  @click="login"
                  :disabled="!(phone && (captcha || password))"
                >
                  登录
                </a-button>
              </div>
            </div>
          </div>
          <!-- 底部切换按钮 -->
          <div class="flex w-80 mx-auto justify-between mt-6">
            <div @click="toggleLoginMode" class="cursor-pointer">
              {{ loginMode === 'captcha' ? '密码登录' : '验证码登录' }}
            </div>
            <div>找回密码</div>
            <div>注册账号</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 主体结束 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sendCode, phoneLogin, passwordLogin, getInfoApi } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'

const store = useUserStore()
const phone = ref('')
const captcha = ref('')
const password = ref('')
const loginMode = ref('captcha') // 当前登录模式 ('captcha' 或 'password')
const timer = ref(null)
const count = ref(0)

const toggleLoginMode = () => {
  loginMode.value = loginMode.value === 'captcha' ? 'password' : 'captcha'
  captcha.value = '' // 重置验证码
  password.value = '' // 重置密码
}

// 开始倒计时函数
function startTimer() {
  count.value = 60 // 设置倒计时时间，例如60秒
  timer.value = setInterval(() => {
    if (count.value > 1) {
      count.value--
    } else {
      clearTimer()
    }
  }, 1000)
}

// 清除倒计时
function clearTimer() {
  clearInterval(timer.value)
  timer.value = null
}

const router = useRouter()
const getCaptcha = () => {
  if (!phone.value) {
    message.warning('请输入有效的手机号码')
    return
  }

  sendCode(phone.value)
    .then((response) => {
      if (response.code === 0) {
        message.success('验证码已发送，请查收')
        startTimer()
      } else {
        message.error('发送验证码失败: ' + (response.msg || '未知错误'))
      }
    })
    .catch(() => {
      message.error('发送验证码时出现错误，请稍后再试')
    })
}

const login = () => {
  if (
    !phone.value ||
    (loginMode.value === 'captcha' && !captcha.value) ||
    (loginMode.value === 'password' && !password.value)
  ) {
    alert('输入信息错误')
    return
  }

  const request =
    loginMode.value === 'captcha'
      ? phoneLogin(phone.value, captcha.value)
      : passwordLogin(phone.value, password.value)

  request
    .then((response) => {
      message.success('登录成功')
      const res = response.data
      store.setUserId(res.userId)
      store.setToken(res.accessToken)

      // 调用获取用户信息的接口
      fetchUserInfo()

      // 跳转到首页
      router.push('/')
    })
    .catch(() => {
      message.error('登录失败，请检查您输入的信息')
    })
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const response = await getInfoApi()
    if (response.code === 0) {
      // 更新 Store 中的用户信息
      store.setUser(response.data)
      store.setAvatar(response.data.avatar)
      store.setNickname(response.data.nickname)
    } else {
      console.error('获取用户信息失败:', response.msg)
    }
  } catch (error) {
    console.error('调用用户信息接口时出错:', error)
  }
}

// 组件加载时调用获取用户信息
onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
.background-image {
  width: 100%;
  height: 100vh;
  background-image: url('https://first-buckt.oss-cn-nanjing.aliyuncs.com/2025/01/23/20171122191532_f2975b.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 800px; /* 设置最小高度，确保小屏幕时内容不会被压缩 */
  overflow: auto; /* 当内容超出时允许滚动 */
}

/* 主体内容容器样式 */
.w-300 {
  min-width: 960px; /* 设置最小宽度，防止内容被挤压 */
  max-width: 1200px; /* 设置最大宽度，防止在大屏幕上过宽 */
  margin: 0 auto; /* 水平居中 */
  padding: 0 20px; /* 添加左右内边距 */
  box-sizing: border-box; /* 确保padding不会增加总宽度 */
}

/* 登录窗口响应式调整 */
@media screen and (max-width: 1024px) {
  .w-300 {
    min-width: auto;
    width: 100%;
    padding: 0 15px;
  }

  .mt-30 {
    margin-top: 60px;
  }
}

/* 小屏幕适配 */
@media screen and (max-width: 768px) {
  .background-image {
    min-height: 600px;
  }

  .w-130 {
    width: 100%;
    max-width: 400px;
  }

  .w-80 {
    width: 100%;
    max-width: 300px;
  }
}

/* 保持其他现有样式不变 */
.cursor-pointer {
  cursor: pointer;
}

.ant-input:focus,
.ant-input:hover {
  box-shadow: 0 0 1px 1px #80c4f1 !important;
  border-color: #80c4f1 !important;
}

/* 禁用按钮的样式 */
.ant-btn[disabled] {
  background-color: #f5f5f5 !important;
  color: #bbbebd !important;
  border-color: #bbbebd !important;
}
</style>
