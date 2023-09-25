<template>
  <div class="container">
    <Menu :features="features"></Menu>
  </div>
</template>

<script setup>
import Menu from './Menu.vue'
import defaultFeatures from '../assets/default-features'
import { getFeatures }  from '../service/user'


const features = await getFeatures('admin').then((resolve, reject) => {
  return resolve.data
})
</script>