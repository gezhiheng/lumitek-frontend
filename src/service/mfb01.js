import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function query(params) {
  return await axios.post(`${apiBaseUrl}mfb01/query/`, params)
}