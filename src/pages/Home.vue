<template>
  <el-container>
    <el-header><Suspense><Header></Header></Suspense></el-header>
    <el-container class="main">
      <el-main><Suspense><router-view></router-view></Suspense></el-main>
    </el-container>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { ElNotification } from 'element-plus'
import router from '../router/router'

const username = window.sessionStorage.getItem('username')
if (username) {
  ElNotification.success({
    title: '登錄成功',
    message: `${username}，歡迎`,
    offset: 100,
  })
}

// 因为暂时只有一个页面所以默认登录成功后跳转到mfb01这个页面
router.push('/mfb01')
</script>

<style src="../style/home.css" scoped></style>