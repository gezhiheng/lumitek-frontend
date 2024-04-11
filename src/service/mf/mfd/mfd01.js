import axios from 'axios'
import { handleApiError } from '@/utils/handle_api_error'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function query(params) {
  return await axios
    .post(`${apiBaseUrl}mfd01/query/`, params)
    .catch((error) => {
      handleApiError('mfd01 query', error)
    })
}

export async function queryDepartment(params) {
  return await axios
    .post(`${apiBaseUrl}mfd01/department-query/`, params)
    .catch((error) => {
      handleApiError('mfd01 queryDepartment', error)
    })
}

export async function getHoldCode() {
  return await axios.post(`${apiBaseUrl}mfd01/holdcode/`).catch((error) => {
    handleApiError('mfd01 getHoldCode', error)
  })
}

export async function getCurrentStepInfo(params) {
  return await axios
    .post(`${apiBaseUrl}mfd01/productseqno_monitor/`, params)
    .catch((error) => {
      handleApiError('mfd01 getCurrentStepInfo', error)
    })
}

export async function getHoldCommand(params) {
  return await axios
    .post(`${apiBaseUrl}mfd01/holdcode_monitor/`, params)
    .catch((error) => {
      handleApiError('mfd01 getHoldCommand', error)
    })
}

export async function getStageAndStep(params) {
  return await axios
    .post(`${apiBaseUrl}mfd01/holdtype_monitor/`, params)
    .catch((error) => {
      handleApiError('mfd01 getStageAndStep', error)
    })
}

export async function hold(params) {
  return await axios.post(`${apiBaseUrl}mfd01/hold/`, params).catch((error) => {
    handleApiError('mfd01 hold', error)
  })
}

export async function getPendingNum(params) {
  return await axios
    .post(`${apiBaseUrl}mfd01/pending/`, params)
    .catch((error) => {
      handleApiError('mfd01 getPendingNum', error)
    })
}

export async function getPendingInfo(params) {
  return await axios
    .post(`${apiBaseUrl}mfd01/pending-data-fill/`, params)
    .catch((error) => {
      handleApiError('mfd01 getPendingInfo', error)
    })
}

export async function unhold(params) {
  return await axios
    .post(`${apiBaseUrl}mfd01/unhold/`, params)
    .catch((error) => {
      handleApiError('mfd01 unhold', error)
    })
}
