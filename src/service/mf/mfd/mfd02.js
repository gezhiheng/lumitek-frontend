import axios from 'axios'
import { handleApiError } from '@/utils/handle_api_error'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function brushInData(params) {
  return await axios.post(`${apiBaseUrl}mfd02/brush-data/`, params).catch(error => {
    handleApiError('mfd02/brushInData', error)
  })
}

export async function skipStation(params) {
  return await axios.post(`${apiBaseUrl}mfd02/skip-station/`, params).catch(error => {
    handleApiError('mfd02/skipStation', error)
  })
}

export async function cancelStation(params) {
  return await axios.post(`${apiBaseUrl}mfd02/cancel-station/`, params).catch(error => {
    handleApiError('mfd02/cancelStation', error)
  })
}

export async function getCancelStationCauses() {
  return await axios.post(`${apiBaseUrl}mfd02/cancel-validation/`).catch(error => {
    handleApiError('mfd02/getCancelStationCauses', error)
  })
}