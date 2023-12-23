<template >
  <div v-if="showDelayedElements" class="container">
    <h1 class="animate__bounceIn">Lumitek</h1>
    <h2 class="animate__bounceIn">琉明光電</h2>
    <el-dropdown class="animate__bounceIn">
      <span class="el-dropdown-link" style="margin-top: 20px;">
        選擇功能 >
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import 'animate.css'
import router from '@/router/router'

const showDelayedElements = ref(false)

document.documentElement.style.setProperty('--animate-duration', '2s');

onMounted(() => {
  showDelayedElements.value = true  
  setTimeout(() => {
  }, 600)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
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
  height: 100vh; /* 设置容器高度为视窗高度，实现垂直居中 */
  background-color: #409eff;
  background-image: 
    radial-gradient(closest-side, #79bbff, rgba(78, 225, 235, 0)),
    radial-gradient(closest-side, #a0cfff, rgba(78, 120, 235, 0)),
    radial-gradient(closest-side, #c6e2ff, rgba(0, 98, 255, 0)),
    radial-gradient(closest-side, #d9ecff, rgba(0, 238, 255, 0)),
    radial-gradient(closest-side, #ecf5ff, rgba(78, 225, 235, 0));
  background-size: 
    130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
  background-position:
    -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
}

.container ::after {
  content: '';
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

h1 {
  font-family: 'alibaba';
  font-size: 5em;
  letter-spacing: -4px;
  line-height: 60%;
  color: #fff;
  text-shadow:
    0px 0px 1px rgba(255, 255, 255, .6),
    0px 4px 4px rgba(0, 0, 0, .05);
}

h2 {
  font-family: 'alibaba';
  font-size: 2em;
  letter-spacing: -2px;
  color: #fff;
  text-shadow:
    0px 0px 1px rgba(255, 255, 255, .6),
    0px 4px 4px rgba(0, 0, 0, .05);
}

span {
  font-family: 'alibaba';
  color: #fff;
  font-size: larger;
  font-weight: 350;
  text-shadow:
    0px 0px 1px rgba(255, 255, 255, .6),
    0px 4px 4px rgba(0, 0, 0, .05);
}

.menu {
  margin-top: 20px;
  margin-left: 250px;
}
</style>