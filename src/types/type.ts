export interface stationOption {
  key: string
  label: string
  disabled: boolean
}

export interface station {
  stationNo: string
  stationName: string
}

export interface queryResponse {
  dataSize: number
  form: object
  stations: station[]
}

export interface stationResponse {
  tip: string
  stationOptions: station[]
}

export type axiosResponse<TData = any, TError = any> = {
  // 定义 voidAxiosResponse 的结构
  data: any
}
