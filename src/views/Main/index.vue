<template>
  <div class="mx-100 mt-8 flex">
    <!-- 个人信息开始 -->
    <div class="w-80">
      <!-- 统计 -->
      <div
        class="bg-white w-full h-25 border-[1px] border-[#c7e5eb] border-solid flex justify-center items-center"
      >
        <!-- 照片 -->
        <div
          class="px-6 flex flex-col justify-center items-center border-r-[1px] border-r-solid border-r-[#ddedf0]"
        >
          <div class="text-2xl">107</div>
          <div>照片</div>
        </div>
        <!-- 说说 -->
        <div
          class="px-6 flex flex-col justify-center items-center border-r-[1px] border-r-solid border-r-[#ddedf0]"
        >
          <div class="text-2xl">11</div>
          <div>说说</div>
        </div>
        <!-- 日志 -->
        <div class="px-6 flex flex-col justify-center items-center">
          <div class="text-2xl">0</div>
          <div>日志</div>
        </div>
      </div>
      <!-- 信息 -->
      <div
        class="h-50 flex flex-col bg-white border-[1px] border-[#c7e5eb] border-solid mt-3"
      >
        <div
          class="font-bold bg-[#f2fdff] p-2 border-b-[1px] border-b-[#c7e5eb] border-b-solid"
        >
          个人档
        </div>
        <!-- 昵称 -->
        <div
          class="mx-4 border-b-[1px] border-b-[#c7e5eb] border-b-solid py-2 flex items-center"
        >
          <div
            class="iconfont icon-dangkouziliao-moren text-[#7a9599] font-bold"
          ></div>
          <div class="text-sm px-3">。</div>
        </div>
        <!-- 性别 -->
        <div
          class="mx-4 border-b-[1px] border-b-[#c7e5eb] border-b-solid py-2 flex items-center"
        >
          <div class="iconfont icon-xingbie text-[#7a9599] font-bold"></div>
          <div class="text-sm px-3">女</div>
        </div>
        <!-- 生日 -->
        <div
          class="mx-4 border-b-[1px] border-b-[#c7e5eb] border-b-solid py-2 flex items-center"
        >
          <div
            class="iconfont icon-shengri text-[#7a9599] font-bold scale-120"
          ></div>
          <div class="text-sm px-3">2025-1-3</div>
        </div>
        <!-- 工作 -->
        <div class="mx-4 py-2 flex items-center">
          <div class="iconfont icon-gongwenbao text-[#7a9599] font-bold"></div>
          <div class="text-sm px-3">无</div>
        </div>
      </div>
    </div>
    <!-- 个人信息结束 -->
    <!-- 用户说说开始 -->
    <div class="flex flex-col flex-grow ml-5">
      <!-- 说说列表开始 -->
      <div
        v-for="shuoshuo in shuoshuoList"
        :key="shuoshuo.pkId"
        class="bg-white w-full mb-4 p-2"
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
        <div class="px-2 py-3">
          {{ shuoshuo.content }}
        </div>
        <!-- 互动 -->
        <div class="w-full py-1">
          <div class="px-2 py-1 flex items-center justify-between">
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
        <div class="px-2 flex items-center py-1">
          <img src="@/assets/images/dianzan.png" class="w-6 h-6" />
          <div class="px-2 text-[#47a4b3] text-sm">
            <span>{{ shuoshuo.likeNum }}</span
            >人觉得很赞
          </div>
        </div>
        <!-- 评论 -->
        <div class="p-2 flex items-center">
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
              <div
                class="iconfont icon-aite text-[#7a9599] font-bold px-1"
              ></div>
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
    <!-- 用户说说结束 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getUserShuoshuoApi, deleteShuoshuoApi } from '../../api/shuoshuo/index'
import { useUserStore } from '../../store/user/index.ts'
import type { ShuoshuoModel } from '../../api/shuoshuo/ShuoshuoModel'
import { useSearchStore } from '../../store/shuoshuo/index'

const searchStore = useSearchStore()
// 获取用户 Store
const store = useUserStore()
// 说说列表数据
const shuoshuoList = ref<ShuoshuoModel[]>([])

// 获取说说数据
const fetchShuoshuoList = async () => {
  try {
    // 从 Pinia 中获取用户信息
    const authorId = store.userInfo.pkId

    // 调用 API 获取说说列表
    const response = await getUserShuoshuoApi(authorId)

    // 将获取到的说说列表赋值给 shuoshuoList
    shuoshuoList.value = response.data
    console.log(shuoshuoList.value)
  } catch (error) {
    console.error('获取说说列表失败:', error)
    alert('获取说说列表失败，请重试')
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString()
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
.pinglunkuang {
  border: 1px solid #ddedf0;
  outline: none;
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
