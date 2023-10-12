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

  return { queryConditions, setQueryConditions }
})