<template>
  <el-container class="main">
    <el-header><Suspense><Header></Header></Suspense></el-header>
    <el-container>
      <el-main><router-view></router-view></el-main>
    </el-container>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { ElNotification } from 'element-plus'

const username = window.sessionStorage.getItem('username')
if (username) {
  ElNotification.success({
    title: '登錄成功',
    message: `${username}，歡迎`,
    offset: 100,
  })
}
</script>

<style src="../style/home.css" scoped></style>