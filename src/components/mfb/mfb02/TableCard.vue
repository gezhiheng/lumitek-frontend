<template>
  <el-card>
    <el-table 
      stripe 
      style="width: 100%" 
      lazy="true"
      :data="tableData" 
      :height="showMoreData ? 650 : 500" 
      @row-click="onTableClick"
    >
      <el-table-column type="index" width="60" label="序號" align="center"/>
      <el-table-column 
        v-for="(colum, index) in tableColum" 
        :prop="colum.prop" 
        :label="colum.label" 
        :width="colum.width" 
        align="center"
      />
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, onMounted, toRaw, watch } from 'vue'
import { initTable } from '@/service/mfb/mfb02'
import { onClickTableQuery } from '@/service/mfb/mfb02'

const props = defineProps({
  sharedData: Object,
  showMoreData: false
})
const tableData = ref([])
const emits = defineEmits(['updateSharedData'])

watch(() => props.sharedData.changeTableData, async () => {
  await initTable().then(resolve => {
    resolve?.data?.form?.forEach(item => {
      tableData.value.push(item)
    })
  })
})

onMounted(async () => {
  await initTable().then(resolve => {
    resolve?.data?.form?.forEach(item => {
      tableData.value.push(item)
    })
  })
})

const onTableClick = async (row, column, event) => {
  const onClickObj = toRaw(row)
  const params = {
    applyNo: onClickObj.applyNo,
    lotNo: onClickObj.lotNo,
    fixBin: onClickObj.fixBin,
    processType: onClickObj.processType,
    custProductNo: onClickObj.custProductNo,
    custProductName: onClickObj.custProductName,
  }
  await onClickTableQuery(params).then(resolve => {
    if (resolve?.status === 200 && resolve?.statusText === 'OK') {
      emits('updateSharedData', {
        queryMode: false,
        showMoreData: true,
        dataSize: 1,
        form: resolve.data.form,
        formDetail: resolve.data.formDetail,
      })
    }
  })
}

const tableColum =  [
  {
    prop: 'custNo',
    label: '客戶代碼',
    width: 80
  },
  {
    prop: 'orderNo',
    label: '客戶訂單號',
    width: 110
  },
  {
    prop: 'issueDate',
    label: '進貨時間',
    width: 180
  },
  {
    prop: 'lotNo',
    label: '批號',
    width: 180
  },
  {
    prop: 'processType',
    label: '製程別',
    width: 175
  },
  {
    prop: 'custProductNo',
    label: '客戶產品型號',
    width: 140
  },
  {
    prop: 'custProductName',
    label: '客戶產品名稱',
    width: 210
  },
  {
    prop: 'waferSize',
    label: '晶圓尺寸',
    width: 90
  },
  {
    prop: 'fixBin',
    label: '固定BIN',
    width: 130
  },
  {
    prop: 'lifePickup',
    label: 'lifePickup',
    width: 100
  },
  {
    prop: 'applyNo',
    label: '客戶進貨單號',
    width: 140
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