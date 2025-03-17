<template>
  <div class="bg-[#dcf1f5] mx-40 px-20 w-auto mt-8 pb-10">
    <!-- Tab 切换开始 -->
    <div
      class="border-b-[#c7e5eb] border-b-solid border-b-[2px] flex justify-between items-center"
    >
      <div class="flex space-x-8 px-4 pt-4">
        <!-- 相册 -->
        <div
          :class="[
            'cursor-pointer pb-4',
            {
              'font-bold border-b-[#157c8c] border-b-solid border-b-[2px]':
                activeTab === 'album'
            }
          ]"
          @click="activeTab = 'album'"
        >
          相册
        </div>
        <!-- 照片 -->
        <div
          :class="[
            'cursor-pointer pb-4',
            {
              'font-bold border-b-[#157c8c] border-b-solid border-b-[2px]':
                activeTab === 'photo'
            }
          ]"
          @click="activeTab = 'photo'"
        >
          照片
        </div>
      </div>

      <div class="flex gap-5">
        <div class="flex items-center">
          <div class="iconfont icon-yingyong text-[#7a9599]"></div>
          <div class="pl-1 text-[#7a9599]">应用</div>
        </div>
        <div class="flex items-center">
          <div
            class="iconfont icon-icon-mianxing_fuzhi_shanchu text-[#7a9599] scale-150"
          ></div>
          <div class="pl-1 text-[#7a9599]">回收站</div>
        </div>
      </div>
    </div>
    <!-- Tab 切换结束 -->

    <!-- Tab 内容开始 -->
    <!-- 相册内容 -->
    <div v-if="activeTab === 'album'">
      <!-- 顶部操作栏 -->
      <div class="flex justify-between">
        <div class="flex py-5 gap-3">
          <!--           <div
            class="flex items-center bg-[#5ccfe6] px-4 py-2 border-[1px] border-[#47c3d6] border-solid text-white cursor-pointer"
            @click="showUploadModal"
          >
            <div
              class="iconfont icon-tianjiatupian_huaban scale-140 px-1"
            ></div>
            <div>上传照片</div>
          </div>
          <div
            class="flex items-center bg-[#f2fdff] px-4 py-2 border-[1px] border-[#c7e5eb] border-solid cursor-pointer"
            @click="showCreateAlbumModal = true"
          >
            创建相册
          </div> -->
        </div>
        <div class="flex items-center gap-4">
          <div class="text-sm">已用15.68M容量，开通黄钻获得更大容量</div>
          <div
            class="flex items-center bg-[#fedc5b] py-1 px-2 border-[1px] border-[#f7be6c] border-solid"
          >
            <img
              src="@/assets/images/huangzuan.png"
              mode="scaleToFill"
              class="w-5 h-5"
            />
            <div class="text-sm text-[#825b3d]">开通黄钻</div>
          </div>
        </div>
      </div>
      <!-- 相册内容区 -->
      <div class="flex gap-9 flex-wrap">
        <!-- 单个相册开始 -->
        <div
          v-for="album in albums"
          :key="album.photoAlbumId"
          class="bg-white w-55 p-3 relative group"
        >
          <!-- 封面图和相册名 -->
          <router-link
            :to="{ name: 'AlbumDetail', params: { id: album.photoAlbumId } }"
            @click="selectAlbum(album)"
            class="text-black no-underline"
          >
            <img :src="album.coverUrl" class="w-55 h-55" />
            <div class="flex items-center pt-3 justify-between">
              <div>{{ album.albumName }}</div>
              <!-- 只有当相册的可见范围是私密时，才显示上锁图标 -->
              <div
                v-if="album.visibleScope === 3"
                class="iconfont icon-suo text-[#7a9599] font-bold scale-120"
              ></div>
            </div>
          </router-link>

          <!-- 操作 -->
          <div
            @click.stop="toggleDropdown(album.photoAlbumId)"
            class="iconfont icon-xiala absolute right-5 top-5 bg-white border-[1px] border-[#c7e5eb] border-solid text-[#888888] p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <!-- 下拉框 -->
          <div
            v-if="dropdownStates[album.photoAlbumId]"
            class="absolute right-0 mt-2 w-28 shadow-md z-10 top-10"
          >
            <button
              class="block w-full px-4 py-2 text-left hover:font-bold border-none bg-white flex"
              @click.stop="edit(album)"
            >
              <div
                class="iconfont icon-bianji scale-130 pr-1 text-[#888888] font-bold"
              ></div>
              编辑
            </button>
            <button
              class="block w-full px-4 py-2 text-left hover:font-bold border-none bg-white flex"
              @click.stop="remove(album.photoAlbumId)"
            >
              <div
                class="iconfont icon-icon-mianxing_fuzhi_shanchu scale-130 pr-1 text-[#888888]"
              ></div>
              删除
            </button>
          </div>
        </div>
        <!-- 单个相册结束 -->
      </div>
    </div>
    <!-- 照片内容 -->
    <div v-if="activeTab === 'photo'">
      <!-- 单个照片开始 -->
      <!-- 遍历照片数据 -->
      <div v-for="photo in photos" :key="photo.photoId" class="flex pt-6">
        <!-- 日期 -->
        <div class="flex flex-col items-end">
          <div class="text-[#8a8a9a]">{{ formatDate(photo.uploadTime) }}</div>
          <div class="text-xs text-[#8a8a9a] pt-2">
            {{ formatYear(photo.uploadTime) }}
          </div>
        </div>
        <div>
          <img
            :src="photo.photoUrl"
            alt=""
            class="w-80 h-80 pl-2"
            @click="handlePhotoClick(photo)"
          />
          <div class="flex gap-4 text-sm text-[#157c8c] pt-2">
            <div>赞</div>
            <div>评论</div>
            <div>转发</div>
            <div>删除</div>
          </div>
        </div>
      </div>
      <!-- 单个照片结束 -->
    </div>
    <!-- Tab 内容结束 -->

    <!-- 创建相册弹窗 -->
    <div
      v-if="showCreateAlbumModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white w-120">
        <div class="flex justify-between bg-[#f3f3f3] p-2 mb-4">
          <h2 class="text-sm font-bold">创建相册</h2>
          <button class="border-none" @click="showCreateAlbumModal = false">
            <div class="iconfont icon-guanbi"></div>
          </button>
        </div>

        <!-- 表单 -->
        <form @submit.prevent="handleCreateAlbum">
          <div class="mb-4 flex justify-center">
            <label class="block text-sm font-medium mb-2 pr-2">相册名称:</label>
            <input
              v-model="newAlbumName"
              type="text"
              class="w-50 h-4 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
              required
            />
          </div>

          <div class="mb-4 flex justify-center">
            <label class="block text-sm font-medium mb-2 pr-2">相册描述:</label>
            <textarea
              v-model="newAlbumDesc"
              class="w-50 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
              rows="3"
            ></textarea>
          </div>

          <div class="mb-4 flex justify-center">
            <label class="block text-sm font-medium mb-2 pr-2">可见范围:</label>
            <select
              v-model="visibleScope"
              class="w-55 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
            >
              <option value="public">公开</option>
              <option value="private">私密</option>
            </select>
          </div>

          <div class="mb-4 flex flex-col items-center">
            <label class="block text-sm font-medium mb-2">封面图片:</label>
            <div
              class="w-50 h-50 border border-gray-300 rounded-sm overflow-hidden flex items-center justify-center bg-gray-100"
            >
              <img
                v-if="coverUrl"
                :src="coverUrl"
                alt="封面图片"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-gray-500 text-sm">请选择图片</div>
            </div>
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="hidden"
              ref="fileInput"
            />
            <button
              @click="triggerFileInput"
              class="bg-[#51b5eb] text-white px-2 py-1 mt-2 rounded-sm border-[1px] border-[#4c92c8] border-solid text-sm m-1 cursor-pointer"
            >
              选择图片
            </button>
          </div>

          <div class="flex justify-end bg-[#f3f3f3] cursor-pointer">
            <button
              type="submit"
              class="bg-[#51b5eb] text-white px-2 rounded-sm border-[1px] border-[#4c92c8] border-solid text-sm m-1 cursor-pointer"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- 编辑相册弹窗 -->
    <div
      v-if="showEditAlbumModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-3 z-50"
    >
      <div class="bg-white w-120">
        <div class="flex justify-between bg-[#f3f3f3] p-2 mb-4">
          <h2 class="text-sm font-bold">编辑相册</h2>
          <button class="border-none" @click="showEditAlbumModal = false">
            <div class="iconfont icon-guanbi"></div>
          </button>
        </div>

        <!-- 表单 -->
        <form @submit.prevent="handleEditAlbum">
          <div class="mb-4 flex justify-center">
            <label class="block text-sm font-medium mb-2 pr-2">相册名称:</label>
            <input
              v-model="editAlbumName"
              type="text"
              class="w-50 h-4 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
              required
            />
          </div>

          <div class="mb-4 flex justify-center">
            <label class="block text-sm font-medium mb-2 pr-2">相册描述:</label>
            <textarea
              v-model="editAlbumDesc"
              class="w-50 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
              rows="3"
            ></textarea>
          </div>

          <div class="mb-4 flex justify-center">
            <label class="block text-sm font-medium mb-2 pr-2">可见范围:</label>
            <select
              v-model="editVisibleScope"
              class="w-55 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
            >
              <option value="public">公开</option>
              <option value="private">私密</option>
            </select>
          </div>

          <div class="mb-4 flex flex-col items-center">
            <label class="block text-sm font-medium mb-2">封面图片:</label>
            <div
              class="w-50 h-50 border border-gray-300 rounded-sm overflow-hidden flex items-center justify-center bg-gray-100"
            >
              <img
                v-if="editCoverUrl"
                :src="editCoverUrl"
                alt="封面图片"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-gray-500 text-sm">请选择图片</div>
            </div>
            <input
              type="file"
              accept="image/*"
              @change="handleEditFileChange"
              class="hidden"
              ref="editFileInput"
            />
            <button
              @click="triggerEditFileInput"
              type="button"
              class="bg-[#51b5eb] text-white px-2 py-1 mt-2 rounded-sm border-[1px] border-[#4c92c8] border-solid text-sm m-1 cursor-pointer"
            >
              选择图片
            </button>
          </div>

          <div class="flex justify-end bg-[#f3f3f3]">
            <button
              type="submit"
              class="bg-[#51b5eb] text-white px-2 rounded-sm border-[1px] border-[#4c92c8] border-solid text-sm m-1"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- 上传照片的弹窗 -->
    <a-modal
      v-model:visible="uploadModalVisible"
      @ok="handleUpload"
      title="上传照片"
      :ok-button-props="{
        disabled: !file,
        style: {
          backgroundColor: '#5caae6',
          borderColor: '#5caae6',
          color: 'white',
          border: '1px solid #4798d6'
        }
      }"
      :cancel-button-props="{ style: { display: 'none' } }"
      :closable="true"
      okText="确定"
    >
      <div class="flex items-center">
        <div>上传到</div>
        <a-select
          v-model:value="selectedAlbumId"
          class="px-2 text-[#73b4e0]"
          placeholder="选择相册"
          style="width: 200px"
        >
          <a-select-option
            v-for="album in albums"
            :key="album.photoAlbumId"
            :value="album.photoAlbumId"
          >
            {{ album.albumName }}
          </a-select-option>
        </a-select>
      </div>
      <a-upload
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="flex justify-center items-center"
      >
        <div class="upload-area py-6">
          <a-button
            class="flex rounded-none bg-[#5caae6] text-white border-[#4798d6] border-[1px] border-solid"
          >
            <div
              class="iconfont icon-tianjiatupian_huaban scale-140 px-1"
            ></div>
            <div>选择照片</div>
          </a-button>
        </div>
      </a-upload>
      <div class="preview-area" v-if="file">
        <img :src="previewImage" alt="预览" class="preview-image" />
      </div>
    </a-modal>
    <!-- 照片详情弹窗 -->
    <div
      v-if="showPhotoDetailModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @click.self="closePhotoDetailModal"
    >
      <div class="bg-white p-6 rounded-lg relative">
        <!-- 关闭按钮 -->
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white border-none"
          @click="closePhotoDetailModal"
        >
          <div class="iconfont icon-guanbi scale-125"></div>
        </button>

        <!-- 大图 -->
        <img
          :src="selectedPhoto?.photoUrl"
          alt="照片详情"
          class="max-w-[80vw] max-h-[80vh]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getUserPhotoAlbumsApi,
  createPhotoAlbumApi,
  editPhotoAlbumApi,
  uploadImageApi,
  deletePhotoAlbumApi
} from '../../api/album'
import { uploadPhotoApi, getUserPhotosApi } from '../../api/photo/index.ts'
import type { PhotoAlbumModel } from '../../api/album/AlbumModel'
import { useFriendStore } from '../../store/user/friend.ts'
import { usePhotoAlbumStore } from '../../store/album/index.ts'
const photos = ref<PhotoModel[]>([])
const activeTab = ref('album')
const albums = ref<PhotoAlbumModel[]>([])
const showCreateAlbumModal = ref(false)
const newAlbumName = ref('')
const newAlbumDesc = ref('')
const visibleScope = ref<'public' | 'private'>('public')
const coverUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)

