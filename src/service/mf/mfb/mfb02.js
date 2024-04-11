import axios from 'axios'
import { handleApiError } from '@/utils/handle_api_error'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function query(params) {
  return await axios
    .post(`${apiBaseUrl}mfb02/query/`, params)
    .catch((error) => {
      handleApiError('mfb02 query', error)
    })
}

export async function initTable() {
  return await axios.post(`${apiBaseUrl}mfb02/import-data/`).catch((error) => {
    handleApiError('mfb02 initTable', error)
  })
}

export async function onClickTableQuery(params) {
  return await axios
    .post(`${apiBaseUrl}mfb02/import-data-fill/`, params)
    .catch((error) => {
      handleApiError('mfb02 onClickTableQuery', error)
    })
}

export async function add(params) {
  return await axios.post(`${apiBaseUrl}mfb02/add/`, params).catch((error) => {
    handleApiError('mfb02 add', error)
  })
}

export async function repeal(params) {
  return await axios
    .post(`${apiBaseUrl}mfb02/repeal/`, params)
    .catch((error) => {
      handleApiError('mfb02 repeal', error)
    })
}
