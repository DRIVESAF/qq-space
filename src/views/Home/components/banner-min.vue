<!-- banner-min.vue -->
<template>
  <div class="flex flex-col flex-grow">
    <!-- 发布说说开始 -->
    <div
      class="bg-white w-full h-25 cursor-pointer flex justify-between border-b-[#c7e5eb] border-b-solid border-b-[1px] shadow-[inset_0_2px_4px_#f7f7f7]"
    >
      <!-- 输入框 -->
      <textarea
        v-model="content"
        type="text"
        class="flex-grow border-none shurukuang p-2"
        placeholder="说点儿什么吧"
      />
      <!-- 功能框 -->
      <div class="flex">
        <!-- 照片 -->
        <div
          class="bg-[#e6f7fa] w-20 border-t border-b border-l border-r-none border-solid border-[#ddedf0] flex justify-center items-center"
        >
          <div class="iconfont icon-xiangji scale-200 text-[#7a9599]"></div>
        </div>

        <!-- 链接 -->
        <div
          class="bg-[#e6f7fa] w-20 border-t border-b border-l border-r border-solid border-[#ddedf0] flex justify-center items-center"
        >
          <div class="iconfont icon-huixingzhen scale-240 text-[#7a9599]"></div>
        </div>
      </div>
    </div>

    <!-- 发布下拉框 -->
    <div
      class="bg-white w-full h-10 shadow-[inset_0_2px_4px_#f7f7f7] flex justify-between items-center"
    >
      <!-- 左侧块 -->
      <div
        class="p-l-1 border-r-solid border-r-[1px] border-r-[#c7e5eb] flex flex-grow justify-between"
      >
        <div class="flex">
          <div
            class="iconfont icon-biaoqing text-[#7a9599] font-bold scale-120 px-1"
          ></div>
          <div class="iconfont icon-aite text-[#7a9599] font-bold px-1"></div>
          <div
            class="iconfont icon-huatifuhao text-[#7a9599] font-bold scale-120 px-1"
          ></div>
        </div>

        <div class="iconfont icon-qie text-[#47a4b3] scale-120 px-4"></div>
      </div>
      <!-- 右侧块 -->
      <div class="flex p-r-1 items-center">
        <!-- 可见范围 -->
        <div class="text-[#7e8a8c] text-sm flex px-3">
          <div>可见范围：</div>
          <div class="cursor-pointer flex" @click="toggleDropdown">
            <div>{{ selectedVisibility }}</div>
            <div class="iconfont icon-xiala px-3"></div>
          </div>
        </div>
        <!-- 选择可见好友弹窗 -->
        <div v-if="isModalVisible" class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <div>选择可见好友</div>
              <div
                class="iconfont icon-guanbi cursor-pointer text-gray-400 font-bold"
                @click="closeModal"
              ></div>
            </div>
            <!-- 弹窗内容 -->
            <div class="modal-body">
              <div
                class="w-full h-15 bg-[#fafafa] flex items-center justify-between border-b-[#ddd] border-b-solid border-b-[1px]"
              >
                <div class="mx-3 text-sm text-[#636266] relative inline-block">
                  <div
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-[#7a9599] iconfont icon-sousuo"
                  ></div>
                  <input
                    type="search"
                    placeholder="搜索好友"
                    class="pinglunkuang p-2"
                  />
                </div>
                <div
                  class="mx-3 bg-[#5caae6] px-6 py-1 text-sm text-white border-[#63a8dc] border-solid cursor-pointer"
                  @click="closeModal"
                >
                  确定
                </div>
              </div>
              <div class="m-2 flex gap-4 flex-wrap">
                <!-- 遍历好友列表 -->
                <div
                  v-for="friend in friendsList"
                  :key="friend.pkId"
                  class="flex items-start friend"
                >
                  <!-- 头像 -->
                  <div class="bg-green-200 w-10 h-10">
                    <img :src="friend.avatar" class="w-full h-full" />
                  </div>
                  <div class="px-2 text-[#6a6a6a]">{{ friend.nickname }}</div>
                  <div class="flex h-10 items-end">
                    <div
                      class="bg-white w-5 h-5 flex justify-center items-center"
                      @click="toggleCheck(friend.pkId)"
                    >
                      <div
                        class="iconfont icon-dagou font-bold text-[#369cd6]"
                        v-show="isChecked[friend.pkId]"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 下拉框 -->
        <div v-if="isDropdownVisible" class="dropdown-menu">
          <ul class="text-sm">
            <li @click="selectVisibility('所有人可见')">
              <span
                class="iconfont icon-qie pr-3 font-bold text-[#7a9599]"
              ></span
              >所有人可见
            </li>
            <li @click="selectVisibility('部分好友可见')">
              <span
                class="iconfont icon-31haoyou pr-3 font-bold text-[#7a9599]"
              ></span>
              部分好友可见
            </li>
            <li @click="selectVisibility('仅自己可见')">
              <span
                class="iconfont icon-gerenzhongxin pr-3 font-bold text-[#7a9599]"
              ></span
              >仅自己可见
            </li>
          </ul>
        </div>
        <!-- 发表按钮 -->
        <div
          class="bg-[#5ccfe6] border-solid border-[#47c3d6] border-[1px] text-white w-16 h-6 justify-center flex items-center text-sm cursor-pointer"
          @click="handlePublish"
        >
          发表
        </div>
      </div>
    </div>
    <!-- 发布说说结束 -->

    <!-- 动态筛选开始 -->
    <div class="bg-white w-full h-13 my-3 flex items-center justify-between">
      <div class="pl-2 flex items-center">
        <div class="font-bold text-sm">全部动态</div>
        <div class="iconfont icon-xiala text-[#89a2a5] px-2"></div>
      </div>

      <div class="flex items-center">
        <div class="iconfont icon-shuaxin font-bold text-[#7a9599] px-4"></div>
        <div
          class="iconfont icon-shezhi1 font-bold text-[#7a9599] scale-120 px-4"
        ></div>
      </div>
    </div>
    <!-- 动态筛选结束 -->

    <!-- 说说列表开始 -->
    <div
      v-for="shuoshuo in shuoshuoList"
      :key="shuoshuo.pkId"
      class="bg-white w-full mb-4"
    >
      <!-- 用户信息 -->
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center">
          <!-- 头像 -->
          <div class="bg-green-200 w-15 h-15 rounded-full m-2">
            <img :src="shuoshuo.avatar" class="w-full h-full rounded-full" />
          </div>
          <div class="flex-col flex gap-2 px-3">
            <!-- 昵称 -->
            <div class="text-base">{{ shuoshuo.author }}</div>
            <!-- 发布时间 -->
            <div class="text-[#8798a5] text-sm">
              {{ formatDate(shuoshuo.createTime) }}
            </div>
          </div>
        </div>
        <div class="relative">
          <!-- 点击图标触发显示下拉框 -->
          <div
            @click="toggleEdit(shuoshuo.pkId)"
            class="iconfont icon-xiala pr-2 text-[#7a9599] cursor-pointer"
          ></div>

          <!-- 下拉框 -->
          <div
            v-if="activeDropdownId === shuoshuo.pkId"
            class="absolute bg-white shadow-md mt-2 w-28 border border-gray-200 z-100"
          >
            <ul>
              <li @click="editPost" class="flex justify-center items-center">
                <div
                  class="iconfont icon-bianji scale-150 pr-2 text-[#7a9599] font-bold"
                ></div>
                <div class="text-sm">编辑</div>
              </li>
              <li @click="editTop" class="flex justify-center items-center">
                <div
                  class="iconfont icon-zhiding scale-150 pr-2 text-[#7a9599]"
                ></div>
                <div class="text-sm">置顶</div>
              </li>
              <li
                @click="deletePost(shuoshuo.pkId)"
                class="flex justify-center items-center"
              >
                <div
                  class="iconfont icon-icon-mianxing_fuzhi_shanchu scale-150 pr-2 text-[#7a9599]"
                ></div>
                <div class="text-sm">删除</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 说说内容 -->
      <div class="p-2">
        {{ shuoshuo.content }}
      </div>
      <!-- 互动 -->
      <div class="w-full h-10">
        <div class="p-2 flex items-center justify-between">
          <div class="text-sm text-[#7e8a8c]">浏览<span>0</span>次</div>
          <div class="flex items-center">
            <div
              class="iconfont icon-dianzan_kuai text-[#7a9599] scale-140"
            ></div>
            <div
              class="iconfont icon-pinglun text-[#7a9599] pl-8 scale-110"
            ></div>
            <div
              class="iconfont icon-zhuanfa text-[#7a9599] pl-8 scale-120 pr-2"
            ></div>
          </div>
        </div>
      </div>
      <!-- 点赞数 -->
      <div class="px-2 flex h-9 items-center">
        <img src="@/assets/images/dianzan.png" class="w-6 h-6" />
        <div class="px-2 text-[#47a4b3] text-sm">
          <span>{{ shuoshuo.likeNum }}</span
          >人觉得很赞
        </div>
      </div>
      <!-- 评论 -->
      <div class="h-10 flex items-center">
        <input type="text" class="flex-grow h-7 mx-2 pinglunkuang" />
      </div>
      <!-- 发表 -->
      <div class="flex items-center py-2">
        <!-- 左侧块 -->
        <div
          class="p-l-1 border-r-solid border-r-[1px] border-r-[#c7e5eb] flex flex-grow justify-between"
        >
          <div class="flex">
            <div
              class="iconfont icon-biaoqing text-[#7a9599] font-bold scale-120 px-1"
            ></div>
            <div class="iconfont icon-aite text-[#7a9599] font-bold px-1"></div>
            <div
              class="iconfont icon-huatifuhao text-[#7a9599] font-bold scale-120 px-1"
            ></div>
          </div>
        </div>
        <!-- 右侧块 -->
        <div class="flex p-r-1 items-center">
          <!-- 发表按钮 -->
          <div
            class="bg-[#5ccfe6] border-solid border-[#47c3d6] border-[1px] text-white w-16 h-6 justify-center flex items-center text-sm"
          >
            发表
          </div>
        </div>
      </div>
    </div>
    <!-- 说说列表结束 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  getUserAndFriendShuoshuoApi,
  publishShuoshuoApi,
  deleteShuoshuoApi,
  searchShuoshuoApi
} from '../../../api/shuoshuo/index'
import { getUserFriendsApi } from '../../../api/user/index'
import type {
  ShuoshuoModel,
  ShuoshuoResponse
} from '../../../api/shuoshuo/ShuoshuoModel'
import type { FriendListResponse, UserInfo } from '../../../api/user/UserModel'
import { useSearchStore } from '../../../store/shuoshuo/index'