// 编辑相册
const showEditAlbumModal = ref(false)
const editAlbumName = ref('')
const editAlbumDesc = ref('')
const editVisibleScope = ref<'public' | 'private'>('public')
const editCoverUrl = ref<string | null>(null)
const editFileInput = ref<HTMLInputElement | null>(null)
const selectedEditFile = ref<File | null>(null)
const currentAlbumId = ref<number | null>(null)
const dropdownStates = ref<{ [key: number]: boolean }>({})

const store = useFriendStore()

const userId = store.getUserInfo?.pkId

// 在 script 部分添加以下代码
const selectedPhoto = ref<PhotoModel | null>(null) // 存储当前选中的照片
const showPhotoDetailModal = ref(false) // 控制弹窗的显示和隐藏

// 点击照片时触发的方法
const handlePhotoClick = (photo: PhotoModel) => {
  selectedPhoto.value = photo // 设置选中的照片
  showPhotoDetailModal.value = true // 显示弹窗
}

// 关闭弹窗的方法
const closePhotoDetailModal = () => {
  showPhotoDetailModal.value = false
  selectedPhoto.value = null
}

// 获取用户照片
const fetchUserPhotos = async (userId: number) => {
  try {
    const photosData = await getUserPhotosApi(userId)
    photos.value = photosData // 将获取到的照片数据赋值给 photos
  } catch (error) {
    console.error('获取用户照片出错:', error)
  }
}

