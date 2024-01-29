import axios from 'axios'
import { handleApiError } from '@/utils/handle_api_error'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function query(params) {
  return await axios.post(`${apiBaseUrl}mfb04/query/`, params).catch(error => {
    handleApiError('mfb04 query', error)
  })
}

export async function getPdfUrls(params) {
  return await axios.post(`${apiBaseUrl}mfb04/pdf-urls/`, params).catch(error => {
    handleApiError('mfb04 getPdfUrls', error)
  })
}