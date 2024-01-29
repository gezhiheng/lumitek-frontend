<template>
  <el-card class="card --el-box-shadow-dark">
    <template #header>
      <el-button plain type="primary" @click="queryBtnOnClick" v-loading.fullscreen.lock="state.fullscreenLoading">
        <el-icon><Search /></el-icon>
        <span>查询</span>
      </el-button>
      <el-button plain type="primary" @click="printBtnOnClick">
          <el-icon><Printer /></el-icon>
        <span>列印</span>
      </el-button>
    </template>
    <el-form 
      :inline="true" 
      label-width="140px"
      class="form"
      label-position="left"
    >
      <el-form-item label="客戶簡碼">
        <el-select v-model="data.form.custNo" placeholder="請選擇">
          <el-option v-for="option in custNoOptions" :label="option" :value="option" />
        </el-select>
      </el-form-item>
      <el-form-item label="派工日期">
        <el-date-picker 
          v-model="data.form.applyDate" 
          type="date" 
          placeholder="Pick a date" 
          style="width: 100%" 
          value-format="YYYYMMDD"
        />
      </el-form-item>
      <el-form-item label="委工單號">
        <el-input v-model="data.form.lotNo" />
      </el-form-item>
      <el-form-item label="不含已列印過資料">
        <el-switch v-model="data.form.printMK" />
      </el-form-item>
    </el-form>
    <el-table 
      max-height="600px" 
      :data="data.table" 
      empty-text="沒有數據" 
      stripe
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column v-for="item in tableColumns" :prop="item.prop" :label="item.label" :width="item.width"/>
    </el-table>
  </el-card>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
import { Search, Printer } from '@element-plus/icons-vue'
import { query, getPdfUrls } from '@/service/mf/mfb/mfb04'
import { custNoOptions, tableColumns } from './contants'
import { usePDFUrlsStore } from '@/stores/pdf_urls_store'
import router from '@/router'
import swal from 'sweetalert'

const data = reactive({
  form: {
    custNo: '',
    applyDate: '',
    lotNo: '',
    printMK: false,
  },
  table: [],
})
const state = reactive({
  fullscreenLoading: false
})
const { setPDFUrls } = usePDFUrlsStore()

const queryBtnOnClick = async () => {
  try {
    state.fullscreenLoading = true
    await query(data.form).then(resolve => {
      data.table = []
      resolve.data.table.forEach(item => {
        data.table.push(item)
      })
    })
  } finally {
    state.fullscreenLoading = false
  }
}

let printParams = []
const selectionChange = (items) => {
  printParams = items.map(item => toRaw(item))
}

const printBtnOnClick = async () => {
  if (printParams.length > 0) {
    try {
      state.fullscreenLoading = true
      await getPdfUrls({
        printDataList: printParams,
      }).then(resolve => {
        setPDFUrls(resolve.data.urls)
        router.push({ name: 'pdf' })
      })
    } finally {
      state.fullscreenLoading = false
    }
  } else {
    swal('注意', '請選擇需要的打印', 'warning')
  }
}
</script>

<style scoped>
.card {
  width: 50%;
  margin: 0 auto;
}

.form {
  display: grid;
  grid-template-columns: 1fr;
}

.excel-viewer {
  margin: 0 auto;
  width: 500px;
  height: 500px;
  overflow: auto;
  background-color: red;
}
</style>