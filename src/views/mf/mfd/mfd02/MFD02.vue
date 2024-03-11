<template>
  <div class="container">
    <div class="brush-area">
      <el-form
        label-position="left"
      >
        <el-form-item label="子批號">
          <el-input v-model="data.waferNo" @keydown.enter="focusLotNoInput" placeholder="請刷入子批號"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="data.status">
            <el-radio label="normal">一般處理作業</el-radio>
            <el-radio label="cancel">一般取消終止</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-table
        height="520px"
        empty-text="沒有數據"
        :data="data.brushInTable"
      >
        <el-table-column width="150" prop="productSeqNo" label="子批號"/>
        <el-table-column width="150" prop="waferNo" label="製程"/>
        <el-table-column width="150" prop="waferN1o" label="工序"/>
      </el-table>
    </div>
    <div class="message-area">
      <div class="title">
        <span>檢查/執行錯誤訊息</span>
        <el-button
          type="danger"
          @click="clearMessageBtnOnclick"
        >清空訊息</el-button>
      </div>
      <el-table
        height="520px"
        empty-text="沒有數據"
        :data="data.messageTable"
      >
        <el-table-column prop="message" label="訊息"/>
      </el-table>
    </div>
  </div>
  <div class="btn-descriptions-area">
    <div class="btn-area">
      <el-button
        type="danger"
        @click="clearBtnOnClick"
      >清空</el-button>
      <el-button
        @click="clearBtnOnClick"
      >終止製程</el-button>
      <el-button
        @click="clearBtnOnClick"
      >跳過製程</el-button>
      <el-button
        @click="clearBtnOnClick"
      >製程回推</el-button>
      <el-button
        @click="clearBtnOnClick"
      >取消終止</el-button> 
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { brushInData, passStation } from '@/service/qc/qca/qca02'

const data = reactive({
  status: 'normal',
  lotNo: '',
  waferNo: '',
  total: '0',
  brushed: '0',
  brushInTable: [],
  messageTable: [
    { message: '測試資料' }
  ],
})
const lotNoInputRef = ref(null)
const fullscreenLoading = ref(false)

const focusLotNoInput = () => {
  nextTick(() => { lotNoInputRef.value.focus() })
}

const lotNoInputOnEnter = async () => {
  await brushInData({
    lotNo: data.lotNo,
    waferNo: data.waferNo,
    tableData: data.brushInTable
  }).then(resolve => {
    console.log('🚀 ~ lotNoInputOnEnter ~ resolve:', resolve)
    data.brushInTable = resolve.data.tableData
    data.total = resolve.data.total
    data.brushed = resolve.data.brushed
  })
}

const brushInBtnOnClick = async () => {
  const staffNo = window.sessionStorage.getItem('staffNo')
  try {
    fullscreenLoading.value = true
    await passStation(
      {
        staffNo: staffNo,
        lotNo: data.lotNo,
        tableData: data.brushInTable,
        total: data.total,
        brushed: data.brushed,
      }
    ).then(resolve => {
      data.messageTable = []
      resolve?.data?.errMsg?.forEach(msg => {
        data.messageTable.push({ message: msg })
      })
    })
  } finally {
    fullscreenLoading.value = false
  }
}

const clearBtnOnClick = () => {
  data.lotNo = ''
  data.waferNo = ''
  data.total = '0'
  data.brushed = '0'
  data.brushInTable = []
}

const clearMessageBtnOnclick = () => {
  data.messageTable = []
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 12px;
  width: 100%;
}

.brush-area {
  width: 30%;
  margin-right: 12px;
}

.message-area {
  width: 70%;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 12px;
  margin-bottom: 18px;
  height: 82px;
  background-color: var(--el-bg-color-overlay);

  span {
    font-size: 50px;
  }
}

.btn-descriptions-area {
  display: flex;
  align-items: center;
}

.btn-area {
  margin-right: 12px;
}

.descriptions-area {
  display: flex;
  align-items: center;
}

.description {
  color: var(--el-text-color-regular);
  margin-right: 16px;
}
</style>