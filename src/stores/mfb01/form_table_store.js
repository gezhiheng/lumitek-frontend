import { defineStore } from 'pinia'
import { queryMFB01, importData } from '@/service/mfb01'
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
    const queryData = await queryMFB01(params)
    .then((reslove, reject) => {
      return reslove.data
    })
    .catch(error => {
      console.log("🚀 ~ file: form_table_store.js:30 ~ setFormTable ~ error:", error)
      swal('錯誤', '獲取數據時發生異常', 'error')
      formTableData.value.dataSize = 0
      return
    })
    formTableData.value.dataSize = queryData.dataSize
    if (queryData.dataSize < 1) {
      swal('注意', '沒有查詢到結果', 'warning')
      return
    }
    setFormTableData(queryData)
  }

  async function importFormTable(params) {
    const data = await importData(params)
    .then((reslove, reject) => {
      return reslove.data
    })
    .catch(error => {
      console.log("🚀 ~ file: form_table_store.js:47 ~ importFormTable ~ error:", error)
      swal('錯誤', '獲取數據時發生異常', 'error')
      return
    })
    if (data.err) {
      swal('注意', data.err, 'warning')
      return
    }
    setFormTableData(data)
  }

  function setFormTableData(data) {
    formTableData.value.form.custNo = data.form.custNo
    formTableData.value.form.orderNo = data.form.orderNo
    formTableData.value.form.applyNo = data.form.applyNo
    formTableData.value.form.issueDate = data.form.issueDate
    formTableData.value.form.processType = data.form.processType
    formTableData.value.form.totWaferQty = data.form.totWaferQty
    formTableData.value.form.degree = data.form.degree
    formTableData.value.form.remark = data.form.remark
    formTableData.value.tbDetail = data.tbDetail
    formTableData.value.tbDetailDetail = data.tbDetailDetail
    formTableData.value.tbAttachment = data.tbAttachment
  }

  function resetFormTable () {
    formTableData.value.dataSize = 0
    formTableData.value.form.custNo = ''
    formTableData.value.form.orderNo = ''
    formTableData.value.form.applyNo = ''
    formTableData.value.form.issueDate = ''
    formTableData.value.form.processType = ''
    formTableData.value.form.totWaferQty = ''
    formTableData.value.form.degree = ''
    formTableData.value.form.remark = ''
    formTableData.value.tbDetail = []
    formTableData.value.tbDetailDetail = []
    formTableData.value.tbAttachment = []
  }

  return { formTableData, setFormTable, resetFormTable, importFormTable }
})