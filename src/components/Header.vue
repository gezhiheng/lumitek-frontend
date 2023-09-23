<template>
  <div class="container">
    <Menu :features="defaultFeatures"></Menu>
  </div>
</template>

<script setup>
import Menu from './Menu.vue'
import defaultFeatures from '../assets/default-features'

</script>