<template>
  <div class="container">
    
    <Menu v-if="config.useBackendData" :features="features"></Menu>
    <Menu v-else :features="defaultFeatures"></Menu>
  </div>
</template>

<script setup>
import Menu from './Menu.vue'
import defaultFeatures from '../assets/default-features'
import { getFeatures }  from '../service/user'
import config from '../config/config'

const staffNo = window.sessionStorage.getItem('staffNo')
let features = {}
if (config.useBackendData) {
  features = await getFeatures(staffNo).then((resolve, reject) => {
    return resolve.data
  })
}

</script>