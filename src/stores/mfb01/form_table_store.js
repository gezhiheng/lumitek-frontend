import { defineStore } from 'pinia'
import { queryMFB01 } from '@/service/mfb01'
import { ref } from 'vue'
import swal from 'sweetalert'

export const useFormTableStore = defineStore('formTable', () => {
  const formTableData =  ref({
    dataSize: 0,
    form: {
      custNo: '',
      orderNo: '',
      applyNo: '',
      issueDate: '',
      processType: '',
      totWaferQty: '',
      degree: '',
      remark: '',
    },
    tbDetail: [],
    tbDetailDetail: [],
    tbAttachment: []
  })

  async function setFormTable(params) {
    const queryData = await queryMFB01(params).then((reslove, reject) => {
      console.log("🚀 ~ file: form_table_store.js:27 ~ queryData ~ reslove.data:", reslove.data)
      return reslove.data
    })
    formTableData.value.dataSize = queryData.dataSize
    if (queryData.dataSize < 1) {
      swal('注意', '沒有查詢到結果', 'warning')
      return
    }
    formTableData.value.form.custNo = queryData.form.custNo
    formTableData.value.form.orderNo = queryData.form.orderNo
    formTableData.value.form.applyNo = queryData.form.applyNo
    formTableData.value.form.issueDate = queryData.form.issueDate
    formTableData.value.form.processType = queryData.form.processType
    formTableData.value.form.totWaferQty = queryData.form.totWaferQty
    formTableData.value.form.degree = queryData.form.degree
    formTableData.value.form.remark = queryData.form.remark
    formTableData.value.tbDetail = queryData.tbDetail
    formTableData.value.tbDetailDetail = queryData.tbDetailDetail
    formTableData.value.tbAttachment = queryData.tbAttachment
  }

  return { formTableData, setFormTable }
})