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

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('staffNo')
  if(to.path !== '/login' && !token) {
    return next('/login')
  } else {
    next()
  }
})

export default router