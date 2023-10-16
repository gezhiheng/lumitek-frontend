import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQueryStore = defineStore('queryCondition', () => {
  const queryConditions = ref({
    dataIndex: 0,
    custNo: '',
    applyNo: '',
    startTime: '',
    endTime: '',
    processType: '',
    lotNo: '',
    WIPID: '',
    orderNo: ''
  })

  function setQueryConditions(params) {
    queryConditions.value = params
  }

  function resetQueryConditions() {
    queryConditions.value.dataIndex = 0
    queryConditions.value.custNo = ''
    queryConditions.value.applyNo = ''
    queryConditions.value.startTime = ''
    queryConditions.value.endTime  = ''
    queryConditions.value.processType =  ''
    queryConditions.value.lotNo = ''
    queryConditions.value.WIPID = ''
    queryConditions.value.orderNo = ''
  }

  return { queryConditions, setQueryConditions, resetQueryConditions }
})