import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFeaturesStore = defineStore('features', () => {
  const featuresRequest = ref({
    requested: false,
    features: {}
  })

  function setFeaturesRequest(featuresRequested) {
    featuresRequest.value.requested = true
    featuresRequest.value.features = featuresRequested.features
  }

  return { featuresRequest, setFeaturesRequest }
})