import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getFeatures(staffNo) {
  return await axios.get(`${apiBaseUrl}features/${staffNo}`)
}

export async function login(params) {
  return await axios.post(`${apiBaseUrl}login/`, params)
}