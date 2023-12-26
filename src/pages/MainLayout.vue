<template>
  <el-container>
    <el-header class="header"><Suspense><Menu></Menu></Suspense></el-header>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item 
        v-for="breadcrumb in breadcrumbs" 
        :to="{path: breadcrumb.path}" 
      >
        {{ breadcrumb.name }}
      </el-breadcrumb-item>
      <!-- 这里添加面包屑item 因为可能是element plus组件库的bug（面包屑的最后一个item样式（不管有没有“to”属性）是没有"to"属性的样式） -->
      <!-- 为了不影响美观和使用故添加一个没有内容的面包屑item -->
      <el-breadcrumb-item to="/welcome"></el-breadcrumb-item>
    </el-breadcrumb>
    <el-container class="main">
      <el-main><Suspense><router-view></router-view></Suspense></el-main>
    </el-container>
    <el-popover placement="top" :width="180" trigger="hover">
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
          v-model="darkFlag"
          size="large"
          @change="toggleDark"/>
      </div>
      <div v-if="settings.verticalMode.isActive" class="settings-option">
        <span style="line-height: 40px; ">垂直显示</span>
        <el-switch
          v-model="verticalFlag"
          size="large"
          @change="toggleVertical"/>
      </div>
    </el-popover>
    <el-footer class="footer"><Footer></Footer></el-footer>
  </el-container>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useDark, useToggle } from "@vueuse/core"
import { ElNotification } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import Footer from '@/components/Footer.vue'
import Menu from '@/components/Menu.vue'
import { useSettingsStore } from '@/stores/settings_store'

const { settings, setModeEnabled } = useSettingsStore()
const verticalFlag = ref(false)
const isDark = useDark()
const darkFlag = ref(isDark)
const breadcrumbs = inject('breadcrumbs')

onMounted(() => {
  const username = window.sessionStorage.getItem('username')
  if (username) {
    ElNotification.success({
      title: '歡迎',
      message: `${username}`,
      offset: 100,
    })
  }
})

const toggleDark = () => {
  useToggle(isDark)
  setModeEnabled('darkMode', isDark)
}

const toggleVertical = () => {
  setModeEnabled('verticalMode', verticalFlag.value)
}
</script>

<style src="@/style/main_layout.css" scoped></style>