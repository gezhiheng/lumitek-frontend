<template>
  <div class="container main-background">
    <h1 v-if="state.showDelayedElements" class="animate__bounceIn">Lumitek</h1>
    <h2 v-if="state.showDelayedElements" class="animate__bounceIn">琉明光電</h2>
    <span
      v-if="state.showDelayedElements"
      class="animate__bounceIn"
      @mousemove="state.drawer = true"
    >
      選擇功能 >
    </span>
    <el-drawer
      v-model="state.drawer"
      direction="ttb"
      class="feats-drawer"
      :show-close="false"
      :with-header="false"
      :size="60"
    >
      <template #default>
        <Suspense><Menu :verticalFlag="false"></Menu></Suspense>
      </template>
    </el-drawer>
    <el-footer v-if="state.showDelayedElements"><Footer></Footer></el-footer>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import 'animate.css'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

const state = reactive({
  showDelayedElements: false,
  drawer: false,
})

onMounted(() => {
  setTimeout(() => {
    state.showDelayedElements = true
  }, 300)
})
</script>

<style scoped>
@import url('@/style/background.css');

.container {
  display: flex;
  flex-direction: column; /* 将子元素垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  height: 155vh; /* 设置容器高度为视窗高度，实现垂直居中 */
}

h1 {
  font-size: 5em;
  letter-spacing: -4px;
  line-height: 60%;
  color: #fff;
  text-shadow:
    0px 0px 5px rgba(255, 255, 255, 0.6),
    0px 4px 4px rgba(0, 0, 0, 0.05);
}

h2 {
  font-size: 2em;
  letter-spacing: -2px;
  color: #fff;
  text-shadow:
    0px 0px 5px rgba(255, 255, 255, 0.6),
    0px 4px 4px rgba(0, 0, 0, 0.05);
}

span {
  color: #fff;
  font-size: larger;
  font-weight: 350;
  text-shadow:
    0px 0px 5px rgba(255, 255, 255, 0.6),
    0px 4px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20vh;
}

:deep(.feats-drawer .el-drawer__body) {
  padding: 0 !important;
}

.el-footer {
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 25vh;
}

.footer {
  margin-top: 25vh;
}
</style>
