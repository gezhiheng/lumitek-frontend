import { defineStore } from 'pinia'

// TODO 先定义在MFB01中赋值
export const useMFB01FormStore = defineStore('mfb01Form', {
  state: () => {
    return {
      custNo: '12',
      orderNo: '23091601E6',
      applyNo: 'PRE2023090945',
      issueDate: '2023-09-16 01:00:00',
      processType: 'AOI+SORT+計數+FQC',
      totWaferQty: '94.00',
      degree: 'N',
      remark: ''
    }
  }
})

export const useMFB01QueryFormStore = defineStore('mfb01QueryForm', {
  state: () => {
    return {
      custNo: '',
      applyNo: '',
      startTime: '',
      endTime: '',
      processType: '',
      lotNo: '',
      WIPID: '',
      orderNo: '',
    }
  }
})