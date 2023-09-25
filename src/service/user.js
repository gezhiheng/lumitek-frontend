import axios from "axios"

export async function getFeatures(staffNo) {
  return await axios.get(`http://10.1.10.133:8000/features/${staffNo}`)
}

export async function login(params) {
  return await axios.post('http://10.1.10.133:8000/login/', params)
}