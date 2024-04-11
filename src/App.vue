<template>
  <router-view></router-view>
</template>

<script setup>
import { ref, watch, provide, onMounted } from 'vue'
import router from '@/router'
import useableFeatures from '@/config/useable_features'
import modeSettings from '@/config/mode_settings'
import { useSettingsStore } from '@/stores/settings_store'
import { useActiveMenuIndexStore } from '@/stores/features_store'

const title = ref('')
const breadcrumbs = ref([])
const { setModeActive } = useSettingsStore()
const { setActiveMenuIndex } = useActiveMenuIndexStore()

watch(
  () => router.currentRoute.value.path,
  (newFullPath, oldFullPath) => {
    const name = newFullPath.slice(1)
    const label = useableFeatures[name]
    if (label) {
      title.value = label
      const pushFlag = !breadcrumbs.value.some((item) => item.name === label)
      if (pushFlag) {
        breadcrumbs.value.push({
          path: newFullPath,
          name: label,
        })
        setActiveMenuIndex(name)
      }
    } else {
      setActiveMenuIndex('')
      title.value = ''
    }
    if (name === 'welcome') {
      breadcrumbs.value = []
    }
    setSettings(name)
  },
)

const setSettings = (name) => {
  const settingsObj = modeSettings[name]
  if (!settingsObj) {
    return
  }
  Object.keys(settingsObj).forEach((key) => {
    setModeActive(key, settingsObj[key])
  })
}

onMounted(() => {
  provide('title', title)
  provide('breadcrumbs', breadcrumbs)
})
</script>
