import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import svgIcon from './components/SvgIcon.vue'
import VuePdf from 'vue3-pdfjs'

import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import './style/main.css'

import './mock'

const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(pinia)
app.use(VuePdf)
app.component('svg-icon', svgIcon)
app.mount('#app')
