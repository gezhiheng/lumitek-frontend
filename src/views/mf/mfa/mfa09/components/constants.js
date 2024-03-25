const holdTypeTableColumns = [
  {
    prop: 'seqNo',
    label: 'No',
    width: 50
  },
  {
    prop: 'holdCode',
    label: '扣留代碼',
    width: 180
  },
  {
    prop: 'holdCommand',
    label: '扣留信息',
    width: 250
  },
  {
    prop: 'isEnable',
    label: '有效',
    width: 80
  },
  {
    prop: 'isWafer',
    label: '晶園',
    width: 80
  },
  {
    prop: 'createdBy',
    label: '建立人員',
    width: 150
  },
  {
    prop: 'createdOn',
    label: '建立日期',
    width: 120
  },
  {
    prop: 'modifiedBy',
    label: '修改人員',
    width: 150
  },
  {
    prop: 'modifiedOn',
    label: '修改日期',
    width: 120
  },
]

const holdTypeDialog = {
  seqNo: '',
  isEnable: '0',
  isWafer: '0',
  holdCodeOriginal: '',
  holdCodeModified: '',
  holdCommand: ''
}

export { holdTypeTableColumns, holdTypeDialog }