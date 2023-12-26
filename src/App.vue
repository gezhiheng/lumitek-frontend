<template>
  <router-view></router-view>
</template>

<script setup>
import { ref, watch, provide, onMounted } from 'vue'
import router from '@/router/router'
import routerMapping from '@/constants/router_mapping'

const title = ref('')

watch(() => router.currentRoute.value.path, (newFullPath, oldFullPath) => {
  const name = newFullPath.slice(1)
  const mapping = routerMapping.find(item => item.name === name)
  if (mapping) {
    title.value = mapping.index
  } else {
    title.value = ''
  }
})

onMounted(() => {
  provide('title', title)
})
</script>