<template>
  <div class="bg-[#dcf1f5] mx-40 px-20 w-auto mt-8 pb-10">
    <!-- 导航栏开始 -->
    <div
      class="border-b-[#c7e5eb] border-b-solid border-b-[2px] flex justify-between items-center"
    >
      <div class="flex space-x-8 px-4 pt-4 pb-4">
        <div class="text-[#4d585a] cursor-pointer" @click="back">返回</div>
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
    <!-- 导航栏结束 -->
    <!-- 相册信息开始 -->
    <div class="pt-3 flex">
      <img :src="selectedAlbum?.coverUrl" alt="" class="bg-red-200 w-20 h-20" />
      <div class="pl-3 flex flex-col justify-between">
        <div class="flex items-end">
          <div class="text-2xl">{{ selectedAlbum.albumName }}</div>
          <div class="text-[#7e8a8c] text-sm pl-2">
            / {{ selectedAlbum.visibleScope === 1 ? '公开' : '私密' }}/
            {{ selectedAlbum.albumDesc }}
          </div>
        </div>
        <div class="flex">
          <div
            class="flex items-center bg-[#5ccfe6] px-4 py-2 border-[1px] border-[#47c3d6] border-solid text-white cursor-pointer mr-2"
            @click="showUploadModal"
          >
            <div
              class="iconfont icon-tianjiatupian_huaban scale-140 px-1"
            ></div>
            <div>上传照片</div>
          </div>
          <div
            class="flex items-center bg-[#f2fdff] px-4 py-2 border-[1px] border-[#c7e5eb] border-solid cursor-pointer text-sm mx-2"
            @click="toggleBatchMode"
          >
            {{ isBatchMode ? '取消批量' : '批量管理' }}
          </div>
          <div
            class="flex items-center bg-[#f2fdff] px-4 py-2 border-[1px] border-[#c7e5eb] border-solid cursor-pointer text-sm mx-2"
          >
            更多
          </div>
          <div
            v-if="isBatchMode"
            class="flex items-center bg-[#ff4d4f] px-4 py-2 border-[1px] border-[#ff4d4f] border-solid cursor-pointer text-sm mx-2 text-white"
            @click="batchDelete"
          >
            删除
          </div>
        </div>
      </div>
    </div>
    <!-- 相册信息结束 -->
    <!-- 相册内容开始 -->
    <div class="pt-8">
      <!-- 照片列表 -->
      <div class="flex flex-wrap gap-4">
        <div
          v-for="photo in photos"
          :key="photo.photoId"
          class="group bg-[#f2fdff] w-55 flex flex-col justify-center items-center relative"
          @mouseenter="dropdownStates[photo.photoId] = true"
          @mouseleave="dropdownStates[photo.photoId] = false"
        >
          <div
            v-if="isBatchMode"
            class="absolute left-1 top-1 bg-white border-[1px] border-[#c7e5eb] border-solid text-[#888888] p-1"
          >
            <input
              type="checkbox"
              v-model="selectedPhotos"
              :value="photo.photoId"
              class="cursor-pointer"
            />
          </div>
          <div
            class="iconfont icon-xiala absolute right-1 top-1 bg-white border-[1px] border-[#c7e5eb] border-solid text-[#888888] p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <!-- 下拉框 -->
          <div
            v-if="dropdownStates[photo.photoId]"
            class="absolute right-0 mt-2 w-28 shadow-md z-10 top-5"
          >
            <button
              class="block w-full px-4 py-2 text-left hover:font-bold border-none bg-white flex"
              @click.stop="remove(photo.photoId)"
            >
              <div
                class="iconfont icon-icon-mianxing_fuzhi_shanchu scale-130 pr-1 text-[#888888]"
              ></div>
              删除
            </button>
          </div>
          <img
            :src="photo.photoUrl"
            alt="photo"
            class="w-full h-40 object-cover"
            @click="handlePhotoClick(photo)"
          />
          <div class="py-1 text-sm">{{ formatDate(photo.uploadTime) }}</div>
        </div>
      </div>
    </div>
    <!-- 相册内容结束 -->

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
      <div class="flex">
        <div>上传到</div>
        <div class="px-2 text-[#73b4e0]">{{ selectedAlbum.albumName }}</div>
      </div>
      <a-upload
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="flex justify-center items-center"
      >
        <div class="upload-area">
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
import { useRoute, useRouter } from 'vue-router'
import { usePhotoAlbumStore } from '../../store/album/index.ts'
import {
  getPhotosByAlbumIdApi,
  uploadPhotoApi,
  deletePhotoApi
} from '../../api/photo/index.ts'
import type { PhotoModel } from '../../api/photo/PhotoModel.ts'
import { message } from 'ant-design-vue'

