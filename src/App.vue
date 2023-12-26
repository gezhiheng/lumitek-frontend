<template>
  <router-view></router-view>
</template>

<script setup>
import { ref, watch, provide, onMounted } from 'vue'
import router from '@/router/router'
import routerMapping from '@/constants/router_mapping'

const title = ref('')
const breadcrumbs = ref([])

watch(() => router.currentRoute.value.path, (newFullPath, oldFullPath) => {
  const name = newFullPath.slice(1)
  const mapping = routerMapping.find(item => item.name === name)
  if (mapping) {
    title.value = mapping.index
    const pushFlag = !breadcrumbs.value.some(item => item.name === mapping.index)
    if(pushFlag) {
      breadcrumbs.value.push({
        path: newFullPath,
        name: mapping.index
      })
    }
  } else {
    title.value = ''
  }
  if (name === 'welcome') {
    breadcrumbs.value = []
  }
})

onMounted(() => {
  provide('title', title)
  provide('breadcrumbs', breadcrumbs)
})
</script>