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

// 表格的列不多不需要指定宽度，自撑开就行
const cancelTableColmuns = [
  {
    prop: 'command',
    label: 'command',
  },
  {
    prop: 'createdBy',
    label: '建立人員',
  },
  {
    prop: 'createdOn',
    label: '建立日期',
  },
  {
    prop: 'modifiedBy',
    label: '修改人員',
  },
  {
    prop: 'modifiedOn',
    label: '修改日期',
  },
]

const cancelDialog = {
  seqNo: '',
  commandOriginal: '',
  commandModified: ''
}

export { 
  holdTypeTableColumns, 
  holdTypeDialog, 
  cancelTableColmuns, 
  cancelDialog
}