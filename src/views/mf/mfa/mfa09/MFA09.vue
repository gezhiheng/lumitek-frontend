<template>
  <el-tabs tab-position="top" style="height: 500px;" type="border-card">
    <el-tab-pane label="HOLD類別維護"><HoldType></HoldType></el-tab-pane>
    <el-tab-pane label="終止Command"><Cancel></Cancel></el-tab-pane>
    <el-tab-pane label="解扣Command"><UnHold></UnHold></el-tab-pane>
  </el-tabs>
</template>

<script setup>
import HoldType from './components/HoldType.vue'
import Cancel from './components/Cancel.vue'
import UnHold from './components/UnHold.vue'

</script>

<style scoped>

</style>