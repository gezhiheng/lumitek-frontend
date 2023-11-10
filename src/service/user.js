import axios from "axios"
import swal from 'sweetalert'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getFeatures(staffNo) {
  return await axios.get(`${apiBaseUrl}features/${staffNo}`).catch(error => {
    console.log("🚀 ~ file: user.js:9 ~ returnawaitaxios.get ~ error:", error)
    swal("錯誤", "獲取功能列表時發生錯誤", "error")
  })
}

export async function login(params) {
  return await axios.post(`${apiBaseUrl}login/`, params).catch(error => {
    console.log("🚀 ~ file: user.js:16 ~ returnawaitaxios.post ~ error:", error)
    swal("錯誤", "登錄出現錯誤", "error")
  })
}