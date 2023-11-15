import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/plugins/svg_builder'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/assets/icons/')
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
