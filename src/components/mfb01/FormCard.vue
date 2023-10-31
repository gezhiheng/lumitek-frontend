<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>
          <el-button v-if="queryMode" plain type="primary" @click="backToInsertMode">
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
          <el-button plain type="primary" @click="dialogFormVisible = !dialogFormVisible">
            <el-icon>
              <Search />
            </el-icon>
            <span>查询</span>
          </el-button>
          <el-button v-if="!queryMode" plain type="primary" @click="importData">
            <el-icon>
              <FolderOpened />
            </el-icon>
            <span>资料汇入</span>
          </el-button>
          <input type="file" ref="selectFile" @change="uploadFile" style="display: none;">
        </span>

        <el-dialog v-model="dialogFormVisible" title="請輸入查詢條件" class="dialog">
          <el-form :model="queryForm" label-width="120px">
            <el-form-item label="客戶">
              <el-select v-model="queryForm.custNo">
                <div v-for="custNo in custNos">
                  <el-option v-if="custNo !== '-'" :label="custNo" :value="custNo"/>
                  <el-tooltip
                    v-else
                    effect="light"
                    class="box-item"
                    content="取消選擇客戶"
                    placement="right-start"
                  >
                    <el-option :label="custNo" :value="custNo"/>
                  </el-tooltip>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="單號">
              <el-input v-model="queryForm.applyNo" />
            </el-form-item>
            <el-form-item label="日期">
              <el-col :span="11">
                <el-date-picker v-model="queryForm.startTime" type="date" placeholder="Pick a date" style="width: 100%" value-format="YYYY-MM-DD"/>
              </el-col>
              <el-col :span="2" style="text-align: center;">
                <span class="text-gray-500">~</span>
              </el-col>
              <el-col :span="11">
                <el-date-picker v-model="queryForm.endTime" type="date" placeholder="Pick a date" style="width: 100%" value-format="YYYY-MM-DD"/>
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
              <el-button type="primary" @click="querySubmit" v-loading.fullscreen.lock="fullscreenLoading">查詢</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button @click="clearQueryCondition">清空</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <span>
          <el-button plain type="danger">
            <el-icon>
              <Close />
            </el-icon>
            <span>资料作废</span>
          </el-button>
        </span>
      </div>
    </template>
    <el-form label-width="120px">
      <el-form-item label="客戶簡碼">
        <el-select v-model="formTableData.form.custNo">
          <el-option v-for="custNo in custNos.slice(1)"  :label="custNo" :value="custNo" :disabled="queryMode" />
        </el-select>
      </el-form-item>
      <el-form-item label="客戶訂單編號">
        <el-input v-model="formTableData.form.orderNo" :class="{ input: verticalLayoutFlag }" :disabled="queryMode" />
      </el-form-item>
      <el-form-item label="單號">
        <el-input v-model="formTableData.form.applyNo" :class="{ input: verticalLayoutFlag }" placeholder="系統產生" disabled />
      </el-form-item>
      <el-form-item label="進貨日期">
        <el-input v-model="formTableData.form.issueDate" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="製程別">
        <el-input v-model="formTableData.form.processType" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="總晶圓數">
        <el-input v-model="formTableData.form.totWaferQty" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="件別">
        <el-radio-group v-model="formTableData.form.degree" disabled>
          <el-radio label="Y">急件</el-radio>
          <el-radio label="N">一般</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="備註">
        <el-input v-model="formTableData.form.remark" :class="{ input: verticalLayoutFlag }" type="textarea" :disabled="queryMode" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { DocumentAdd, Search, FolderOpened, Close } from '@element-plus/icons-vue'
import { useFormTableStore } from '../../stores/mfb01/form_table_store'
import { useQueryStore } from '../../stores/mfb01/query_conditions_store'
import swal from 'sweetalert'

const props = defineProps({
  verticalLayoutFlag: Boolean
})

const emits = defineEmits(['changeSlider', 'setSliderVisible'])

const fullscreenLoading = ref(false)
const dialogFormVisible = ref(false)
const queryMode = ref(false)

const queryForm = reactive({
  dataIndex: 0,
  custNo: '',
  applyNo: '',
  startTime: '',
  endTime: '',
  processType: '',
  lotNo: '',
  WIPID: '',
  orderNo: ''
})

const { formTableData, setFormTable, resetFormTable, importFormTable, importFormTableAuto } = useFormTableStore()
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
    }
  } catch (err) {
    console.error(err)
    swal("錯誤", "查詢出現錯誤", "error")
  }
  dialogFormVisible.value = false
  fullscreenLoading.value = false
}

const handleQueryForm = () => {
  queryForm.dataIndex = 0
  queryForm.custNo = queryForm.custNo ?? ''
  queryForm.startTime = queryForm.startTime ?? ''
  queryForm.endTime = queryForm.endTime ?? ''
}

const backToInsertMode = () => {
  emits('setSliderVisible', false)
  resetFormTable()
  queryMode.value = false
}

const clearQueryCondition = () => {
  resetQueryConditions()
  queryForm.dataIndex = 0
  queryForm.custNo = ''
  queryForm.applyNo = ''
  queryForm.startTime = ''
  queryForm.endTime  = ''
  queryForm.processType =  ''
  queryForm.lotNo = ''
  queryForm.WIPID = ''
  queryForm.orderNo = ''
}

const selectFile = ref(null)
const uploadFile = (event) => {
  const file = event.target.files[0]
  if (!file) {
    swal("注意", "請選擇一個文件", "warning")
    return
  }
  importFormTable(formTableData.form.custNo, file)
  console.log("🚀 ~ file: FormCard.vue:213 ~ uploadFile ~ formTableData.form.custNo:", formTableData.form.custNo)
}

const importData = () => {
  if (!formTableData.form.custNo) {
    swal("注意", "請選擇客戶編號", "warning")
    return
  }
  if (formTableData.form.orderNo) {
    importFormTableAuto({
      "custNo": formTableData.form.custNo,
      "orderNo": formTableData.form.orderNo
    })
  } else {
    selectFile.value.click()  
  }
}

const custNos = ['-','08','11','12','13','13A','17','18','19','20','21','22',]
</script>

<style src="../../style/mfb01/form_card.css" scoped></style>