import { defineStore } from 'pinia'
import { queryMFB01 } from '../service/mfb01'
import { ref } from 'vue'

export const useMFB01FormStore = defineStore('mfb01Form', () => {
  const mfb01Data =  ref({
    dataSize: 0,
    form: {},
    tbDetail: [],
    tbDetailDetail: [],
    tbAttachment: []
  })
  async function setMFB01Data(params) {
    const queryData = await queryMFB01(params).then((reslove, reject) => {
      return reslove.data
    })
    mfb01Data.value.dataSize = queryData.dataSize
    mfb01Data.value.form = queryData.form
    mfb01Data.value.tbDetail = queryData.tbDetail
    mfb01Data.value.tbDetailDetail = queryData.tbDetailDetail
    mfb01Data.value.tbAttachment = queryData.tbAttachment
  }
  return { mfb01Data, setMFB01Data }
})

// TODO 增加MFB01查询表单的store