const route = useRoute()
const router = useRouter()
const AlbumId = route.params.id

const back = () => {
  router.push('/album')
}

const photoAlbumStore = usePhotoAlbumStore()
const selectedAlbum = photoAlbumStore.selectedAlbum

// 定义照片列表
const photos = ref<PhotoModel[]>([])

const selectedPhoto = ref<PhotoModel | null>(null)
const showPhotoDetailModal = ref(false)

// 点击照片时触发的方法
const handlePhotoClick = (photo: PhotoModel) => {
  selectedPhoto.value = photo
  showPhotoDetailModal.value = true
}

// 关闭弹窗的方法
const closePhotoDetailModal = () => {
  showPhotoDetailModal.value = false
  selectedPhoto.value = null
}

// 获取相册内所有照片
const fetchPhotos = async () => {
  try {
    const response = await getPhotosByAlbumIdApi(Number(AlbumId))
    photos.value = response.data
    console.log(photos.value)
  } catch (error) {
    console.error('获取照片失败:', error)
  }
}

const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}

const dropdownStates = ref<{ [key: number]: boolean }>({})

// 在组件挂载时调用接口
onMounted(() => {
  fetchPhotos()
})

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

const handleUpload = async () => {
  if (file.value) {
    try {
      // 调用上传接口
      await uploadPhotoApi(file.value, Number(AlbumId))

      // 提示上传成功
      message.success('照片上传成功')

      // 关闭弹窗并清空文件
      uploadModalVisible.value = false
      file.value = null
      previewImage.value = null

      // 刷新照片列表
      await fetchPhotos()
    } catch (error) {
      // 处理上传失败
      message.error('照片上传失败')
      console.error('照片上传失败:', error)
    }
  }
}

// 删除单张照片
const remove = async (photoId: number) => {
  try {
    // 调用删除接口
    await deletePhotoApi(photoId)

    // 提示删除成功
    message.success('照片删除成功')

    // 刷新照片列表
    await fetchPhotos()
  } catch (error) {
    console.error('删除照片失败', error)
    message.error('删除照片失败，请重试')
  }
}

// 批量删除相关逻辑
const isBatchMode = ref(false)
const selectedPhotos = ref<number[]>([])

const toggleBatchMode = () => {
  isBatchMode.value = !isBatchMode.value
  if (!isBatchMode.value) {
    selectedPhotos.value = []
  }
}

const batchDelete = async () => {
  if (selectedPhotos.value.length === 0) {
    message.warning('请选择要删除的照片')
    return
  }

  try {
    // 调用批量删除接口
    await Promise.all(selectedPhotos.value.map((id) => deletePhotoApi(id)))

    // 提示删除成功
    message.success('照片删除成功')

    // 刷新照片列表
    await fetchPhotos()

    // 退出批量模式
    isBatchMode.value = false
    selectedPhotos.value = []
  } catch (error) {
    console.error('批量删除照片失败', error)
    message.error('批量删除照片失败，请重试')
  }
}
</script>

<style scoped>
.upload-area {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.preview-area {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
