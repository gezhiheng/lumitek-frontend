const tbDetailColumns = [
  ['項次', 'orderItemNo'], 
  ['出廠別', 'custSite'], 
  ['客戶產品型號', 'custProductNo'], 
  ['客戶產品名稱', 'custProductName'], 
  ['批號 委工單號', 'lotNo'], 
  ['作業', 'task'], 
  ['晶圓數量', 'waferQty'], 
  ['回貨廠區', 'shipSite'],
  ['晶圓大小','waferSize'],
  ['退貨重工','reworkNo'],
  ['客戶批號','batchNo'],
  ['到期日','DueDate'],
  ['固定BIN','fixBin'],
  ['機群','machineGroup'],
  ['方片對角線','pageDiagonalLine'],
  ['包裝方式','packageType'],
  ['pad grade','padGrade'],
  ['Sort Fail Bin','sortFailBin'],
  ['Life Pickup','lifePickup'],
  ['ESD','ESD'],
  ['electricCurrent','electricCurrent'],
  ['status','status'],
  ['專案代碼','projectID'],
  ['Approval','approval'],
  ['KEA','KEA'],
  ['AProject','AProject'],
  ['抽測有效顆粒數','fEffectiveQty'],
  ['Tape可抽測顆粒數','fQtyLimit'],
  ['回貨資訊','sreturn'],
  ['工程驗證','sengverify'],
  ['圓片有效顆數ratio','fratio'],
  ['方片抽測比例','ftestRatioNo'],
  ['blockSize','blockSize'],
  ['專案代碼blockSize','projectBlockSize'],
  ['projectName','projectName']
]

const tbDetailDetailColumns = [
  ['批號', 'lotNo'],
  ['項次', 'itemNo'],
  ['晶片刻號', 'WIPID'],
  ['客戶產品名稱', 'custProductName'],
  ['LaserMark', 'laserMark'],
  ['Life Pickup', 'lifePickup'],
  ['委出片數', 'piece'],
  ['委出KEA', 'KEA']
]

const custNos = ['-','08','11','12','13','13A','17','18','19','20','21','22',]

export { tbDetailColumns, tbDetailDetailColumns, custNos }