import { createRouter, createWebHashHistory } from "vue-router"

import MFB01 from '../pages/MFB01.vue'
import Login from '../pages/Login.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/mfb01', component: MFB01 },
    { path: '/login', component: Login}
  ]
})

export default router