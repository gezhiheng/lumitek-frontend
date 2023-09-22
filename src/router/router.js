import { createRouter, createWebHistory } from "vue-router"

import MFB01 from '../pages/MFB01.vue'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'home',
      component: Home,
      children: [
        {
          path: '/mfb01',
          name: 'mfb01',
          component: MFB01
        }
      ] 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router