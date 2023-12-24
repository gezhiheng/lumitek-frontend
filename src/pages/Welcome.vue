<template >
  <div v-if="showDelayedElements" class="container">
    <h1 class="animate__bounceIn">Lumitek</h1>
    <h2 class="animate__bounceIn">琉明光電</h2>
    <span class="animate__bounceIn" @mousemove="drawer=true">選擇功能 ></span>
    <el-drawer v-model="drawer">
      
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