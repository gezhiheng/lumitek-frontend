<template>
  <el-card class="container --el-box-shadow-dark">
    <template #header>
      <el-button v-if="state.queryMode" plain type="primary" @click="backToInsertMode">
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>返回新增</span>
      </el-button>
      <el-button v-else plain type="primary" @click="addData">
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>新增</span>
      </el-button>
      <el-button plain type="primary" @click="state.formDialogVisible = !state.formDialogVisible">
        <el-icon>
          <Search />
        </el-icon>
        <span>查询</span>
      </el-button>
      <el-button v-if="state.queryMode" plain type="primary" @click="updateData">
        <el-icon>
          <Edit />
        </el-icon>
        <span>修改</span>
      </el-button>
      <el-dialog v-model="state.formDialogVisible" title="請輸入查詢條件" style="width: 500px;">
        <el-form :model="queryForm" label-width="150px" style="width: 85%;">
          <el-form-item label="是否有效">
            <el-switch v-model="queryForm.isEnable" active-value="1" inactive-value="0"/>
          </el-form-item>
          <el-form-item label="產品型號">
            <el-input v-model="queryForm.productNo" />
          </el-form-item>
          <el-form-item label="客戶簡碼">
            <el-input v-model="queryForm.custNo" />
          </el-form-item>
          <el-form-item label="狀態">
            <el-input v-model="queryForm.status" />
          </el-form-item>
          <el-form-item label="產品進貨類型">
            <el-input v-model="queryForm.productInType" />
          </el-form-item>
          <el-form-item label="客戶產品類型">
            <el-input v-model="queryForm.custProductNo" />
          </el-form-item>
          <el-form-item label="產品形態">
            <el-input v-model="queryForm.productType" />
          </el-form-item>
          <el-form-item label="客戶内部料號">
            <el-input v-model="queryForm.custProductPartName" />
          </el-form-item>
          <el-form-item label="製程別">
            <el-input v-model="queryForm.processType" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="querySubmit" v-loading.fullscreen.lock="state.fullscreenLoading">查詢</el-button>
            <el-button @click="state.formDialogVisible = false">取消</el-button>
            <el-button @click="resetQueryForm">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
    <Form :queryMode="state.queryMode"></Form>
    <Tab :wips="wips"></Tab>
  </el-card>
  <div style="display: flex; align-items: center; margin: 20px 0 50px 0;">
    <suspense>
      <el-slider
        v-if="state.queryMode"
        v-model="slider.value" 
        show-input
        style="padding-left: 12px;"
        :min="1"
        :max="slider.size"
        :disabled="slider.size <= 1"
        :marks="slider.marks"
        @change="sliderChange"
      />
    </suspense>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { DocumentAdd, Search, Edit } from '@element-plus/icons-vue'
import swal from 'sweetalert'
import Form from './components/Form.vue'
import Tab from './components/Tab.vue'
import { useFormTabStore } from '@/stores/mfa01/form_tab_store'
import { add, update } from '@/service/mf/mfa/mfa01'

const { formTabData, setFormTab, resetFormTab } = useFormTabStore()
const state = reactive({
  formDialogVisible: false,
  fullscreenLoading: false,
  queryMode: false,
  stationDialogVisible: false
})
const slider = reactive({
  value: 0,
  size: 1,
  marks: {}
})
const queryForm = reactive({
  dataIndex: 0,
  isEnable: '1',
  productNo: '118949E',
  custNo: '',
  status: '',
  productInType: '',
  custProductNo: '',
  custProductPartName: '',
  productType: '',
  processType: ''
})
const queryConditions = {
  dataIndex: 0,
  isEnable: '1',
  productNo: '',
  custNo: '',
  status: '',
  productInType: '',
  custProductNo: '',
  custProductPartName: '',
  productType: '',
  processType: ''
}
const staffNo = window.sessionStorage.getItem('staffNo')

const resetQueryForm = () => {
  Object.keys(queryForm).forEach(key => {
    queryForm[key] = ''
  })
  queryForm.dataIndex = 0
  queryForm.isEnable = '1'
}

const backToInsertMode = () => {
  state.queryMode = false
  resetFormTab()
}

const querySubmit = async () => {
  state.fullscreenLoading = true
  queryForm.dataIndex = 0
  const size = await setFormTab(queryForm)
  if (size > 0) {
    slider.value = 0
    slider.size = formTabData.dataSize
    Object.keys(slider.marks).forEach(key => {
      delete slider.marks[key]
    })
    slider.marks[formTabData.dataSize] = formTabData.dataSize + ''
    state.queryMode = true
    Object.keys(queryConditions).forEach(key => {
      queryConditions[key] = queryForm[key]
    })
  } else {
    swal("注意", "查詢沒有結果", "warning")
  }
  state.fullscreenLoading = false
  state.formDialogVisible = false
}

const sliderChange = async function(index) {
  queryConditions.dataIndex = index - 1
  await setFormTab(queryConditions)
}

const addData = async () => {
  const addFlag = checkField()
  if (!addFlag) {
    return
  }
  state.fullscreenLoading = true
  try {
    await add({
      staffNo: staffNo,
      form: formTabData.form,
      productStations: formTabData.productStations,
      wipStations: formTabData.wipStations
    }).then(resolve => {
      if (resolve.data.tip === 'success') {
        swal("成功", resolve.data.message, "success")
      }
    })
  } finally {
    state.fullscreenLoading = false
  }
}

const updateData = async () => {
  const updateFlag = checkField()
  if (!updateFlag) {
    return
  }
  state.fullscreenLoading = true
  try {
    await update({
      staffNo: staffNo,
      form: formTabData.form,
      wipStations: formTabData.wipStations ? formTabData.wipStations : [],
      productStations: formTabData.productStations ? formTabData.productStations : [],
    }).then(resolve => {
      if (resolve.data.tip === 'success') {
        swal("成功", resolve.data.message, "success")
      }
    })
  } finally {
    state.fullscreenLoading = false
  }
}

const checkField = () => {
  const initial = [
    ['productNo', '產品型號'],
    ['custNo', '客戶簡碼']
  ]
  const requiredField = new Map(initial)
  let flag = true
  requiredField.forEach((value, key) => {
    if (formTabData.form[key] === '') {
      swal("注意", `${value}不能為空值`, "warning")
      flag = false
      return
    }
  })
  if (formTabData.wipStations.length === 0) {
    flag = false
    swal("注意", '請設置晶圓制程', "warning")
  }
  return flag
}
</script>

<style scoped>
.form {
  margin-bottom: 10px;
}

.tabs {
  max-width: 60%;
}
</style>