import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePDFUrlsStore = defineStore('pdfUrlsStore', () => {
  const pdfUrls = ref([])

  function setPDFUrls (urls) {
    pdfUrls.value = urls
  }

  return { pdfUrls, setPDFUrls }
})