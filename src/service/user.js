import axios from "axios"

export function getFeatures() {
  return axios.get('')
}

export function login(params) {
  return axios.post('/login', params)
}