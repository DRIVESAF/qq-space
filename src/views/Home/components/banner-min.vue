<!-- banner-min.vue -->
<template>
  <div class="flex flex-col flex-grow w-160">
    <!-- 发布说说开始 -->
    <div
      class="bg-white w-full h-25 cursor-pointer flex justify-between border-b-[#c7e5eb] border-b-solid border-b-[1px] shadow-[inset_0_2px_4px_#f7f7f7]"
    >
      <!-- 输入框 -->

      <textarea
        v-model="content"
        class="shurukuang w-full h-24 p-2 border border-[#ddedf0]"
        placeholder="说点什么..."
      ></textarea>

      <!-- AI 帮写按钮 -->
      <div
        @click="showAiWriteModal = true"
        class="w-35 justify-center flex items-center cursor-pointer text-[#7a9599] bg-[#e6f7fa] hover:bg-[#ffffff] hover:text-[#47a4b3]"
      >
        <i class="iconfont icon-wuguan scale-200"></i>
      </div>

      <!-- AI 帮写弹窗 -->
      <div
        v-if="showAiWriteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 w-[500px]">
          <div class="flex justify-between items-center mb-4">
            <div class="text-lg">AI帮写</div>
            <div
              class="cursor-pointer text-gray-500 hover:text-gray-700"
              @click="showAiWriteModal = false"
            >
              ×
            </div>
          </div>

          <!-- AI 输入框 -->
          <div class="mb-4 flex items-center justify-center">
            <textarea
              v-model="aiInput"
              class="w-120 border p-2 min-h-[100px]"
              placeholder="请输入你的需求，例如：帮我生成一首关于梅花的三行诗"
            ></textarea>
          </div>

          <!-- 按钮 -->
          <div class="flex justify-end gap-2">
            <button
              @click="showAiWriteModal = false"
              class="px-4 py-2 border border-solid border-[#ddedf0] rounded hover:bg-gray-100"
            >
              取消
            </button>
            <button
              @click="handleAiWrite"
              class="px-4 py-2 bg-[#5ccfe6] text-white border-none hover:bg-[#47c3d6]"
              :disabled="isGenerating"
            >
              {{ isGenerating ? '生成中...' : '生成' }}
            </button>
          </div>
        </div>
      </div>
      <!-- 功能框 -->
      <div class="flex">
        <!-- 照片 -->
        <div
          class="bg-[#e6f7fa] w-20 border-t border-b border-l border-r-none border-solid border-[#ddedf0] flex justify-center items-center hover:bg-white group relative"
        >
          <!-- 图标 -->
          <div
            class="iconfont icon-xiangji scale-200 text-[#7a9599] group-hover:text-[#47a4b3]"
          ></div>

          <!-- 下拉框 -->
          <div
            class="absolute top-full left-0 bg-white border border-solid border-[#ddedf0] shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <ul class="py-2 flex">
              <li
                class="py-2 w-10 hover:bg-[#e6f7fa] cursor-pointer border-t border-b border-l border-r-none border-[1px] border-solid border-[#ddedf0] justify-center items-center flex flex-col"
                @click="triggerFileInput"
              >
                <input
                  type="file"
                  ref="fileInput"
                  multiple
                  accept="image/*"
                  @change="handleFileSelect"
                  class="hidden"
                />
                <div
                  class="iconfont icon-diannao text-[#7a9599] scale-150 py-2"
                ></div>
                <div class="text-[#7a9599] text-xs">本地</div>
              </li>
              <li
                class="w-10 py-2 hover:bg-[#e6f7fa] cursor-pointer border-t border-b border-l border-r border-[1px] border-solid border-[#ddedf0] justify-center items-center flex flex-col"
              >
                <div
                  class="iconfont icon-shangchuantupian text-[#7a9599] scale-150 py-2"
                ></div>
                <div class="text-[#7a9599] text-xs">相册</div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 链接 -->
        <div
          class="bg-[#e6f7fa] w-20 border-t border-b border-l border-r border-solid border-[#ddedf0] flex justify-center items-center hover:bg-white group"
        >
          <div
            class="iconfont icon-huixingzhen scale-240 text-[#7a9599] group-hover:text-[#47a4b3]"
          ></div>
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
    <!-- 缩略图展示区域 -->
    <div class="pt-2 flex gap-2 flex-wrap w-150">
      <div
        v-for="(img, index) in selectedImages"
        :key="index"
        class="flex"
        @click="showImagePreview(img.url, index)"
      >
        <img :src="img.url" class="w-18 h-18" />
        <div class="close-btn" @click.stop="removeImage(index)">×</div>
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
          <div
            class="bg-green-200 w-15 h-15 rounded-full m-2 cursor-pointer"
            @click="goToUserProfile(shuoshuo.author)"
          >
            <img :src="shuoshuo.avatar" class="w-full h-full rounded-full" />
          </div>
          <div class="flex-col flex gap-2 px-3">
            <!-- 昵称 -->
            <div class="text-base">{{ shuoshuo.nickname }}</div>
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
              <li @click="collectPost" class="flex justify-center items-center">
                <div
                  class="iconfont icon-shoucang scale-110 pr-2 text-[#7a9599]"
                ></div>
                <div class="text-sm">收藏</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 说说内容 -->
      <div class="px-4">
        {{ shuoshuo.content }}
        <div class="flex gap-2 flex-wrap pt-2">
          <img
            v-for="(image, index) in shuoshuo.images"
            :key="index"
            :src="image"
            alt="shuoshuo image"
            class="w-49 h-49"
            @click="showImagePreview(shuoshuo.images, index)"
          />
        </div>
      </div>
      <!-- 互动 -->
      <div class="w-full h-10">
        <div class="p-2 flex items-center justify-between">
          <div class="text-sm text-[#7e8a8c]">浏览<span>0</span>次</div>
          <div class="flex items-center">
            <div
              class="iconfont icon-dianzan_kuai scale-140"
              :class="shuoshuo.isLiked ? 'text-[#47a4b3]' : 'text-[#7a9599]'"
              @click="like(shuoshuo.pkId)"
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
      <!-- 评论内容 -->
      <div class="p-2">
        <div
          v-for="comment in shuoshuo.comments"
          :key="comment.pkId"
          class="items-center gap-2"
        >
          <div class="flex justify-between">
            <div class="flex">
              <div class="flex">
                <img
                  :src="comment.commentAuthorAvatar"
                  class="w-10 h-10 rounded-full p-1"
                />
                <div class="px-2">
                  <div
                    class="text-[#157c8c] text-sm cursor-pointer"
                    @click="goToUserProfile(comment.commentAuthor)"
                  >
                    {{ comment.commentAuthorNickname }}
                  </div>
                  <div class="text-xs text-[#7e8e97]">
                    {{ formatDate(comment.createTime) }}
                  </div>
                </div>
                <div class="text-sm py-1">：</div>
              </div>
              <div>
                <div class="text-sm py-2">{{ comment.commentContent }}</div>
                <img
                  v-if="comment.image"
                  :src="comment.image"
                  alt=""
                  class="w-20 h-20"
                  @click="showImagePreview([comment.image], 0)"
                />
              </div>
            </div>
            <!-- 删除按钮 -->
            <div
              class="text-[#157c8c] text-sm cursor-pointer hover:text-[#47a4b3]"
              @click="handleDeleteComment(shuoshuo.pkId, comment.pkId)"
            >
              删除
            </div>
          </div>
        </div>
      </div>
      <!-- 评论框 -->
      <div class="flex items-center relative">
        <textarea
          v-model="comments[shuoshuo.pkId]"
          :class="[
            'pinglunkuang',
            { 'h-20': shuoshuo.isExpanded, 'h-7': !shuoshuo.isExpanded }
          ]"
          @focus="expandComment(shuoshuo)"
          @blur="collapseComment(shuoshuo)"
          rows="1"
          class="flex-grow mx-2 resize-none relative pr-8"
        />
        <div
          class="iconfont icon-xiangji text-[#7a9599] scale-110 py-2 absolute right-4 bottom-0"
          @click="triggerCommentFileInput(shuoshuo.pkId)"
        ></div>
      </div>
      <div v-if="commentImagePreviews[shuoshuo.pkId]" class="flex pt-2">
        <img :src="commentImagePreviews[shuoshuo.pkId]" class="w-20 h-20" />
        <div
          class="cursor-pointer iconfont icon-guanbi"
          @click="clearCommentImage(shuoshuo.pkId)"
        ></div>
      </div>
      <!-- 发表 -->
      <div class="flex items-center py-2">
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
        <div class="flex p-r-1 items-center">
          <div
            @click="publishComment(shuoshuo.pkId)"
            class="bg-[#5ccfe6] border-solid border-[#47c3d6] border-[1px] text-white w-16 h-6 justify-center flex items-center text-sm cursor-pointer"
          >
            发表
          </div>
        </div>
      </div>
    </div>
    <!-- 说说列表结束 -->
  </div>

  <!-- 图片预览模态框 -->
  <div v-if="showPreview" class="image-preview-modal">
    <div class="relative">
      <span class="close" @click="showPreview = false">&times;</span>
      <div
        class="navigation left"
        @click="currentImageIndex > 0 && currentImageIndex--"
        v-if="previewImages.length > 1"
      >
        ❮
      </div>
      <img :src="previewImages[currentImageIndex]" class="w-350" />
      <div
        class="navigation right"
        @click="
          currentImageIndex < previewImages.length - 1 && currentImageIndex++
        "
        v-if="previewImages.length > 1"
      >
        ❯
      </div>
    </div>
  </div>

  <input
    type="file"
    ref="commentFileInput"
    style="display: none"
    accept="image/*"
    @change="handleCommentImageSelect"
    :data-shuoshuo-id="currentShuoshuoId"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  getUserAndFriendShuoshuoApi,
  publishShuoshuoApi,
  searchShuoshuoApi,
  hasLikedShuoshuoApi,
  getLikeNumApi,
  aiWriteApi
} from '../../../api/shuoshuo/index'
import { getUserFriendsApi, likeShuoshuoApi } from '../../../api/user/index'
import type {
  ShuoshuoModel,
  ShuoshuoResponse
} from '../../../api/shuoshuo/ShuoshuoModel'
import type { FriendListResponse, UserInfo } from '../../../api/user/UserModel'
import { useSearchStore } from '../../../store/shuoshuo/index'
import {
  getAllowAccessScopeByUserIdApi,
  getSpaceQuestionByUserIdApi,
  accessSpaceApi
} from '../../../api/space/index.ts'
import {
  getUserPhotoAlbumsApi,
  createPhotoAlbumApi
} from '../../../api/album/index'
import { uploadPhotoApi } from '../../../api/photo/index'
import { useUserStore } from '../../../store/user/index.ts'
import { useRouter } from 'vue-router'

