import { fileURLToPath, URL } from 'node:url'
import optimizer from 'vite-plugin-optimizer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  base: '/husky-knowledge-library/',
  plugins: [
    vue(),
    optimizer({
      fs: () => ({
        find: /^(node:)?fs$/,
        code: `const fs = require('fs'); export { fs as default }`
      }),
    })
  ],
  css: {
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})


