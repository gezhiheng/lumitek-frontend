<template >
  <div v-if="showDelayedElements" class="container">
    <h1 class="animate__bounceIn">Lumitek</h1>
    <h2 class="animate__bounceIn">琉明光電</h2>
    <span class="animate__bounceIn" @mousemove="drawer=true">選擇功能 ></span>
    <el-drawer v-model="drawer" custom-class="feats-drawer">
      <template #header>
        <h4>選擇功能</h4>
      </template>
      <template #default>
        <el-menu
          :default-active="activeIndex"
          mode="vertical"
          @select="handleSelect"
          popper-effect="light"
        >
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3" disabled>Info</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'animate.css'
import router from '@/router/router'

const showDelayedElements = ref(false)
const drawer = ref(false)

document.documentElement.style.setProperty('--animate-duration', '2s')

onMounted(() => {
  showDelayedElements.value = true  
  setTimeout(() => {
  }, 600)
})
</script>

<style src="../style/welcome.css" scoped></style>