const selectedImages = ref<Array<{ file: File; url: string }>>([])
const showPreview = ref(false)
const currentImageIndex = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)
const currentShuoshuoId = ref<number | null>(null)

const store = useUserStore()
const currentUser = store.getUserInfo?.pkId

// AI 帮写相关的响应式变量
const showAiWriteModal = ref(false)
const aiInput = ref('')
const isGenerating = ref(false)

import {
  publishCommentApi,
  getCommentsApi,
  deleteCommentApi
} from '../../../api/comment/index'

const searchStore = useSearchStore()
const comments = ref<{ [key: number]: string }>({})
const commentImages = ref<{ [key: number]: File | null }>({})
const commentImagePreviews = ref<{ [key: number]: string | null }>({})
const commentFileInput = ref<HTMLInputElement | null>(null)

const router = useRouter()

// 处理 AI 帮写
const handleAiWrite = async () => {
  if (!aiInput.value.trim()) {
    alert('请输入需求')
    return
  }

  try {
    isGenerating.value = true
    const response = await aiWriteApi(aiInput.value.trim())

    if (response.code === 0) {
      // 将生成的内容添加到输入框
      content.value = response.data
      // 关闭弹窗并清空输入
      showAiWriteModal.value = false
      aiInput.value = ''
    } else {
      alert('生成失败：' + response.msg)
    }
  } catch (error) {
    console.error('AI 帮写失败:', error)
    alert('AI 帮写失败，请重试')
  } finally {
    isGenerating.value = false
  }
}

