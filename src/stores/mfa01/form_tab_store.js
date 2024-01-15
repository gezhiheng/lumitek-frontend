import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { queryMFA01 } from '@/service/mf/mfa/mfa01'

export const useFormTabStore = defineStore('formTab', () => {
  const formTabData = reactive({
    dataSize: 0,
    form: {
      isEnable: true, //是否有效
      productNo: '', //產品型號
      custNo: '', //客戶簡碼
      custSiteNo: '', // 客戶厰別
      status: '', // 狀態
      productInType: '', // 產品進貨類型
      custProductNo: '', // 客戶產品型號
      custProductPartName: '', //客戶內部料號
      productType: '', // 產品形態
      productUnit: '', // 單位
      batchQty: '', // 批單位數量
      processType: '', //製程別
      waferSize: '',  //晶圓尺寸
      grossQty: '', //毛晶粒數
      proberQty: '',//點測晶粒數
      sorterQty: '',//挑揀晶粒數
      fullBINQty: '',//滿BIN數
      WipStdNo: '',//晶圓製程
      proberYield: '',//點測良率
      AOI_KPI: '',//AOI的kpi值
      sorterWarningYield: '',//挑揀良率警戒值
      sorterYield: '' //挑揀良率>=入Bin率
    },
    wipStations: [],
    productStations: []
  })

  async function setFormTab(params) {
    let size = 0
    await queryMFA01(params).then(resolve => {
      size = resolve.data.dataSize
      formTabData.dataSize = size
      if (size > 0) {
        const form = resolve.data.form
        Object.keys(form).forEach(key => {
          if (formTabData.form.hasOwnProperty(key)) {
            formTabData.form[key] = form[key]
          }
        })
        formTabData.wipStations = resolve.data.wipStations
        formTabData.productStations = resolve.data.productStations
      }
    })
    return size
  }

  function resetFormTab() {
    formTabData.dataSize = 0
    Object.keys(formTabData.form).forEach(key => {
      formTabData.form[key] = ''
    })
    formTabData.form.isEnable = true
    formTabData.wipStations = []
    formTabData.productStations = []
  }

  function setStations(stationName, resource) {
    formTabData[stationName] = resource
  }

  return { formTabData, setFormTab, resetFormTab, setStations }
})