fetchUserPhotos(userId).then((photos) => {
  // 在这里处理照片数据，例如设置到状态中以渲染到页面
  console.log('照片数据已加载', photos)
})

// 创建相册的文件选择框
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 编辑相册的文件选择框
const triggerEditFileInput = () => {
  editFileInput.value?.click()
}

const PhotoAlbumStore = usePhotoAlbumStore()

function selectAlbum(album: PhotoAlbumModel) {
  PhotoAlbumStore.setSelectedAlbum(album)
}

// 上传照片的弹窗相关逻辑
const uploadModalVisible = ref(false)
const file = ref<File | null>(null)
const previewImage = ref<string | null>(null)

const showUploadModal = () => {
  uploadModalVisible.value = true
}

const beforeUpload = (selectedFile: File) => {
  file.value = selectedFile
  previewImage.value = URL.createObjectURL(selectedFile)
  return false // 阻止自动上传
}

const selectedAlbumId = ref<number | null>(null)

const handleUpload = async () => {
  if (file.value && selectedAlbumId.value) {
    try {
      // 调用上传接口
      await uploadPhotoApi(file.value, selectedAlbumId.value)

      // 关闭弹窗并清空文件
      uploadModalVisible.value = false
      file.value = null
      previewImage.value = null
      selectedAlbumId.value = null
    } catch (error) {
      console.error('照片上传失败:', error)
    }
  } else {
    message.error('请选择相册和照片')
  }
}
// 处理编辑相册的文件选择
const handleEditFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedEditFile.value = file // 更新为选中的文件
    try {
      const imageUrl = await uploadImageApi(file)
      editCoverUrl.value = imageUrl // 更新封面 URL
    } catch (error) {
      console.error('编辑相册上传图片失败:', error)
    }
  }
}

