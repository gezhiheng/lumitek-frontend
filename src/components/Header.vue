<template>
  <div class="container">
    <Menu v-if="useBackendDataFlag" :features="features"></Menu>
    <Menu v-else :features="defaultFeatures"></Menu>
  </div>
</template>

<script setup>
import Menu from './Menu.vue'
import defaultFeatures from '../assets/default_features'
import { getFeatures }  from '../service/user'

const useBackendDataFlag = import.meta.env.VITE_USE_BACKEND_DATA_FLAG === 'true'

const staffNo = window.sessionStorage.getItem('staffNo')
let features = {}
if (useBackendDataFlag) {
  features = await getFeatures(staffNo).then((resolve, reject) => {
    return resolve.data
  })
}

</script>