// 获取评论的方法
const fetchComments = async (shuoshuoId: number) => {
  try {
    const response = await getCommentsApi(shuoshuoId)

    if (response.code === 0) {
      // 更新对应说说的评论
      const shuoshuo = shuoshuoList.value.find((s) => s.pkId === shuoshuoId)
      if (shuoshuo) {
        shuoshuo.comments = response.data
      }
    } else {
      console.error('获取评论失败:', response.msg)
    }
  } catch (error) {
    console.error('获取评论失败:', error)
  }
}

// 删除评论的方法
const handleDeleteComment = async (shuoshuoId: number, commentId: number) => {
  try {
    if (confirm('确定要删除这条评论吗？')) {
      await deleteCommentApi(commentId)
      // 删除成功后立即更新评论列表
      await fetchComments(shuoshuoId)
    }
  } catch (error) {
    console.error('删除评论失败:', error)
    alert('删除评论失败，请重试')
  }
}

// 清除图片
const clearCommentImage = (shuoshuoId: number) => {
  commentImages.value[shuoshuoId] = null
  commentImagePreviews.value[shuoshuoId] = null
}

// 触发评论图片选择
const triggerCommentFileInput = (shuoshuoId: number) => {
  currentShuoshuoId.value = shuoshuoId // 保存当前说说ID
  commentFileInput.value?.click()
}
const handleCommentImageSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const shuoshuoId = currentShuoshuoId.value // 获取保存的说说ID

  if (!shuoshuoId) {
    console.error('未找到说说ID')
    return
  }

  if (input.files?.length) {
    const file = input.files[0]

    // 文件校验
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过5MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    // 赋值图片文件
    commentImages.value[shuoshuoId] = file

    // 生成预览图
    const reader = new FileReader()
    reader.onload = (e) => {
      commentImagePreviews.value[shuoshuoId] = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
// 发布评论
const publishComment = async (shuoshuoId: number) => {
  if (!comments.value[shuoshuoId]?.trim() && !commentImages.value[shuoshuoId]) {
    alert('评论内容或图片不能为空')
    return
  }

  try {
    const response = await publishCommentApi(
      shuoshuoId,
      comments.value[shuoshuoId]?.trim() || '',
      commentImages.value[shuoshuoId] || undefined
    )

    if (response.code === 0) {
      // 清空当前说说的评论内容和图片
      comments.value[shuoshuoId] = ''
      commentImages.value[shuoshuoId] = null
      commentImagePreviews.value[shuoshuoId] = null

      // 立即获取最新评论列表
      await fetchComments(shuoshuoId)

      // 强制刷新整个说说列表
      await fetchShuoshuoList() // 确保整个列表被重新获取并更新
    }
  } catch (error) {
    console.error('评论发布失败:', error)
    alert('评论发布失败，请重试')
  }
}

const expandComment = (shuoshuo: ShuoshuoModel) => {
  // 展开当前评论框并收起其他评论框
  shuoshuo.isExpanded = true
  // 关闭其他评论框
  shuoshuoList.value.forEach((item) => {
    if (item.pkId !== shuoshuo.pkId) {
      item.isExpanded = false
    }
  })
}

const collapseComment = (shuoshuo: ShuoshuoModel) => {
  if (!comments.value[shuoshuo.pkId]?.trim()) {
    shuoshuo.isExpanded = false
  }
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

const like = async (shuoshuoId: number) => {
  try {
    await likeShuoshuoApi(shuoshuoId)
    console.log('点赞成功')

    // 更新当前说说的点赞状态
    const shuoshuo = shuoshuoList.value.find((s) => s.pkId === shuoshuoId)
    if (shuoshuo) {
      shuoshuo.isLiked = !shuoshuo.isLiked
      // 重新获取点赞数
      await fetchLikeNum(shuoshuoId)
    }
  } catch (error) {
    console.error('点赞失败', error)
  }
}

// 获取点赞数的方法
const fetchLikeNum = async (shuoshuoId: number) => {
  try {
    const response = await getLikeNumApi(shuoshuoId)
    if (response.code === 0) {
      // 更新说说列表中的点赞数
      const shuoshuo = shuoshuoList.value.find((s) => s.pkId === shuoshuoId)
      if (shuoshuo) {
        shuoshuo.likeNum = response.data
      }
    } else {
      console.error('获取点赞数失败:', response.msg)
    }
  } catch (error) {
    console.error('获取点赞数失败:', error)
  }
}

// 处理文件选择
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    Array.from(input.files).forEach((file) => {
      if (selectedImages.value.length >= 30) {
        alert('最多选择30张图片')
        return
      }
      // 检查文件大小
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        alert('文件大小不能超过5MB')
        return
      }
      // 检查文件格式
      if (!file.type.startsWith('image/')) {
        alert('请上传图片文件')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        selectedImages.value.push({
          file,
          url: e.target?.result as string
        })
      }
      reader.readAsDataURL(file)
    })
  }
}

