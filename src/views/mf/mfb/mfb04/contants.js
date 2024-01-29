const custNoOptions = [11, 12, 16, 18]

const tableColumns= [
  {
    label: '製令單號',
    prop: 'applyNo',
    width: 140,
  },
  {
    label: '產品型號',
    prop: 'productNo',
    width: 140,
  },
  {
    label: '晶圓數',
    prop: 'qty',
    width: 140,
  },
  {
    label: '客戶批號',
    prop: 'ST_lotNo',
    width: 180,
  },
  {
    label: '派工時間',
    prop: 'applyDate',
    width: 140,
  },
  {
    label: '預計交期',
    prop: 'EstimatedDate',
    width: 140,
  },
]

export { custNoOptions, tableColumns }