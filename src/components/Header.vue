<template>
  <div class="container">
    <Menu :features="features"></Menu>
  </div>
</template>

<script setup>
import Menu from './Menu.vue'
import defaultFeatures from '../assets/default-features'
import { getFeatures }  from '../service/user'

const staffNo = window.sessionStorage.getItem('staffNo')
const features = await getFeatures(staffNo).then((resolve, reject) => {
  return resolve.data
})
</script>