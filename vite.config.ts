import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: true,
    open: true
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        // 手动设置 vue3-video-play 的路径为 UMD 版本
        find: 'vue3-video-play',
        replacement: resolve(
          __dirname,
          'node_modules/vue3-video-play/dist/index.umd.js'
        )
      }
    ]
  }
})
