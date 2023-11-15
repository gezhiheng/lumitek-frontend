<template>
  <el-card type="border-card" >
    <el-tabs style="margin-top: 10px;" model-value="first">

      <el-tab-pane label="總表" name="first">
        <el-table 
          style="width: 100%; 
          margin-bottom: 15px;
          padding: 0;" 
          :data="formTableData.tbDetail"
          :max-height="verticalLayoutFlag ? 750 : 500"
          highlight-current-row
          @selection-change="handleTBDetailSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            v-for="(item, index) in tbDetailColumns"
            :fixed="verticalLayoutFlag && index < 4"
            :prop="item[1]"
            :label="item[0]" 
            :width="item[0].length > 4 ? 150 : 80"
          />
        </el-table>

        <span v-if="queryMode">
          <el-button plain type="success" @click="lotReduction">
            <el-icon><Check /></el-icon>
            <span>资料还原</span>
          </el-button>
          <el-button plain type="danger" @click="lotRepeal">
            <el-icon><Close /></el-icon>
            <span>资料作废</span>
          </el-button>
        </span>
      </el-tab-pane>

      <el-tab-pane label="明細" name="second">
        <el-table 
          :data="formTableData.tbDetailDetail" 
          :max-height="verticalLayoutFlag ? 750 : 500"
          style="width: 100%"
        >
          <el-table-column 
            v-for="item in tbDetailDetailColumns"
            :prop="item[1]" 
            :label="item[0]" 
            :width="item[0].length > 4 ? 150 : 100"
          />
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="附件" name="third">
        <el-table 
          :data="formTableData.tbAttachment"
          style="width: 100%; margin-bottom: 15px;" 
          :max-height="verticalLayoutFlag ? 750 : 500"
          @selection-change="handleTBAttachmentSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="檔案名稱" prop="fileName" width="200"/>
        </el-table>
        
        <span>
          <el-button v-if="queryMode || insertMode" type="success" @click="btnAddAttachment" plain>
            <el-icon><CirclePlusFilled /></el-icon>
            <span>新增</span>
          </el-button>
          <el-button v-if="queryMode || insertMode" type="danger" plain>
            <el-icon><RemoveFilled /></el-icon>
            <span>删除</span>
          </el-button>
          <el-button v-if="queryMode" type="info" plain @click="download">
            <el-icon><UploadFilled /></el-icon>
            <span>下载</span>
          </el-button>
          <input type="file" ref="selectFile" @change="uploadAttachment" multiple>
        </span>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { toRaw, ref } from 'vue'
import { Check, Close, CirclePlusFilled, RemoveFilled, UploadFilled } from '@element-plus/icons-vue'
import { mfb01LotRepeal, mfb01LotReduction, downloadAttachment, addAttachment } from '@/service/mfb01'
import { useFormTableStore } from '@/stores/mfb01/form_table_store'
import { resolveAlert } from '@/utils/resloveAlert'
import swal from 'sweetalert'

const { formTableData } = useFormTableStore()
const selectFile = ref(null)

let lotNos = []
const handleTBDetailSelectionChange = (items) => {
  const tempLotNos = []
  items.forEach(item => {
    tempLotNos.push(toRaw(item).lotNo)
  })
  lotNos = tempLotNos
}

let fileNames = []
const handleTBAttachmentSelectionChange = (items) => {
  const tempFileNames = []
  items.forEach(item => {
    tempFileNames.push(toRaw(item).fileName)
  })
  fileNames = tempFileNames
}

const staffNo = window.sessionStorage.getItem('staffNo')
const lotRepeal = () => {
  mfb01LotRepeal({
    user: staffNo,
    applyNo: formTableData.form.applyNo,
    lotNos: lotNos
  }).then((resolve, reject) => {
    resolveAlert(resolve)
  })
}

const lotReduction = () => {
  mfb01LotReduction({
    user: staffNo,
    applyNo: formTableData.form.applyNo,
    lotNos: lotNos,
    custNo: formTableData.form.custNo
  }).then((resolve, reject) => {
    resolveAlert(resolve)
  })
}

const download = () => {
  if (fileNames.length === 0) {
    swal('注意', '請選擇附件下載', 'warning')
    return
  }
  const downloadLinks = []
  fileNames.forEach(fileName => {
    downloadAttachment(formTableData.form.applyNo, fileName).then(response => {
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.click()
      downloadLinks.push(link)
    })
  })
  // 下载完成后删除所有的a标签
  setTimeout(() => {
   downloadLinks.forEach(link => {
     link.remove()
   })
  }, 5000)
}

const uploadAttachment = (event) => {
  const files = event.target.files
  if (!files) {
    swal("注意", "請選擇正确的文件", "warning")
    return
  }
  const staffNo = window.sessionStorage.getItem('staffNo')
  addAttachment(
    formTableData.form.applyNo,
    formTableData.form.orderNo,
    staffNo,
    files
  ).then(resolve => {
    console.log("🚀 ~ file: TableCard.vue:172 ~ uploadAttachment ~ resolve:", resolve)
    
  })
}

const btnAddAttachment = () => {
  selectFile.value.click()
}

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

const props = defineProps({
  verticalLayoutFlag: Boolean,
  queryMode: Boolean,
  insertMode: Boolean
})
</script>