<template>
  <el-card class="main">
    <template #header>
      <div class="card-header">
        <span>
          <el-button
            v-if="queryMode"
            plain
            type="primary"
            @click="backToInsertMode"
          >
            <el-icon>
              <DocumentAdd />
            </el-icon>
            <span>返回新增</span>
          </el-button>
          <el-button v-else plain type="primary" @click="add">
            <el-icon>
              <DocumentAdd />
            </el-icon>
            <span>新增</span>
          </el-button>
          <el-button
            plain
            type="primary"
            @click="dialogFormVisible = !dialogFormVisible"
          >
            <el-icon>
              <Search />
            </el-icon>
            <span>查询</span>
          </el-button>
          <el-button
            v-if="!(queryMode || insertMode)"
            plain
            type="primary"
            @click="importData"
          >
            <el-icon>
              <FolderOpened />
            </el-icon>
            <span>資料匯入</span>
          </el-button>
          <input
            type="file"
            ref="selectFile"
            @change="uploadFile"
            style="display: none"
            webkitdirectory
          />
        </span>

        <el-dialog
          v-model="dialogFormVisible"
          title="請輸入查詢條件"
          class="dialog"
        >
          <el-form :model="queryForm" label-width="120px">
            <el-form-item label="客戶">
              <el-select v-model="queryForm.custNo" placeholder="請選擇">
                <div v-for="custNo in custNos">
                  <el-option
                    v-if="custNo !== '-'"
                    :label="custNo"
                    :value="custNo"
                  />
                  <el-tooltip
                    v-else
                    effect="light"
                    class="box-item"
                    content="取消選擇客戶"
                    placement="right-start"
                  >
                    <el-option :label="custNo" :value="custNo" />
                  </el-tooltip>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="單號">
              <el-input v-model="queryForm.applyNo" />
            </el-form-item>
            <el-form-item label="日期">
              <el-col :span="11">
                <el-date-picker
                  v-model="queryForm.startTime"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-col>
              <el-col :span="2" style="text-align: center">
                <span class="text-gray-500">~</span>
              </el-col>
              <el-col :span="11">
                <el-date-picker
                  v-model="queryForm.endTime"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="製程別">
              <el-input v-model="queryForm.processType" />
            </el-form-item>
            <el-form-item label="委工單號">
              <el-input v-model="queryForm.lotNo" />
            </el-form-item>
            <el-form-item label="晶片刻號">
              <el-input v-model="queryForm.WIPID" />
            </el-form-item>
            <el-form-item label="客戶訂單編號">
              <el-input v-model="queryForm.orderNo" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="querySubmit"
                v-loading.fullscreen.lock="fullscreenLoading"
                >查詢</el-button
              >
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button @click="clearQueryCondition">清空</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <span>
          <el-button v-if="queryMode" plain type="danger" @click="repeal">
            <el-icon>
              <Close />
            </el-icon>
            <span>資料作廢</span>
          </el-button>
        </span>
      </div>
    </template>
    <div :class="{ formContainer: verticalLayoutFlag }">
      <el-form label-width="120px" label-position="left">
        <el-text
          size="large"
          style="float: right; font-size: 30px"
          class="mx-1"
          type="primary"
          >{{ formTableData.form.status }}</el-text
        >
        <el-form-item label="客戶碼">
          <el-select v-model="formTableData.form.custNo" placeholder="請選擇">
            <el-option
              v-for="custNo in custNos.slice(1)"
              :label="custNo"
              :value="custNo"
              :disabled="queryMode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客戶訂單編號">
          <el-input
            v-model="formTableData.form.orderNo"
            :disabled="queryMode || insertMode"
          />
        </el-form-item>
        <el-form-item label="單號">
          <el-input
            v-model="formTableData.form.applyNo"
            placeholder="系統產生"
            disabled
          />
        </el-form-item>
        <el-form-item label="進貨日期">
          <el-input v-model="formTableData.form.issueDate" disabled />
        </el-form-item>
        <el-form-item label="製程別">
          <el-input v-model="formTableData.form.processType" disabled />
        </el-form-item>
        <el-form-item label="總晶圓數">
          <el-input v-model="formTableData.form.totWaferQty" disabled />
        </el-form-item>
        <el-form-item label="件別">
          <el-radio-group v-model="formTableData.form.degree" disabled>
            <el-radio label="Y">急件</el-radio>
            <el-radio label="N">一般</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="備註">
          <el-input
            v-model="formTableData.form.remark"
            type="textarea"
            :disabled="queryMode"
          />
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import swal from 'sweetalert'
import {
  DocumentAdd,
  Search,
  FolderOpened,
  Close,
} from '@element-plus/icons-vue'
import { useFormTableStore } from '@/stores/mfb01/form_table_store'
import { useQueryStore } from '@/stores/mfb01/query_conditions_store'
import { mfb01Add, mfb01Repeal } from '@/service/mf/mfb/mfb01'
import { resolveAlert } from '@/utils/reslove_alert'
import { custNos } from '../constants'