// 移除图片
const removeImage = (index: number) => {
  selectedImages.value.splice(index, 1)
}

// 添加新的数据属性
const previewImages = ref<string[]>([]) // 存储当前预览的图片列表

// 修改图片预览方法
const showImagePreview = (images: string[], startIndex: number) => {
  previewImages.value = images
  currentImageIndex.value = startIndex
  showPreview.value = true
}

// 上传图片到相册
const uploadImagesToAlbum = async () => {
  try {
    console.log('获取用户相册...')
    const albumsRes = await getUserPhotoAlbumsApi(currentUser as number)
    let targetAlbum = albumsRes.data?.[albumsRes.data.length - 1]

    if (!targetAlbum) {
      console.log('未找到相册，创建默认相册...')
      await createPhotoAlbumApi({
        albumName: '说说和日志相册',
        albumDesc: '系统自动创建的默认相册',
        coverUrl:
          'https://first-buckt.oss-cn-nanjing.aliyuncs.com/2025/01/19/ada9ddc2-033c-4ccc-8586-78cd5b5d3f34.jpg',
        visibleScope: 3
      })
      const newAlbumsRes = await getUserPhotoAlbumsApi(currentUser as number)
      targetAlbum = newAlbumsRes.data?.[newAlbumsRes.data.length - 1]
    }

    console.log('目标相册:', targetAlbum)

    const uploadPromises = selectedImages.value.map(async (img) => {
      console.log('开始上传图片:', img.file.name)
      const photo = await uploadPhotoApi(img.file, targetAlbum.photoAlbumId)
      console.log('上传返回结果:', photo) // 输出完整的返回值结构，检查是否包含 photoUrl

      console.log('图片上传成功，URL:', photo.photoUrl)
      return photo.photoUrl
    })

    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('图片上传失败:', error)
    throw error
  }
}

