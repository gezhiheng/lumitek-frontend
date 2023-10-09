import { defineStore } from 'pinia'
import { queryMFB01 } from '../service/mfb01'

// TODO 先定义在MFB01中赋值
export const useMFB01FormStore = defineStore('mfb01Form', {
  state: () => ({
    custNo: '12',
    orderNo: '23091601E6',
    applyNo: 'PRE2023090945',
    issueDate: '2023-09-16 01:00:00',
    processType: 'AOI+SORT+計數+FQC',
    totWaferQty: '94.00',
    degree: 'N',
    remark: ''
  }),
  actions: {
    async setData(params) {
      const data = await queryMFB01(params).then(resolve => {
        return resolve.data
      })
      this.custNo = data.custNo
      this.orderNo = data.orderNo
      this.applyNo = data.applyNo
      this.issueDate = data.issueDate
      this.processType = data.processType
      this.totWaferQty = data.totWaferQty
      this.degree = data.degree
      this.remark = data.remark
    }
  }
})

export const useMFB01QueryFormStore = defineStore('mfb01QueryForm', {
  state: () => ({
    custNo: '',
    applyNo: '',
    startTime: '',
    endTime: '',
    processType: '',
    lotNo: '',
    WIPID: '',
    orderNo: '',
  })
})