<template>
  <div v-if="showDelayedElements" class="container">
    <h1 class="animate__bounceIn">Lumitek</h1>
    <h2 class="animate__bounceIn">琉明光電</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'animate.css'

const showDelayedElements = ref(false)

document.documentElement.style.setProperty('--animate-duration', '2s');

onMounted(() => {
  showDelayedElements.value = true  
  setTimeout(() => {
  }, 600)
})
</script>

<style scoped>
@font-face {
  font-family: 'alibaba';
  src: url('../assets/fonts/AlibabaSansTC-95/AlibabaSansTC-95.woff');
  src: url('../assets/fonts/AlibabaSansTC-95/AlibabaSansTC-95.eot');
  src: url('../assets/fonts/AlibabaSansTC-95/AlibabaSansTC-95.otf');
  src: url('../assets/fonts/AlibabaSansTC-95/AlibabaSansTC-95.ttf');
  src: url('../assets/fonts/AlibabaSansTC-95/AlibabaSansTC-95.woff2');
}

.container {
  display: flex;
  flex-direction: column; /* 将子元素垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  height: 80vh; /* 设置容器高度为视窗高度，实现垂直居中 */
}

h1 {
  font-family: 'alibaba';
  font-size: 5em;
  letter-spacing: -4px;
  line-height: 60%;
}

h2 {
  font-family: 'alibaba';
  font-size: 2em;
  letter-spacing: -2px;
}
</style>