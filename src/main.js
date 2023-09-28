import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
.use(ElementPlus, {
  locale: zhCn,
})
.use(router)
.mount('#app')