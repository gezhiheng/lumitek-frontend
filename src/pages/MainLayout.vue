<template>
  <el-container>
    <el-header class="header"><Suspense><Menu></Menu></Suspense></el-header>
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
import { ref, onMounted} from 'vue'
import { useDark, useToggle } from "@vueuse/core"
import { ElNotification } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import Footer from '@/components/Footer.vue'
import Menu from '@/components/Menu.vue'
import { useSettingsStore } from '@/stores/settings_store'

const { settings, setModeActive, setModeEnabled } = useSettingsStore()
const verticalFlag = ref(false)
const isDark = useDark()
const darkFlag = ref(isDark)

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