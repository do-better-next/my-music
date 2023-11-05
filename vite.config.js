import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/myapi': {
        target: 'http://127.0.0.1:8080', //目标url
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/myapi/, ""), 
          //重写路径,替换/api
      },
      '/api': {
        target: 'http://47.107.57.59', //目标url
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, ""), 
          //重写路径,替换/api
      }

    }
  }
})
