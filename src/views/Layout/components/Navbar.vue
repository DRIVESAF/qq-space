<template>
  <div
    class="w-auto bg-[#04b1cc] px-50 flex justify-between items-center"
    @click="goToHome"
  >
    <!-- 导航栏左侧 -->
    <div class="flex">
      <!-- logo -->
      <div class="flex items-center p-2 cursor-pointer">
        <img
          src="https://first-buckt.oss-cn-nanjing.aliyuncs.com/2025/01/23/QQ%E7%A9%BA%E9%97%B4.png"
          mode="scaleToFill"
          class="w-8 h-8"
        />
        <div class="text-xl text-white">QQ空间</div>
      </div>
      <!-- 个人中心 -->
      <div class="flex items-center px-2 h-auto cursor-pointer">
        <div class="iconfont icon-gerenzhongxin mr-1 text-white"></div>
        <div class="text-base text-white">个人中心</div>
      </div>
      <!-- 我的主页 -->
      <div class="flex items-center px-2 h-auto cursor-pointer">
        <div class="iconfont icon-home_before mr-1 text-white"></div>
        <div class="text-base text-white">我的主页</div>
      </div>
      <!-- 好友 -->
      <div
        class="relative flex items-center px-2 h-auto cursor-pointer"
        @mouseenter="showFriendsDropdown = true"
        @mouseleave="handleMouseLeave"
      >
        <div class="iconfont icon-31haoyou mr-1 font-bold text-white"></div>
        <div class="text-base text-white">好友</div>

        <!-- 好友下拉框 -->
        <div
          v-if="showFriendsDropdown"
          class="absolute top-full left-0 w-90 z-100 bg-white shadow-md mt-2 p-2"
          @mouseenter="showFriendsDropdown = true"
          @mouseleave="showFriendsDropdown = false"
        >
          <div class="text-sm">好友列表</div>
          <div class="flex">
            <div v-if="friends.length > 0" class="flex gap-2">
              <div
                v-for="friend in friends"
                :key="friend.id"
                class="p-2 flex flex-col items-center"
              >
                <div
                  class="flex flex-col justify-center"
                  @click="goToUserProfile(friend.pkId)"
                >
                  <img
                    :src="friend.avatar"
                    class="w-10 h-10 rounded-md mr-2"
                    alt="头像"
                  />
                  <div class="text-gray-800 text-sm">{{ friend.nickname }}</div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500 p-2">暂无好友</div>
          </div>
        </div>
      </div>
      <!-- 游戏 -->
      <div class="flex items-center px-2 h-auto cursor-pointer">
        <div class="iconfont icon-yingyong mr-1 text-white"></div>
        <div class="text-base text-white">游戏</div>
      </div>
      <!-- 装扮 -->
      <div class="flex items-center px-2 h-auto cursor-pointer">
        <div class="iconfont icon-zhuangban mr-1 text-white"></div>
        <div class="text-base text-white">装扮</div>
      </div>
    </div>

    <!-- 导航栏右侧 -->
    <div class="flex items-center">
      <div
        class="w-40 h-7 bg-[#43c5d9] mx-2 items-center flex px-2 text-[#b7e9f0] justify-between"
      >
        <input
          v-model="searchKeyword"
          type="text"
          class="bg-transparent outline-none border-none placeholder-[#b7e9f0] flex-grow text-[#b7e9f0]"
          placeholder="用户/游戏/动态"
          @keyup.enter="handleSearch"
        />
      </div>
      <img :src="avatar" class="w-8 h-8 mx-1" />
      <div class="text-white mx-2">{{ nickname }}</div>
      <div
        class="iconfont icon-tuichu text-white mx-1 cursor-pointer"
        @click="logout"
      ></div>
      <div class="iconfont icon-shezhi text-white mx-1"></div>
      <img
        src="@/assets/images/huangzuan.png"
        mode="scaleToFill"
        class="w-7 h-7"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../../store/user/index.ts'
import { useRouter } from 'vue-router'
import { useSearchStore } from '../../../store/shuoshuo/index.ts'
import { getUserFriendsApi } from '../../../api/user'
import {
  getAllowAccessScopeByUserIdApi,
  getSpaceQuestionByUserIdApi,
  accessSpaceApi
} from '../../../api/space/index.ts'

const store = useUserStore()
const avatar = store.avatar
const nickname = store.nickname

const router = useRouter()
const searchKeyword = ref('')
const searchStore = useSearchStore()

const goToHome = () => {
  router.push('/home')
}

const handleSearch = () => {
  searchStore.setKeyword(searchKeyword.value.trim())
}

const logout = () => {
  store.reset()
  localStorage.clear()
  router.push({ name: 'Login' })
}

// 控制好友下拉框显示
const showFriendsDropdown = ref(false)

// 好友列表
const friends = ref<{ id: number; username: string; avatar: string }[]>([])

// 获取好友列表
const fetchFriends = async () => {
  try {
    const response = await getUserFriendsApi()
    friends.value = response.data
  } catch (error) {
    console.error('获取好友列表失败', error)
  }
}

// 处理鼠标移出好友项
const handleMouseLeave = (event: MouseEvent) => {
  const relatedTarget = event.relatedTarget as HTMLElement

  // 如果鼠标仍然在好友项或下拉菜单内部，则不关闭
  if (
    relatedTarget &&
    (relatedTarget.closest('.relative') || relatedTarget.closest('.absolute'))
  ) {
    return
  }

  showFriendsDropdown.value = false
}

const goToUserProfile = async (userId: number) => {
  try {
    const accessScopeResponse = await getAllowAccessScopeByUserIdApi(userId)
    const accessScope = accessScopeResponse.data

    // 2. 根据权限结果处理
    if (accessScope === 1) {
      // 权限为1，直接访问空间
      router.push({ name: 'UserProfile', params: { id: userId } })
    } else if (accessScope === 2 || accessScope === 3) {
      // 权限为2或3，调用访问空间接口
      const accessResponse = await accessSpaceApi(userId)
      if (accessResponse.data) {
        // 允许访问
        router.push({ name: 'UserProfile', params: { id: userId } })
      } else {
        // 不允许访问
        alert('您没有权限访问该空间')
      }
    } else if (accessScope === 4) {
      // 权限为4，调用查询空间访问问题接口
      const questionResponse = await getSpaceQuestionByUserIdApi(userId)
      const question = questionResponse.data

      // 弹出输入框，让用户回答问题
      const userAnswer = prompt(question.questionContent) // question.content 是问题的内容
      if (userAnswer) {
        // 调用访问空间接口，验证答案
        const accessResponse = await accessSpaceApi(userId, userAnswer)
        if (accessResponse.data) {
          // 答案正确，允许访问
          router.push({ name: 'UserProfile', params: { id: userId } })
        } else {
          // 答案错误
          alert('答案错误，无法访问该空间')
        }
      } else {
        // 用户未输入答案
        alert('请输入答案')
      }
    } else {
      // 未知权限
      alert('未知权限，无法访问该空间')
    }
  } catch (error) {
    console.error('访问空间失败:', error)
    alert('访问空间失败，请重试')
  }
}

// 页面加载时获取好友数据
onMounted(fetchFriends)
</script>
