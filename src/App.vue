<template>
  <router-view></router-view>
</template>

<script setup>
import { ref, watch, provide, onMounted } from 'vue'
import router from '@/router/router'
import useableFeatures from '@/constants/useable_features'
import modeSettings from '@/constants/mode_settings'
import { useSettingsStore } from '@/stores/settings_store'

const title = ref('')
const breadcrumbs = ref([])
const { setModeActive } = useSettingsStore()

watch(() => router.currentRoute.value.path, (newFullPath, oldFullPath) => {
  const name = newFullPath.slice(1)
  const feature = useableFeatures.find(item => item.index === name)
  if (feature) {
    title.value = feature.label
    const pushFlag = !breadcrumbs.value.some(item => item.name === feature.label)
    if(pushFlag) {
      breadcrumbs.value.push({
        path: newFullPath,
        name: feature.label
      })
    }
  } else {
    title.value = ''
  }
  if (name === 'welcome') {
    breadcrumbs.value = []
  }
  setSettings(name)
})

const setSettings = (name) => {
  modeSettings.forEach(item => {
    if (item.routerName === name) {
      Object.keys(item.settings).forEach(key => {
        setModeActive(key, item.settings[key])
      })
    }
  })
}

onMounted(() => {
  provide('title', title)
  provide('breadcrumbs', breadcrumbs)
})
</script>