const searchStore = useSearchStore()

// 说说列表数据
const shuoshuoList = ref<ShuoshuoModel[]>([])

// 好友列表数据
const friendsList = ref<UserInfo[]>([])

// 获取说说数据
const fetchShuoshuoList = async () => {
  try {
    let response: ShuoshuoResponse

    if (searchStore.keyword) {
      // 确保传入参数为 string 类型
      response = await searchShuoshuoApi(searchStore.keyword)
    } else {
      response = await getUserAndFriendShuoshuoApi()
    }

    // 确保 response.data 存在并为数组
    if (response && Array.isArray(response.data)) {
      shuoshuoList.value = response.data
    } else {
      console.error('响应数据结构不符合预期:', response)
      shuoshuoList.value = []
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    shuoshuoList.value = [] // 确保错误时列表清空
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString()
}

const isDropdownVisible = ref(false) // 控制下拉框的显示/隐藏
const selectedVisibility = ref('所有人可见') // 默认选中的可见范围

// 切换下拉框显示
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

// 弹窗控制变量
const isModalVisible = ref(false)

// 打开弹窗
const openModal = async () => {
  isModalVisible.value = true
  try {
    const response: FriendListResponse = await getUserFriendsApi()
    if (response && response.data && Array.isArray(response.data)) {
      friendsList.value = response.data
      console.log(friendsList.value)
    } else {
      console.error('好友列表数据结构不符合预期')
    }
  } catch (error) {
    console.error('获取好友列表失败:', error)
  }
}

// 关闭弹窗
const closeModal = () => {
  isModalVisible.value = false
}

// 控制打钩显示的状态
const isChecked = ref<Record<number, boolean>>({})

// 新增发布相关内容
const content = ref('')
const visibleUserIds = ref<number[]>([])

// 可见范围选择
const getVisibilityCode = () => {
  switch (selectedVisibility.value) {
    case '所有人可见':
      return 1
    case '部分好友可见':
      return 2
    case '仅自己可见':
      return 3
    default:
      return 1
  }
}

// 处理发布操作
const handlePublish = async () => {
  if (!content.value.trim()) {
    alert('内容不能为空')
    return
  }

  const visibility = getVisibilityCode()
  const params = {
    content: content.value,
    visibleScope: visibility,
    visibleUser: visibility === 2 ? visibleUserIds.value : []
  }

  try {
    await publishShuoshuoApi(params)
    // 发布成功后
    content.value = ''
    visibleUserIds.value = []
    isChecked.value = {}
    await fetchShuoshuoList()
  } catch (error) {
    console.error('发布失败:', error)
    alert('发布失败，请重试')
  }
}

// 修改选择可见范围方法
const selectVisibility = (visibility: string) => {
  selectedVisibility.value = visibility
  isDropdownVisible.value = false

  if (visibility === '部分好友可见') {
    openModal()
  } else {
    visibleUserIds.value = []
  }
}

// 修改切换勾选方法
const toggleCheck = (pkId: number) => {
  isChecked.value[pkId] = !isChecked.value[pkId]
  // 更新可见用户列表
  visibleUserIds.value = friendsList.value
    .filter((friend) => isChecked.value[friend.pkId])
    .map((friend) => friend.pkId)
}

// 控制下拉框显示与隐藏
const activeDropdownId = ref<number | null>(null)

// 切换下拉框的显示状态
const toggleEdit = (pkId: number) => {
  activeDropdownId.value = activeDropdownId.value === pkId ? null : pkId
}

// 各个选项的点击事件
const editPost = () => {
  // 在这里添加编辑说说的逻辑
}

const editTop = () => {
  // 在这里添加置顶说说的逻辑
}

// 删除说说
const deletePost = async (shuoshuoId: number) => {
  try {
    await deleteShuoshuoApi(shuoshuoId)
    // 删除成功后，刷新说说列表
    await fetchShuoshuoList()
    // 或者直接从列表中移除已删除的说说
    shuoshuoList.value = shuoshuoList.value.filter(
      (shuoshuo) => shuoshuo.pkId !== shuoshuoId
    )
  } catch (error) {
    console.error('删除说说失败:', error)
    alert('删除说说失败，请重试')
  }
}

// 监听搜索关键字变化
watch(
  () => searchStore.keyword,
  () => {
    fetchShuoshuoList()
  }
)

// 组件挂载时获取数据
onMounted(() => {
  fetchShuoshuoList()
})
</script>

<style scoped>
.shurukuang {
  outline: none;
}

.pinglunkuang {
  border: 1px solid #ddedf0;
  outline: none;
}

/* 控制下拉框的显示样式 */
.dropdown-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  width: 200px;
  margin-top: 10px;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f1f1f1;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 3px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 2px dashed #ddd;
}

.icon-close {
  font-size: 16px;
  color: #aaa;
}

.icon-close:hover {
  color: #555;
}

.friend {
  padding: 8px;
  border-radius: 8px;
  border: #fff solid 1px;
}

.friend:hover {
  background-color: #c7e0f3;
  border: #a5cbe9 solid 1px;
}

/* 下拉框样式 */
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background-color: #fff;
}
</style>
