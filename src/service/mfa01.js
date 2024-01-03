import axios from "axios"
import swal from 'sweetalert'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function queryMFA01(params) {
  return await axios.post(`${apiBaseUrl}mfa01/query/`, params).catch(error => {
    console.log("🚀 ~ file: mfa01.js:8 ~ returnawaitaxios.post ~ error:", error)
    swal("錯誤", "MFA01查询失败", "error")
  })
}

export async function getWipStations() {
  return await axios.post(`${apiBaseUrl}mfa01/wipstdno-options/`).catch(error => {
    console.log("🚀 ~ file: mfa01.js:15 ~ returnawaitaxios.post ~ error:", error)
    swal("錯誤", "獲取WipStations失敗", "error")
  })
}

export async function getProductStations() {
  return await axios.post(`${apiBaseUrl}mfa01/station-options/`).catch(error => {
    console.log("🚀 ~ file: mfa01.js:22 ~ returnawaitaxios.post ~ error:", error)
    swal("錯誤", "獲取ProductStations失敗", "error")
  })
}

export async function add(params) {
  return await axios.post(`${apiBaseUrl}mfa01/add/`, params).catch(error => {
    console.log("🚀 ~ file: mfa01.js:29 ~ returnawaitaxios.post ~ error:", error)
    if (error.response.data.message) {
      swal("錯誤", error.response.data.message, "error")
    } else {
      swal("錯誤", "新增時-服務端發生錯誤", "error")
    }
  })
}

export async function update(params) {
  return await axios.post(`${apiBaseUrl}mfa01/modify/`, params).catch(error => {
    console.log("🚀 ~ file: mfa01.js:40 ~ returnawaitaxios.post ~ error:", error)
    if (error.response.data.message) {
      swal("錯誤", error.response.data.message, "error")
    } else {
      swal("錯誤", "修改時-服務端發生錯誤", "error")
    }
  })
}