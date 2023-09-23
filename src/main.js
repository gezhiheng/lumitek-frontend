import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'

const app = createApp(App)
.use(ElementPlus)
.use(router)
.mount('#app')