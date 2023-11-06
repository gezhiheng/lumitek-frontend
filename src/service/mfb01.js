import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function queryMFB01(params) {
  return await axios.post(`${apiBaseUrl}mfb01/query/`, params)
}

export async function importDataAuto(params) {
  return await axios.post(`${apiBaseUrl}mfb01/import-data-auto/`, params)
}

export async function importData(custNo, file) {
  const formData = new FormData()
  formData.append('file', file)
  
  return await axios.post(`${apiBaseUrl}mfb01/import-data/`, {
    custNo: custNo,
    file: file,
    fileload: ''
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
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