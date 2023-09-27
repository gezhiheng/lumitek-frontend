import { createRouter, createWebHistory } from "vue-router"

import MFB01 from '../pages/MFB01.vue'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import config from '../config/config'
import Empty from '../pages/Empty.vue'

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
    }
  ]
})

if (config.useBackendData) {
  router.beforeEach((to, from, next) => {
    const token = window.sessionStorage.getItem('username')
    if(to.path !== '/login' && !token) {
      return next('/login')
    } else {
      next()
    }
  })
}

export default router