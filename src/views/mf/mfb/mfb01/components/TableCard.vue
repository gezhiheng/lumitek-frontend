<template>
  <el-card type="border-card">
    <el-tabs style="margin-top: 10px" model-value="first">
      <el-tab-pane label="總表" name="first">
        <el-table
          style="width: 100%; margin-bottom: 15px; padding: 0"
          :data="formTableData.tbDetail"
          :max-height="verticalLayoutFlag ? 750 : 500"
          empty-text="沒有數據"
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
            <span>資料還原</span>
          </el-button>
          <el-button plain type="danger" @click="lotRepeal">
            <el-icon><Close /></el-icon>
            <span>資料作廢</span>
          </el-button>
        </span>
      </el-tab-pane>

      <el-tab-pane label="明細" name="second">
        <el-table
          :data="formTableData.tbDetailDetail"
          :max-height="verticalLayoutFlag ? 750 : 500"
          style="width: 100%"
          empty-text="沒有數據"
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
          style="width: 100%; margin-bottom: 15px"
          :max-height="verticalLayoutFlag ? 750 : 500"
          empty-text="沒有數據"
          @selection-change="handleTBAttachmentSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="檔案名稱" prop="fileName" width="200" />
        </el-table>

        <span>
          <el-button
            v-if="queryMode || insertMode"
            type="success"
            @click="btnAddAttachment"
            plain
          >
            <el-icon><CirclePlusFilled /></el-icon>
            <span>新增</span>
          </el-button>
          <el-button
            v-if="queryMode || insertMode"
            type="danger"
            @click="delAttachment"
            plain
          >
            <el-icon><RemoveFilled /></el-icon>
            <span>刪除</span>
          </el-button>
          <el-button v-if="queryMode" type="info" plain @click="download">
            <el-icon><UploadFilled /></el-icon>
            <span>下載</span>
          </el-button>
          <input
            type="file"
            ref="selectFile"
            style="display: none"
            @change="uploadAttachment"
            multiple
          />
        </span>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { toRaw, ref } from 'vue'
import {
  Check,
  Close,
  CirclePlusFilled,
  RemoveFilled,
  UploadFilled,
} from '@element-plus/icons-vue'
import swal from 'sweetalert'
import {
  mfb01LotRepeal,
  mfb01LotReduction,
  downloadAttachment,
  addAttachment,
  deleteAttachment,
} from '@/service/mf/mfb/mfb01'
import { useFormTableStore } from '@/stores/mfb01/form_table_store'
import { resolveAlert } from '@/utils/reslove_alert'
import { tbDetailColumns, tbDetailDetailColumns } from '../constants'

const { formTableData } = useFormTableStore()
const selectFile = ref(null)

let lotNos = []
const handleTBDetailSelectionChange = (items) => {
  const tempLotNos = []
  items.forEach((item) => {
    tempLotNos.push(toRaw(item).lotNo)
  })
  lotNos = tempLotNos
}

let selectedFileNames = []
const handleTBAttachmentSelectionChange = (items) => {
  const tempFileNames = []
  items.forEach((item) => {
    tempFileNames.push(toRaw(item).fileName)
  })
  selectedFileNames = tempFileNames
}

const staffNo = window.sessionStorage.getItem('staffNo')
const lotRepeal = () => {
  mfb01LotRepeal({
    user: staffNo,
    applyNo: formTableData.form.applyNo,
    lotNos: lotNos,
  }).then((resolve, reject) => {
    resolveAlert(resolve)
  })
}

const lotReduction = () => {
  mfb01LotReduction({
    user: staffNo,
    applyNo: formTableData.form.applyNo,
    lotNos: lotNos,
    custNo: formTableData.form.custNo,
  }).then((resolve, reject) => {
    resolveAlert(resolve)
  })
}

const download = () => {
  if (selectedFileNames.length === 0) {
    swal('注意', '請選擇附件下載', 'warning')
    return
  }
  const downloadLinks = []
  selectedFileNames.forEach((fileName) => {
    downloadAttachment(formTableData.form.applyNo, fileName).then(
      (response) => {
        const blob = new Blob([response.data], {
          type: 'application/octet-stream',
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        link.click()
        downloadLinks.push(link)
      },
    )
  })
  // 下载完成后删除所有的a标签
  setTimeout(() => {
    downloadLinks.forEach((link) => {
      link.remove()
    })
  }, 5000)
}

const uploadAttachment = (event) => {
  const files = event.target.files
  if (!files) {
    swal('注意', '請選擇正确的文件', 'warning')
    return
  }
  addAttachment(
    formTableData.form.applyNo,
    formTableData.form.orderNo,
    staffNo,
    files,
  ).then((resolve) => {
    const attachmentsAdded = resolve.data.attachmentsAdded
    attachmentsAdded.forEach((attachmentAdded) => {
      formTableData.tbAttachment.push(attachmentAdded)
    })
  })
}

const delAttachment = () => {
  if (selectedFileNames.length === 0) {
    swal('注意', '請選擇附件刪除', 'warning')
    return
  }
  const fileNames = []
  const sourceFile = []
  Array.from(formTableData.tbAttachment).forEach((item) => {
    selectedFileNames.forEach((selectedFileName) => {
      if (item.fileName === selectedFileName) {
        fileNames.push(item.fileName)
        sourceFile.push(item.sourceFile)
      }
    })
  })
  deleteAttachment(
    formTableData.form.applyNo,
    staffNo,
    fileNames,
    sourceFile,
  ).then((resolve) => {
    const result = resolve.status
    if (result === 200) {
      formTableData.tbAttachment = formTableData.tbAttachment.filter(
        (item) => !selectedFileNames.includes(item.fileName),
      )
    }
  })
}

const btnAddAttachment = () => {
  selectFile.value.click()
}

const props = defineProps({
  verticalLayoutFlag: Boolean,
  queryMode: Boolean,
  insertMode: Boolean,
})
</script>
