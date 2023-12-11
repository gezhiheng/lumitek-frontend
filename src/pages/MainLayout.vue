<template>
  <el-container>
    <el-header><Suspense><Header></Header></Suspense></el-header>
    <h1>welcome</h1>
    <el-container class="main">
      <el-main><Suspense><router-view></router-view></Suspense></el-main>
    </el-container>
    <el-button class="settings_btn" circle>
      <el-icon size="40">
        <Setting />
      </el-icon>
    </el-button>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import router from '@/router/router'

const username = window.sessionStorage.getItem('username')
if (username) {
  ElNotification.success({
    title: '登錄成功',
    message: `${username}，歡迎`,
    offset: 100,
  })
}

router.push({name: 'welcome'})
</script>

<style src="@/style/main_layout.css" scoped></style>