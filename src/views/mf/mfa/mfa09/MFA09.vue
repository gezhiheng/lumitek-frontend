<template>
  <el-tabs
    tab-position="top"
    style="min-height: 500px"
    type="border-card"
    @tab-change="tabOnchange"
  >
    <el-tab-pane label="HOLD類別維護"
      ><HoldType v-model="data.getHoldTypeDataFlag"></HoldType
    ></el-tab-pane>
    <el-tab-pane label="終止Command"
      ><Cancel v-model="data.getCancelDataFlag"></Cancel
    ></el-tab-pane>
    <el-tab-pane label="解扣Command"
      ><UnHold v-model="data.getUnHoldDataFlag"></UnHold
    ></el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import HoldType from './components/HoldType.vue'
import Cancel from './components/Cancel.vue'
import UnHold from './components/UnHold.vue'

const data = reactive({
  getHoldTypeDataFlag: false,
  getCancelDataFlag: false,
  getUnHoldDataFlag: false,
})

const tabOnchange = (pane) => {
  ;[
    () => {
      data.getHoldTypeDataFlag = !data.getHoldTypeDataFlag
    },
    () => {
      data.getCancelDataFlag = !data.getCancelDataFlag
    },
    () => {
      data.getUnHoldDataFlag = !data.getUnHoldDataFlag
    },
  ][pane]()
}

onMounted(() => {
  data.getHoldTypeDataFlag = !data.getHoldTypeDataFlag
})
</script>
