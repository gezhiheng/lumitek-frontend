import axios from "axios"

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
  })
}

export async function attachmentDownload(applyNo, fileName) {
  const config = {
    method: 'get',
    url: `${apiBaseUrl}mfb01/attachment-download/${applyNo}/${fileName}`,
    headers: {
      'Content-Type': 'application/octet-stream', // 设置Content-Type
    },
    responseType: 'blob'
  }
  return await axios(config)
}

export async function mfb01Add(params) {
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