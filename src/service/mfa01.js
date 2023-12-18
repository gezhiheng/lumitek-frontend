import axios from "axios"
import swal from 'sweetalert'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function queryMFA01(params) {
  return await axios.post(`${apiBaseUrl}mfa01/query/`, params).catch(error => {
    console.log("🚀 ~ file: mfa01.js:8 ~ returnawaitaxios.post ~ error:", error)
    swal("錯誤", "MFA01查询失败", "error")
  })
}

export async function getWipStdOptions() {
  return await axios.post(`${apiBaseUrl}mfa01/wipstdno-options/`).catch(error => {
    console.log("🚀 ~ file: mfa01.js:15 ~ returnawaitaxios.post ~ error:", error)
    swal("錯誤", "獲取WipStdOptions失敗", "error")
  })
}