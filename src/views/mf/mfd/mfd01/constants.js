const unHoldCommand = [
  '雜散點問題已處理完成',
  '重新點測',
  '重抽一排',
  '部份重點接檔',
  '抽一排檔案調整後'
]

const unholdParams = [
  'VF1',
  'VF-人員問題針壓異常 or 雙針高度落差太大',
  'VF-機台問題EDGE SENSOR 異常',
  'VF-產品問題客戶來料問題'
]

const formAttributes = {
  applyNo: 'WPH2402110001',
  productSeqNo: 'B2420061',
  holdOn: '2024-02-19T15:00:09.887',
  holdDepNo: '製造部',
  holdBy: 'LC0006',
  stageNo: 'O000',
  stepNo: '7677',
  holdType: '',
  holdCode: '123',
  holdCommand: 'aaa',
  unholdBy: '',
  unholdDepNo: '',
  unholdOn: '',
  unholdCommand: '',
  depNo: '生管',
  status: '待處理'
}

const queryFormAttributes =  {
  dataIndex: 0,
  F_INP_STAT: '待處理',
  ST_WIPID: '',
  applyNo: '',
  productSeqNo: '',
  holdstartTime: '',
  holdendTime: '',
  holdBy: '',
  unholdstartTime: '',
  unholdendTime: '',
  unholdBy: ''
}

export { unholdParams, unHoldCommand, formAttributes, queryFormAttributes }