import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFeaturesStore = defineStore('features', () => {
  const features = ref({
    requested: false,
    features: {}
  })

  function setFeatures(featuresRequested) {
    features.value.requested = true
    Object.keys(featuresRequested).forEach(key => {
      features.value.features[key] = featuresRequested[key]
    })
  }

  return { features, setFeatures }
})