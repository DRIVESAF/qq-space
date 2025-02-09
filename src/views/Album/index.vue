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
          <div
            class="flex items-center bg-[#5ccfe6] px-4 py-2 border-[1px] border-[#47c3d6] border-solid text-white cursor-pointer"
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
          </div>
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
          <!-- 操作 -->
          <div
            @click="toggleDropdown(album.photoAlbumId)"
            class="iconfont icon-xiala absolute right-5 top-5 bg-white border-[1px] border-[#c7e5eb] border-solid text-[#888888] p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <!-- 下拉框 -->
          <div
            v-if="dropdownStates[album.photoAlbumId]"
            class="absolute right-0 mt-2 w-28 shadow-md z-10"
          >
            <button
              class="block w-full px-4 py-2 text-left hover:font-bold border-none bg-white flex"
              @click="edit(album)"
            >
              <div
                class="iconfont icon-bianji scale-130 pr-1 text-[#888888] font-bold"
              ></div>
              编辑
            </button>
            <button
              class="block w-full px-4 py-2 text-left hover:font-bold border-none bg-white flex"
              @click="remove(album.photoAlbumId)"
            >
              <div
                class="iconfont icon-icon-mianxing_fuzhi_shanchu scale-130 pr-1 text-[#888888]"
              ></div>
              删除
            </button>
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
                  <label class="block text-sm font-medium mb-2 pr-2"
                    >相册名称:</label
                  >
                  <input
                    v-model="editAlbumName"
                    type="text"
                    class="w-50 h-4 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
                    required
                  />
                </div>

                <div class="mb-4 flex justify-center">
                  <label class="block text-sm font-medium mb-2 pr-2"
                    >相册描述:</label
                  >
                  <textarea
                    v-model="editAlbumDesc"
                    class="w-50 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
                    rows="3"
                  ></textarea>
                </div>

                <div class="mb-4 flex justify-center">
                  <label class="block text-sm font-medium mb-2 pr-2"
                    >可见范围:</label
                  >
                  <select
                    v-model="editVisibleScope"
                    class="w-55 border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#50b3e9]"
                  >
                    <option value="public">公开</option>
                    <option value="private">私密</option>
                  </select>
                </div>

                <div class="mb-4 flex flex-col items-center">
                  <label class="block text-sm font-medium mb-2"
                    >封面图片:</label
                  >
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
                    @change="handleFileChange"
                    class="hidden"
                    ref="editFileInput"
                  />
                  <button
                    @click="triggerEditFileInput"
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
          <!-- 封面图 -->
          <img :src="album.coverUrl" class="w-55 h-55" />

          <!-- 相册名 -->
          <div class="flex items-center pt-3 justify-between">
            <div>{{ album.albumName }}</div>
            <!-- 只有当相册的可见范围是私密时，才显示上锁图标 -->
            <div
              v-if="album.visibleScope === 3"
              class="iconfont icon-suo text-[#7a9599] font-bold scale-120"
            ></div>
          </div>
        </div>
        <!-- 单个相册结束 -->
      </div>
    </div>
    <!-- 照片内容 -->
    <div v-if="activeTab === 'photo'">
      <p>照片内容</p>
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
import type { PhotoAlbumModel } from '../../api/album/AlbumModel'
import { useUserStore } from '../../store/user/index.ts'

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

const store = useUserStore()

// 创建相册的文件选择框
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 编辑相册的文件选择框
const triggerEditFileInput = () => {
  editFileInput.value?.click()
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

// 处理编辑相册表单提交
const handleEditAlbum = async () => {
  if (!editAlbumName.value.trim()) {
    return
  }

  try {
    let uploadedCoverUrl = editCoverUrl.value

    // 如果用户选择了新的封面图片，则上传
    if (selectedEditFile.value) {
      uploadedCoverUrl = await uploadImageApi(selectedEditFile.value)
    }

    // 调用编辑相册接口
    const photoAlbum = {
      photoAlbumId: currentAlbumId.value,
      albumName: editAlbumName.value,
      albumDesc: editAlbumDesc.value,
      coverUrl: uploadedCoverUrl,
      visibleScope: editVisibleScope.value === 'public' ? 1 : 3
    }

    await editPhotoAlbumApi(photoAlbum)

    // 关闭弹窗并刷新相册列表
    showEditAlbumModal.value = false
    fetchAlbums()
    resetEditForm()
  } catch (error) {
    console.error(error)
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

const userId = store.getUserInfo?.pkId

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

// 组件挂载时获取相册列表
onMounted(() => {
  fetchAlbums()
})
</script>

<style scoped></style>
