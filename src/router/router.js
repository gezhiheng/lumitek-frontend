import { createRouter, createWebHashHistory } from "vue-router";

import MFB01 from '../pages/MFB01.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/mfb01', component: MFB01 }
  ]
})

export default router