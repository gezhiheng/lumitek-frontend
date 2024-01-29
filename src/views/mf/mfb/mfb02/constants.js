const formTableColumns = [
  {
    prop: 'productSeqNo',
    label: '子批號',
    width: 110
  },
  {
    prop: 'ST_lotNo',
    label: '客戶批號',
    width: 190
  },
  {
    prop: 'ST_itemNo',
    label: '客戶項次',
    width: 90
  },
  {
    prop: 'ST_WIPID',
    label: '晶片刻號',
    width: 120
  },
  {
    prop: 'ST_laserMark',
    label: 'LaserMark',
    width: 130
  },
  {
    prop: 'status',
    label: '狀態',
    width: 90
  },
  {
    prop: 'stageNo',
    label: '站別',
    width: 90
  },
  {
    prop: 'stepNo',
    label: '子站別',
    width: 90
  },
  {
    prop: 'PROD_BATCH_M',
    label: '母批號',
    width: 120
  },
]

const tableTableColumns =  [
  {
    prop: 'custNo',
    label: '客戶代碼',
    width: 80
  },
  {
    prop: 'orderNo',
    label: '客戶訂單號',
    width: 110
  },
  {
    prop: 'applyNo',
    label: '客戶進貨單號',
    width: 140
  },
  {
    prop: 'issueDate',
    label: '進貨時間',
    width: 180
  },
  {
    prop: 'lotNo',
    label: '批號',
    width: 180
  },
  {
    prop: 'processType',
    label: '製程別',
    width: 175
  },
  {
    prop: 'custProductNo',
    label: '客戶產品型號',
    width: 140
  },
  {
    prop: 'custProductName',
    label: '客戶產品名稱',
    width: 220
  },
  {
    prop: 'waferSize',
    label: '晶圓尺寸',
    width: 90
  },
  {
    prop: 'fixBin',
    label: '固定BIN',
    width: 130
  },
  {
    prop: 'lifePickup',
    label: 'lifePickup',
    width: 100
  },
  {
    prop: 'shipSite',
    label: '回貨廠區',
    width: 90
  },
  {
    prop: 'reworkNo',
    label: '退貨重工',
    width: 90
  }
]

export { formTableColumns, tableTableColumns }