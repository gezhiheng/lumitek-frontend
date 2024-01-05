<template>
  <el-card>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column v-for="colum in tableColum" :prop="colum.prop" :label="colum.label" :width="colum.width" />
    </el-table>
  </el-card>
</template>

<script setup>
const tableColum =  [
  {
    prop: 'custNo',
    label: '客戶代碼',
    width: 90
  },
  {
    prop: 'orderNo',
    label: '客戶訂單號',
    width: 100
  },
  {
    prop: 'issueDate',
    label: '進貨時間',
    width: 90
  },
  {
    prop: 'lotNo',
    label: '批號',
    width: 90
  },
  {
    prop: 'processType',
    label: '製程別',
    width: 90
  },
  {
    prop: 'custProductNo',
    label: '客戶產品型號',
    width: 110
  },
  {
    prop: 'custProductName',
    label: '客戶產品名稱',
    width: 110
  },
  {
    prop: 'waferSize',
    label: '晶圓尺寸',
    width: 90
  },
  {
    prop: 'fixBin',
    label: '固定BIN',
    width: 90
  },
  {
    prop: 'lifePickup',
    label: 'lifePickup',
    width: 100
  },
  {
    prop: 'applyNo',
    label: '客戶進貨單號',
    width: 110
  },
  {
    prop: 'shipSite',
    label: '回貨廠區',
    width: 90
  },
  {
    prop: 'reworkNo',
    label: '退貨重工',
    width: 90
  }
]

</script>

<style scoped>

</style>