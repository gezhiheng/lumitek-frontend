<template>
  <el-card class="container --el-box-shadow-dark">
    <template #header>
      <el-button v-if="flag.queryMode" plain type="primary" @click="backToInsertMode">
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>返回新增</span>
      </el-button>
      <el-button v-else plain type="primary" >
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>新增</span>
      </el-button>
      <el-button plain type="primary" @click="flag.formDialogVisible = !flag.formDialogVisible">
        <el-icon>
          <Search />
        </el-icon>
        <span>查询</span>
      </el-button>
      <el-button v-if="flag.queryMode" plain type="primary">
        <el-icon>
          <Edit />
        </el-icon>
        <span>修改</span>
      </el-button>
      <el-dialog v-model="flag.formDialogVisible" title="請輸入查詢條件" style="width: 500px;">
        <el-form :model="queryForm" label-width="120px" style="width: 85%;">
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
            <el-button type="primary" @click="querySubmit" v-loading.fullscreen.lock="flag.fullscreenLoading">查詢</el-button>
            <el-button @click="flag.formDialogVisible = false">取消</el-button>
            <el-button @click="resetQueryForm">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
    <Form :queryMode="flag.queryMode"></Form>
    <el-divider />
    <Tab :wips="wips"></Tab>
  </el-card>
  <div style="display: flex; align-items: center; margin: 20px 0 50px 0;">
    <suspense>
      <el-slider
        v-if="flag.queryMode"
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
import { ref, reactive, onMounted } from 'vue'
import { DocumentAdd, Search, Edit } from '@element-plus/icons-vue'
import swal from 'sweetalert'
import Form from '@/components/mfa01/Form.vue'
import Tab from '@/components/mfa01/Tab.vue'
import { useFormTabStore } from '@/stores/mfa01/form_tab_store'
import { getWipStdOptions, getStationOptions } from '@/service/mfa01'

const { formTabData, setFormTab, resetFormTab } = useFormTabStore()
const flag = reactive({
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
  productNo: '',
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
const wips = ref([])

onMounted(async () => {
  await getWipStdOptions().then(resolve => {
    wips.value = resolve.data.WipStdName
  })
})

const resetQueryForm = () => {
  Object.keys(queryForm).forEach(key => {
    queryForm[key] = ''
  })
  queryForm.dataIndex = 0
  queryForm.isEnable = '1'
}

const backToInsertMode = () => {
  flag.queryMode = false
  resetFormTab()
}

const querySubmit = async () => {
  flag.fullscreenLoading = true
  queryForm.dataIndex = 0
  const size = await setFormTab(queryForm)
  if (size > 0) {
    slider.value = 0
    slider.size = formTabData.dataSize
    Object.keys(slider.marks).forEach(key => {
      delete slider.marks[key]
    })
    slider.marks[formTabData.dataSize] = formTabData.dataSize + ''
    flag.queryMode = true
    Object.keys(queryConditions).forEach(key => {
      queryConditions[key] = queryForm[key]
    })
  } else {
    swal("注意", "查詢沒有結果", "warning")
  }
  flag.fullscreenLoading = false
  flag.formDialogVisible = false
}

const sliderChange = async function(index) {
  queryConditions.dataIndex = index - 1
  await setFormTab(queryConditions)
}
</script>

<style src="@/style/mfa01.css" scoped></style>