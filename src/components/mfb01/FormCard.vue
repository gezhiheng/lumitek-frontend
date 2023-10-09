<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>
          <el-button plain type="primary">
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
          <el-button plain type="primary">
            <el-icon>
              <FolderOpened />
            </el-icon>
            <span>资料汇入</span>
          </el-button>
        </span>

        <el-dialog v-model="dialogFormVisible" title="請輸入查詢條件" class="dialog">
          <el-form :model="queryForm" label-width="120px">
            <el-form-item label="客戶">
              <el-select v-model="queryForm.custNo">
                <el-option v-for="custNo in custNos" :label="custNo.label" :value="custNo.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="單號">
              <el-input v-model="form.name" />
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
              <el-button type="primary" @click="onSubmit">查詢</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
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
    <el-form :model="form" label-width="120px">
      <el-form-item label="客戶簡碼">
        <el-select v-model="form.custNo">
          <el-option v-for="custNo in custNos" :label="custNo.label" :value="custNo.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="客戶訂單編號">
        <el-input v-model="form.orderNo" :class="{ input: verticalLayoutFlag }" />
      </el-form-item>
      <el-form-item label="單號">
        <el-input v-model="form.applyNo" :class="{ input: verticalLayoutFlag }" placeholder="系統產生" disabled />
      </el-form-item>
      <el-form-item label="進貨日期">
        <el-input v-model="form.issueDate" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="製程別">
        <el-input v-model="form.processType" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="總晶圓數">
        <el-input v-model="form.totWaferQty" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="件別">
        <el-radio-group v-model="form.degree" disabled>
          <el-radio label="Y">急件</el-radio>
          <el-radio label="N">一般</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="備註">
        <el-input v-model="form.remark" :class="{ input: verticalLayoutFlag }" type="textarea" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { DocumentAdd, Search, FolderOpened, Close } from '@element-plus/icons-vue'
import { useMFB01FormStore } from '../../stores/mfb01Store'

const props = defineProps({
  verticalLayoutFlag: Boolean
})

const formStore = useMFB01FormStore()
console.log(formStore.processType)

const dialogFormVisible = ref(false)

const queryForm = reactive({
  custNo: '',
  applyNo: '',
  startTime: '',
  endTime: '',
  processType: '',
  lotNo: '',
  WIPID: '',
  orderNo: '',
})

const form = reactive({
  custNo: formStore.custNo,
  orderNo: formStore.orderNo,
  applyNo: formStore.applyNo,
  issueDate: formStore.issueDate,
  processType: formStore.processType,
  totWaferQty: formStore.totWaferQty,
  degree: formStore.degree,
  remark: formStore.remark
})

const custNos = [
  {
    value: '08',
    label: '08',
  },
  {
    value: '11',
    label: '11',
  },
  {
    value: '12',
    label: '12',
  },
  {
    value: '13',
    label: '13',
  },
  {
    value: '13A',
    label: '13A',
  },
  {
    value: '17',
    label: '17',
  },
  {
    value: '18',
    label: '18',
  },
  {
    value: '19',
    label: '19',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '21',
    label: '21',
  },
  {
    value: '22',
    label: '22',
  },
]
</script>

<style scoped>
.input {
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