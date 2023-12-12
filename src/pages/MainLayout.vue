<template>
  <el-container>
    <el-header class="header"><Suspense><Header @getTitle="getTitle"></Header></Suspense></el-header>
    <h2 style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">{{ title }}</h2>
    <el-container class="main">
      <el-main><Suspense><router-view></router-view></Suspense></el-main>
    </el-container>
    <el-popover placement="top" :width="180" trigger="click">
      <template #reference>
        <el-button class="settings_btn" circle>
          <el-icon size="40">
            <Setting />
          </el-icon>
        </el-button>
      </template>
      <div class="settings-option">
        <span>夜间模式</span>
        <el-switch
          class="switch"
          v-model="darkFlag"
          size="large"
          @change="toggleDark"/>
      </div>
      <div class="settings-option">
        <span style="line-height: 40px; ">垂直显示</span>
        <el-switch
          class="switch"
          v-model="verticalFlag"
          size="large"/>
      </div>
    </el-popover>
    <el-footer class="footer"><Footer></Footer></el-footer>
  </el-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDark, useToggle } from "@vueuse/core"
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

const title = ref('')
const getTitle = (value) => {
  title.value = value
}

const verticalFlag = ref(false)
const darkFlag = ref(false)
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 监听路由的变化
watch(() => router.currentRoute.value.path, (newFullPath, oldFullPath) => {
  const path = newFullPath.slice(1)
  if (path === 'welcome' || path === 'empty') {
    title.value = ''
  }
})
</script>

<style src="@/style/main_layout.css" scoped></style>