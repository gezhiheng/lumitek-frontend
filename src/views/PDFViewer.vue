<script setup>
import { usePDFUrlsStore } from '@/stores/pdf_urls_store'

const { pdfUrls } = usePDFUrlsStore()
</script>

<template>
  <VuePdf v-for="url in pdfUrls" :src="url" />
</template>

<style scoped>
* {
  margin: 12px;
}
</style>
