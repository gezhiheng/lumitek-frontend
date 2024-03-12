import axios from 'axios'
import { handleApiError } from '@/utils/handle_api_error'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function brushInData(params) {
  console.log('🚀 ~ brushInData ~ params:', params)
  return await axios.post(`${apiBaseUrl}mfd02/brush-data/`, params).catch(error => {
    handleApiError('mfd01/brushInData', error)
  })
}