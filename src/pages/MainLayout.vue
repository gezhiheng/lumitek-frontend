<template>
  <el-container>
    <el-header class="header"><Suspense><Menu></Menu></Suspense></el-header>
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
          :to="{path: breadcrumb.path}" 
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
        <el-icon v-if="state.showFillDelIcon" size="200" color="red"><DeleteFilled /></el-icon>
        <el-icon v-else size="200" color="red"><Delete /></el-icon>
      </div>
    </transition>
    <VueDraggable
      v-if="state.showDelArea"
      v-model="toDelBreadcrumbs"
      group="breadcrumbs"
      class="del-area"
      style="background-color: transparent;"
    >
      <div></div>
    </VueDraggable>
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
import { ref, onMounted, inject, toRaw, reactive } from 'vue'
import { useDark, useToggle } from "@vueuse/core"
import { ElNotification } from 'element-plus'
import { Setting, Delete, DeleteFilled } from '@element-plus/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'
import Footer from '@/components/Footer.vue'
import Menu from '@/components/Menu.vue'
import { useSettingsStore } from '@/stores/settings_store'

const { settings, setModeEnabled } = useSettingsStore()
const verticalFlag = ref(false)
const state = reactive({
  showFillDelIcon: false,
  showDelArea: false
})
const isDark = useDark()
const darkFlag = ref(isDark)
const breadcrumbs  = inject('breadcrumbs')
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
    if(e.to.className === 'del-area') {
      state.showFillDelIcon = true
    }
  }
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

<style src="@/style/main_layout.css" scoped></style>