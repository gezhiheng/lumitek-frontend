import axios from 'axios'
import swal from 'sweetalert'

const baseURL = import.meta.env.VITE_API_BASE_URL

class BaseRequest {
  constructor(contentType = 'application/json;charset=utf-8') {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': contentType,
      },
    })
  }

  async GET(url, params) {
    return await this.request('GET', url, params)
  }

  async POST(url, params) {
    return await this.request('POST', url, params)
  }

  async PUT(url, params) {
    return await this.request('PUT', url, params)
  }

  async DELETE(url, params) {
    return await this.request('DELETE', url, params)
  }

  async request(method, url, params) {
    try {
      const response = await this.axiosInstance.request({
        method,
        url,
        data: params,
      })
      const result = response.data
      return result
    } catch (error) {
      console.log('🚀 ~ request ~ error:', error)
      swal('錯誤', error?.response?.data?.message || error?.message, 'error')
    }
  }
}

export default BaseRequest