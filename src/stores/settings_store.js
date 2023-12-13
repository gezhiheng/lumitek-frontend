import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref({
    darkMode: {
      isActive: true,
      isEnabled: false
    },
    verticalMode: {
      isActive: false,
      isEnabled: false
    }
  })

  function setModeActive(mode, isActive) {
    settings.value[mode].isActive = isActive
  }

  function setModeEnabled(mode, isEnabled) {
    settings.value[mode].isEnabled = isEnabled
  }

  return { settings, setModeActive, setModeEnabled }
})