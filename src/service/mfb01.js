import axios from "axios"
import swal from 'sweetalert'

const useBackendDataFlag = import.meta.env.VITE_USE_BACKEND_DATA_FLAG === 'true'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function queryMFB01(params) {
  if (!useBackendDataFlag) {
    swal('注意', '没有使用后台数据', 'warning')
    return
  }
  return await axios.post(`${apiBaseUrl}mfb01/query/`, params)
}