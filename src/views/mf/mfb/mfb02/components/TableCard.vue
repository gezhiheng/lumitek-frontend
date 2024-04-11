<template>
  <el-card>
    <el-table
      stripe
      style="width: 100%"
      lazy="true"
      :data="tableData"
      :height="showMoreData || refresh ? 600 : 500"
      empty-text="沒有數據"
      @row-click="onTableClick"
    >
      <el-table-column type="index" width="50" align="center" />
      <el-table-column
        v-for="(colum, index) in tableTableColumns"
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
import { initTable } from '@/service/mf/mfb/mfb02'
import { onClickTableQuery } from '@/service/mf/mfb/mfb02'
import { tableTableColumns } from '../constants'

const props = defineProps({
  sharedData: Object,
  showMoreData: false,
})
const tableData = ref([])
const refresh = ref(false)
const emits = defineEmits(['updateSharedData'])

watch(
  () => props.sharedData.changeTableData,
  async () => {
    await initTable().then((resolve) => {
      if (resolve.data.form) {
        tableData.value = resolve.data.form
        refresh.value = true
      }
    })
  },
)

onMounted(async () => {
  await initTable().then((resolve) => {
    resolve?.data?.form?.forEach((item) => {
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
  await onClickTableQuery(params).then((resolve) => {
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
</script>