// 切换下拉框显示状态
const toggleDropdown = (albumId: number) => {
  dropdownStates.value = {
    ...dropdownStates.value,
    [albumId]: !dropdownStates.value[albumId]
  }
}

// 打开编辑相册弹窗
const openEditAlbumModal = (album: PhotoAlbumModel) => {
  currentAlbumId.value = album.photoAlbumId
  editAlbumName.value = album.albumName
  editAlbumDesc.value = album.albumDesc
  editVisibleScope.value = album.visibleScope === 1 ? 'public' : 'private'
  editCoverUrl.value = album.coverUrl
  showEditAlbumModal.value = true
}

// 上传图片的公共逻辑
const uploadImage = async (file: File): Promise<string | null> => {
  try {
    return await uploadImageApi(file)
  } catch (error) {
    console.error('上传图片失败:', error)
    alert('图片上传失败，请重试')
    return null
  }
}

// 处理编辑相册表单提交
const handleEditAlbum = async () => {
  if (!editAlbumName.value.trim()) {
    alert('相册名称不能为空')
    return
  }

  try {
    let uploadedCoverUrl = editCoverUrl.value

    if (selectedEditFile.value) {
      uploadedCoverUrl = await uploadImage(selectedEditFile.value)
    }

    const photoAlbum = {
      photoAlbumId: currentAlbumId.value,
      albumName: editAlbumName.value,
      albumDesc: editAlbumDesc.value,
      coverUrl: uploadedCoverUrl,
      visibleScope: editVisibleScope.value === 'public' ? 1 : 3
    }

    await editPhotoAlbumApi(photoAlbum)

    showEditAlbumModal.value = false
    fetchAlbums()
    resetEditForm()
  } catch (error) {
    console.error('编辑相册失败:', error)
    alert('编辑相册失败，请重试')
  }
}

