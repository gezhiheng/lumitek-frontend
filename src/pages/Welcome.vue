<template >
  <div class="container">
    <h1 
      v-if="state.showDelayedElements" 
      class="animate__bounceIn"
    >
      Lumitek
    </h1>
    <h2 
      v-if="state.showDelayedElements" 
      class="animate__bounceIn"
    >
      琉明光電
    </h2>
    <span 
      v-if="state.showDelayedElements" 
      class="animate__bounceIn" 
      @mousemove="state.drawer=true"
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
    <el-footer><Footer></Footer></el-footer>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import 'animate.css'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

const state = reactive({
  showDelayedElements: false,
  drawer: false
})

onMounted(() => {
  setTimeout(() => {
    state.showDelayedElements = true  
  }, 300)
})
</script>

<style src="@/style/welcome.css" scoped></style>