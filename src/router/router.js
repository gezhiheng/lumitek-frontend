import { createRouter, createWebHistory } from "vue-router"

import MFB01 from '@/pages/MFB01.vue'
import MFA01 from '@/pages/MFA01.vue'
import Login from '@/pages/Login.vue'
import MainLayout from '@/pages/MainLayout.vue'
import Welcome from '@/pages/Welcome.vue'
import Empty from '@/pages/Empty.vue'
import resetStores from "@/utils/reset_stores"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'main',
      component: MainLayout,
      children: [
        {
          path: '/mfb01',
          name: 'mfb01',
          component: MFB01
        },
        {
          path: '/mfa01',
          name: 'mfa01',
          component: MFA01
        },
        {
          path: '/empty',
          name: 'empty',
          component: Empty
        }
      ] 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('username')
  const path = to.path
  if(path !== '/login' && !token) {
    return next('/login')
  } else {
    resetStores(path)
    next()
  }
})

export default router