// 重置编辑表单
const resetEditForm = () => {
  editAlbumName.value = ''
  editAlbumDesc.value = ''
  editVisibleScope.value = 'public'
  editCoverUrl.value = null
  selectedEditFile.value = null
  currentAlbumId.value = null
}

// 处理文件选择
const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFile.value = file
    try {
      const imageUrl = await uploadImageApi(file)
      coverUrl.value = imageUrl
    } catch (error) {
      console.error('上传图片失败:', error)
    }
  }
}

// 编辑相册
const edit = (album: PhotoAlbumModel) => {
  openEditAlbumModal(album)
  dropdownStates.value = {
    ...dropdownStates.value,
    [album.photoAlbumId]: false
  } // 隐藏下拉框
}
// 删除相册
const remove = async (albumId: number) => {
  try {
    await deletePhotoAlbumApi(albumId)
    fetchAlbums() // 刷新相册列表
  } catch (error) {
    console.error('删除相册失败', error)
    alert('删除相册失败，请重试')
  }
}

// 创建相册
const handleCreateAlbum = async () => {
  if (!newAlbumName.value.trim() || !selectedFile.value) {
    return
  }

  try {
    // 上传封面图片
    const uploadedCoverUrl = await uploadImageApi(selectedFile.value)

    // 调用创建相册接口
    const photoAlbum = {
      albumName: newAlbumName.value,
      albumDesc: newAlbumDesc.value,
      coverUrl: uploadedCoverUrl,
      visibleScope: visibleScope.value === 'public' ? 1 : 3
    }

    await createPhotoAlbumApi(photoAlbum)

    // 关闭弹窗并刷新相册列表
    showCreateAlbumModal.value = false
    fetchAlbums()
    resetForm()
  } catch (error) {
    console.error('创建相册失败', error)
    alert('创建相册失败，请重试')
  }
}

// 重置表单
const resetForm = () => {
  newAlbumName.value = ''
  newAlbumDesc.value = ''
  visibleScope.value = 'public'
  coverUrl.value = null
  selectedFile.value = null
}

// 获取相册列表
const fetchAlbums = async () => {
  try {
    const response = await getUserPhotoAlbumsApi(userId as number)
    if (response.code === 0) {
      albums.value = response.data
    }
  } catch (error) {
    console.error('获取相册列表失败', error)
  }
}

// 在 script 部分添加日期格式化函数
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

const formatYear = (dateString: string) => {
  const date = new Date(dateString)
  return date.getFullYear().toString()
}

// 组件挂载时获取相册列表
onMounted(() => {
  fetchAlbums()
  if (userId) {
    fetchUserPhotos(userId)
  }
})
</script>

<style scoped>
.ant-select-selector {
  border: 1px solid #c7e5eb !important;
  border-radius: 4px !important;
}

.ant-select-selection-item {
  color: #73b4e0 !important;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
}

.photo-detail-modal {
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
}

.photo-detail-content {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

.photo-detail-image {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain; /* 保持图片比例 */
}
</style>
