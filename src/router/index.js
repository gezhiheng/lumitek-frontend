import { createRouter, createWebHistory } from 'vue-router'
import { MainLayout } from '@/layouts'
import resetStores from '@/utils/reset_stores'

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
          component: () => import('@/views/mf/mfb/mfb01/MFB01.vue'),
        },
        {
          path: '/mfa01',
          name: 'mfa01',
          component: () => import('@/views/mf/mfa/mfa01/MFA01.vue'),
        },
        {
          path: '/mfb02',
          name: 'mfb02',
          component: () => import('@/views/mf/mfb/mfb02/MFB02.vue'),
        },
        {
          path: '/mfb04',
          name: 'mfb04',
          component: () => import('@/views/mf/mfb/mfb04/MFB04.vue'),
        },
        {
          path: '/qca02',
          name: 'qca02',
          component: () => import('@/views/qc/qca/QCA02.vue'),
        },
        {
          path: '/mfd01',
          name: 'mfd01',
          component: () => import('@/views/mf/mfd/mfd01/MFD01.vue'),
        },
        {
          path: '/mfd02',
          name: 'mfd02',
          component: () => import('@/views/mf/mfd/mfd02/MFD02.vue'),
        },
        {
          path: '/mfa09',
          name: 'mfa09',
          component: () => import('@/views/mf/mfa/mfa09/MFA09.vue'),
        },
        {
          path: '/empty',
          name: 'empty',
          component: () => import('@/views/Empty.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/Welcome.vue'),
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: () => import('@/views/PDFViewer.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('username')
  const path = to.path
  if (path !== '/login' && !token) {
    return next('/login')
  } else {
    resetStores(path)
    next()
  }
})

export default router
