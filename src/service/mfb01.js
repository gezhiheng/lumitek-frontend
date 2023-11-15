import axios from "axios"
import swal from 'sweetalert'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function queryMFB01(params) {
  return await axios.post(`${apiBaseUrl}mfb01/query/`, params)
}

export async function importDataAuto(params) {
  return await axios.post(`${apiBaseUrl}mfb01/import-data-auto/`, params)
}

export async function importData(custNo, files) {
  const fileList = Array.from(files)
  const formData = new FormData()
  formData.append('custNo', custNo)
  fileList.forEach(file => {
    formData.append('file', file)
  });
  return await axios.post(`${apiBaseUrl}mfb01/import-data/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch(error => {
    console.log("🚀 ~ file: mfb01.js:26 ~ importData ~ error:", error)
    swal("錯誤", "匯入文件失敗", "error")
  })
}

export async function downloadAttachment(applyNo, fileName) {
  const config = {
    method: 'get',
    url: `${apiBaseUrl}mfb01/attachment-download/${applyNo}/${fileName}`,
    headers: {
      'Content-Type': 'application/octet-stream', // 设置Content-Type
    },
    responseType: 'blob'
  }
  return await axios(config).catch(error => {
    console.log("🚀 ~ file: mfb01.js:38 ~ returnawaitaxios ~ error:", error)
    swal("錯誤", "文件下載失敗", "error")
  })
}

export async function addAttachment(applyNo, orderNo, staffNo, files) {
  const fileList = Array.from(files)
  const formData = new FormData()
  formData.append('applyNo', applyNo)
  formData.append('orderNo', orderNo)
  formData.append('staffNo', staffNo)
  fileList.forEach(file => {
    formData.append('files', file)
  });
  return await axios.post(`${apiBaseUrl}mfb01/attachment-add/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch(error => {
    console.log("🚀 ~ file: mfb01.js:57 ~ addAttachment ~ error:", error)
    swal("錯誤", "附件添加失敗", "error")
  })
}

export async function mfb01Add(params) {
  console.log("🚀 ~ file: mfb01.js:66 ~ mfb01Add ~ params:", params)
  return await axios.post(`${apiBaseUrl}mfb01/add/`, params)
}

export async function mfb01Repeal(params) {
  return await axios.post(`${apiBaseUrl}mfb01/repeal/`, params)
}

export async function mfb01LotRepeal(params) {
  return await axios.post(`${apiBaseUrl}mfb01/lot-repeal/`, params)
}

export async function mfb01LotReduction(params) {
  return await axios.post(`${apiBaseUrl}mfb01/lot-reduction/`, params)
}