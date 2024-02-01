import axios from "axios"
import { handleApiError } from '@/utils/handle_api_error'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function brushInData(params) {
  return await axios.post(`${apiBaseUrl}qca02/brushInData/`, params).catch(error => {
    handleApiError('mfb01/brushInData', error)
  })
}

export async function passStation(params) {
  return await axios.post(`${apiBaseUrl}qca02/overStation/`, params).catch(error => {
    handleApiError('mfb01/passStation', error)
  })
}