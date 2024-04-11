const unHoldCommand = [
  '雜散點問題已處理完成',
  '重新點測',
  '重抽一排',
  '部份重點接檔',
  '抽一排檔案調整後',
]

const unholdParams = [
  'VF1',
  'VF-人員問題針壓異常 or 雙針高度落差太大',
  'VF-機台問題EDGE SENSOR 異常',
  'VF-產品問題客戶來料問題',
]

const formAttributes = {
  applyNo: '',
  productSeqNo: '',
  holdOn: '',
  holdDepNo: '',
  holdBy: '',
  stageNo: '',
  stepNo: '',
  holdType: '',
  holdCode: '',
  holdCommand: '',
  unholdBy: '',
  unholdDepNo: '',
  unholdOn: '',
  unholdCommand: '',
  depNo: '',
  status: '',
}

const queryFormAttributes = {
  dataIndex: 0,
  F_INP_STAT: '',
  ST_WIPID: '',
  applyNo: '',
  productSeqNo: '',
  holdstartTime: '',
  holdendTime: '',
  holdBy: '',
  unholdstartTime: '',
  unholdendTime: '',
  unholdBy: '',
}

export { unholdParams, unHoldCommand, formAttributes, queryFormAttributes }