// 修改发布处理函数
const handlePublish = async () => {
  if (!content.value.trim() && selectedImages.value.length === 0) {
    alert('内容或图片不能为空')
    return
  }

  try {
    // 上传图片并获取URL列表
    const imageUrls =
      selectedImages.value.length > 0 ? await uploadImagesToAlbum() : []

    // 发布说说参数
    const params = {
      content: content.value,
      visibleScope: getVisibilityCode(),
      visibleUser: visibleUserIds.value,
      images: imageUrls
    }

    console.log('发布参数:', params) // 增加日志输出

    await publishShuoshuoApi(params)

    // 重置状态
    content.value = ''
    selectedImages.value = []
    visibleUserIds.value = []
    await fetchShuoshuoList()
  } catch (error) {
    console.error('发布失败:', error)
    alert('发布失败，请重试')
  }
}

// 说说列表数据
const shuoshuoList = ref<ShuoshuoModel[]>([])

// 好友列表数据
const friendsList = ref<UserInfo[]>([])

// 获取说说数据
const fetchShuoshuoList = async () => {
  try {
    let response: ShuoshuoResponse

    if (searchStore.keyword) {
      response = await searchShuoshuoApi(searchStore.keyword)
    } else {
      response = await getUserAndFriendShuoshuoApi()
    }

    if (response && Array.isArray(response.data)) {
      shuoshuoList.value = await Promise.all(
        response.data.map(async (shuoshuo) => {
          const [isLikedRes, likeNumRes, commentsRes] = await Promise.all([
            hasLikedShuoshuoApi(shuoshuo.pkId),
            getLikeNumApi(shuoshuo.pkId),
            getCommentsApi(shuoshuo.pkId) // 获取评论
          ])

          return {
            ...shuoshuo,
            isLiked: isLikedRes.code === 0 ? isLikedRes.data : false,
            likeNum: likeNumRes.code === 0 ? likeNumRes.data : 0,
            comments: commentsRes.code === 0 ? commentsRes.data : [] // 保存评论
          }
        })
      )
    }
  } catch (error) {
    console.error('获取数据失败:', error)
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
const collectPost = () => {
  // 在这里添加编辑说说的逻辑
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
  shuoshuoList.value.forEach((shuoshuo) => {
    fetchLikeNum(shuoshuo.pkId)
  })
  if (shuoshuoList.value.length > 0) {
    fetchComments(shuoshuoList.value[0].pkId)
  }
})

const goToUserProfile = async (userId: number) => {
  try {
    console.log('开始访问用户空间，用户ID:', userId)

    // 1. 调用查询空间权限接口
    console.log('调用查询空间权限接口...')
    const accessScopeResponse = await getAllowAccessScopeByUserIdApi(userId)
    console.log('查询空间权限接口返回结果:', accessScopeResponse)
    const accessScope = accessScopeResponse.data
    console.log('用户空间权限值:', accessScope)

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
      console.log('用户输入的答案:', userAnswer)
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
</script>

<style scoped>
.shurukuang {
  outline: none;
}

.pinglunkuang {
  border: 1px solid #ddedf0;
  outline: none;
  transition: height 0.3s ease;
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
  background-color: white;
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
  width: 600px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  background-color: #fff;
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

.close-btn {
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.remaining-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview-modal img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

.navigation {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 40px;
  cursor: pointer;
  padding: 20px;
  user-select: none;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}

.navigation:hover {
  background: rgba(0, 0, 0, 0.5);
}

.left {
  left: -60px;
}
.right {
  right: 20px;
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 40px;
  cursor: pointer;
}
</style>
