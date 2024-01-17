const statusOptions = ['工程', '試產', '量產', '終止', '滯產', '重工']
const productInTypeOptions = [
  {
    label: '客戶晶圓',
    value: '1'
  },
  {
    label: '成品晶圓',
    value: '2'
  },
  {
    label: '成品',
    value: '3'
  }
]
const productTypeOptions = [
  {
    label: 'LED',
    value: '0'
  },
  {
    label: 'LC',
    value: '1'
  }
]
const productUnitOptions = ['片', '頁', '粒']

export {
  statusOptions,
  productInTypeOptions,
  productTypeOptions,
  productUnitOptions
}