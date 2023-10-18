import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function queryMFB01(params) {
  return await axios.post(`${apiBaseUrl}mfb01/query/`, params)
}

export async function importData(params) {
  return await axios.post(`${apiBaseUrl}mfb01/import-data/`, params)
}