const props = defineProps({
  verticalLayoutFlag: Boolean,
})

const emits = defineEmits([
  'changeSlider',
  'setSliderVisible',
  'setQueryMode',
  'setSliderMarks',
  'setInsertMode',
])

const fullscreenLoading = ref(false)
const dialogFormVisible = ref(false)
const queryMode = ref(false)
const insertMode = ref(false)

const queryForm = reactive({
  dataIndex: 0,
  custNo: '',
  applyNo: '',
  startTime: '',
  endTime: '',
  processType: '',
  lotNo: '',
  WIPID: '',
  orderNo: '',
})

const {
  formTableData,
  setFormTable,
  resetFormTable,
  importFormTable,
  importFormTableAuto,
} = useFormTableStore()
const { setQueryConditions, resetQueryConditions } = useQueryStore()
const querySubmit = async () => {
  handleQueryForm()
  setQueryConditions(queryForm)
  try {
    fullscreenLoading.value = true
    await setFormTable(queryForm)
    if (formTableData.dataSize > 0) {
      queryMode.value = true
      emits('changeSlider')
      emits('setSliderVisible', true)
      emits('setQueryMode', true)
      emits('setSliderMarks', formTableData.dataSize)
    }
    addFlag.value = false
  } catch (err) {
    console.log('🚀 ~ file: FormCard.vue:174 ~ querySubmit ~ err:', err)
    swal('錯誤', '查詢出現錯誤', 'error')
  } finally {
    dialogFormVisible.value = false
    fullscreenLoading.value = false
  }
}

const handleQueryForm = () => {
  queryForm.dataIndex = 0
  queryForm.custNo = queryForm.custNo === '-' ? '' : queryForm.custNo
  queryForm.startTime = queryForm.startTime ?? ''
  queryForm.endTime = queryForm.endTime ?? ''
}

const backToInsertMode = () => {
  emits('setSliderVisible', false)
  emits('setQueryMode', false)
  resetFormTable()
  queryMode.value = false
}

const clearQueryCondition = () => {
  resetQueryConditions()
  queryForm.dataIndex = 0
  queryForm.custNo = ''
  queryForm.applyNo = ''
  queryForm.startTime = ''
  queryForm.endTime = ''
  queryForm.processType = ''
  queryForm.lotNo = ''
  queryForm.WIPID = ''
  queryForm.orderNo = ''
}

const selectFile = ref(null)
const uploadFile = (event) => {
  const files = event.target.files
  if (!files) {
    swal('注意', '請選擇正确的文件夹', 'warning')
    return
  }
  importFormTable(formTableData.form.custNo, files)
}

const importData = () => {
  if (!formTableData.form.custNo) {
    swal('注意', '請選擇客戶編號', 'warning')
    return
  }
  addFlag.value = true
  if (formTableData.form.orderNo) {
    importFormTableAuto({
      custNo: formTableData.form.custNo,
      orderNo: formTableData.form.orderNo,
    })
  } else {
    selectFile.value.click()
  }
  insertMode.value = true
  emits('setInsertMode', true)
}

const addFlag = ref(false)
const staffNo = window.sessionStorage.getItem('staffNo')
const add = () => {
  if (!addFlag.value) {
    swal('注意', '請匯入資料后再新增', 'warning')
    return
  }
  mfb01Add({
    user: staffNo,
    form: formTableData.form,
    tbDetail: formTableData.tbDetail,
    tbDetailDetail: formTableData.tbDetailDetail,
    tbAttachment: formTableData.tbAttachment,
  })
    .then((resolve, reject) => {
      resolveAlert(resolve)
    })
    .catch((err) => {
      console.log('🚀 ~ file: FormCard.vue:256 ~ add ~ err:', err)
    })
  resetFormTable()
  insertMode.value = false
}

const repeal = () => {
  mfb01Repeal({
    user: staffNo,
    applyNo: formTableData.form.applyNo,
  }).then((resolve, reject) => {
    resolveAlert(resolve)
  })
}
</script>

<style scoped>
.formContainer {
  max-width: 70%;
}

.card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dialog {
  max-width: 10%;
}
</style>
