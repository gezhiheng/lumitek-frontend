import { defineStore } from 'pinia'
import { queryMFB01, importData, importDataAuto } from '@/service/mfb01'
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
      custSite: '',
      shipSite: '',
      custProductNo: '',
      custProductName: '',
      status: '',
      CustType: '', // 需要将传入的字段统一
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

  async function importFormTableAuto(params) {
    const data = await importDataAuto(params)
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

  async function importFormTable(custNo, file) {
    const data = await importData(custNo, file)
    .then((reslove, reject) => {
      console.log("🚀 ~ file: form_table_store.js:64 ~ .then ~ reslove.data:", reslove.data)
      return reslove.data
    })
    setFormTableData(data)
  }

  function setFormTableData(data) {
    const form = data.form
    Object.entries(form).forEach(([key, value]) => {
      if (formTableData.value.form.hasOwnProperty(key)) {
        formTableData.value.form[key] = value
      }
    })
    formTableData.value.tbDetail = data.tbDetail
    formTableData.value.tbDetailDetail = data.tbDetailDetail
    formTableData.value.tbAttachment = data.tbAttachment
  }

  function resetFormTable () {
    Object.entries(formTableData.value.form).forEach(([key, value]) => {
        formTableData.value.form[key] = ''
      }
    )
    formTableData.value.dataSize = 0
    formTableData.value.tbDetail = []
    formTableData.value.tbDetailDetail = []
    formTableData.value.tbAttachment = []
  }

  return { formTableData, setFormTable, resetFormTable, importFormTable, importFormTableAuto }
})