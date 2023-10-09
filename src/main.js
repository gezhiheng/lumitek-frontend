import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import { createPinia } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const pinia = createPinia()
const app = createApp(App)
.use(ElementPlus, {
  locale: zhCn,
})
.use(router)
.use(pinia)
.mount('#app')