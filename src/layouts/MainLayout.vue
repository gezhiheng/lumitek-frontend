<template>
  <div class="header">
    <Suspense><Menu></Menu></Suspense>
  </div>
  <el-breadcrumb separator="/">
    <VueDraggable
      v-model="breadcrumbs"
      animation="300"
      group="breadcrumbs"
      dragClass="mover"
      @start="draggable.start"
      @end="draggable.end"
      @move="draggable.move"
    >
      <el-breadcrumb-item
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.path"
        :to="{ path: breadcrumb.path }"
        class="mover"
      >
        {{ breadcrumb.name }}
      </el-breadcrumb-item>
      <!-- 这里添加面包屑item 因为可能是element plus组件库的bug（面包屑的最后一个item样式（不管有没有“to”属性）是没有"to"属性的样式） -->
      <!-- 为了不影响美观和使用故添加一个没有内容的面包屑item -->
      <el-breadcrumb-item></el-breadcrumb-item>
    </VueDraggable>
  </el-breadcrumb>
  <transition
    enter-active-class="animate__animated animate__bounceInLeft animate__faster"
    leave-active-class="animate__animated animate__bounceOutLeft"
  >
    <div v-if="state.showDelArea" class="del-area">
      <el-icon v-if="state.showFillDelIcon" size="200" color="red"
        ><DeleteFilled
      /></el-icon>
      <el-icon v-else size="200" color="red"><Delete /></el-icon>
    </div>
  </transition>
  <VueDraggable
    v-if="state.showDelArea"
    v-model="toDelBreadcrumbs"
    group="breadcrumbs"
    class="del-area"
    style="background-color: transparent"
  >
    <div></div>
  </VueDraggable>
  <div class="main-container">
    <Suspense><router-view></router-view></Suspense>
  </div>
  <el-popover placement="top" :width="180" trigger="hover">
    <template #reference>
      <el-button class="settings_btn" circle :size="'large'">
        <el-icon size="30">
          <Setting />
        </el-icon>
      </el-button>
    </template>
    <div class="settings-option">
      <span>夜间模式</span>
      <el-switch v-model="darkFlag" size="large" @change="toggleDark" />
    </div>
    <div v-if="settings.verticalMode.isActive" class="settings-option">
      <span style="line-height: 40px">垂直显示</span>
      <el-switch v-model="verticalFlag" size="large" @change="toggleVertical" />
    </div>
  </el-popover>
  <el-footer><Footer></Footer></el-footer>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { ElNotification } from 'element-plus'
import { Setting, Delete, DeleteFilled } from '@element-plus/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'
import 'animate.css'
import Footer from '@/components/Footer.vue'
import Menu from '@/components/Menu.vue'
import { useSettingsStore } from '@/stores/settings_store'

const { settings, setModeEnabled } = useSettingsStore()
const verticalFlag = ref(false)
const state = reactive({
  showFillDelIcon: false,
  showDelArea: false,
})
const isDark = useDark()
const darkFlag = ref(isDark)
const breadcrumbs = inject('breadcrumbs')
const toDelBreadcrumbs = ref([])
const draggable = {
  start: () => {
    state.showDelArea = true
    state.showSettingBtn = false
  },
  end: () => {
    state.showDelArea = false
    state.showFillDelIcon = false
  },
  move: (e) => {
    if (e.to.className === 'del-area') {
      state.showFillDelIcon = true
    }
  },
}

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

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main-container {
  width: 70%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 12px;
}

.el-footer {
  padding: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 260px;
  margin-top: 30px;
}

h2 {
  position: absolute;
  margin: 88px 0 0 24px;
  font-weight: bold;
  font-size: 22px;
}

.settings_btn {
  position: fixed;
  bottom: 100px;
  right: 100px;
  box-shadow: var(--shawdow);
}

.header {
  margin-bottom: 24px;
}

.settings-option {
  display: flex;
  justify-content: space-between;
}

.settings-option > span {
  line-height: 40px;
  font-weight: bold;
  font-size: 15px;
}

.el-breadcrumb {
  width: 70%;
  margin: 0 auto;
  padding: 0 12px;
}

.el-container {
  position: relative;
}

.del-area {
  position: fixed;
  bottom: 100px;
  left: 12px;
  width: 135px;
  height: 135px;
}
</style>
