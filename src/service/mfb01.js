import axios from "axios"
import swal from 'sweetalert'

const useBackendDataFlag = import.meta.env.VITE_USE_BACKEND_DATA_FLAG === 'true'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function queryMFB01(params) {
  if (!useBackendDataFlag) {
    swal('注意', '没有使用后台数据', 'warning')
    return
  }
  try {
    return await axios.post(`${apiBaseUrl}mfb01/query/`, params)
  } catch(err) {
    swal('錯誤', '獲取數據時發生異常', 'error')
  }
}