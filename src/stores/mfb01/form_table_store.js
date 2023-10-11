import { defineStore } from 'pinia'
import { queryMFB01 } from '../../service/mfb01'
import { ref } from 'vue'

export const useFormTableStore = defineStore('formTable', () => {
  const formTableData =  ref({
    dataSize: 0,
    form: {},
    tbDetail: [],
    tbDetailDetail: [],
    tbAttachment: []
  })
  async function setFormTable(params) {
    const queryData = await queryMFB01(params).then((reslove, reject) => {
      return reslove.data
    })
    formTableData.value.dataSize = queryData.dataSize
    formTableData.value.form = queryData.form
    formTableData.value.tbDetail = queryData.tbDetail
    formTableData.value.tbDetailDetail = queryData.tbDetailDetail
    formTableData.value.tbAttachment = queryData.tbAttachment
  }
  return { formTableData, setFormTable }
})