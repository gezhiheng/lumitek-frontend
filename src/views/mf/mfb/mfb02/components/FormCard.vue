<template>
  <el-card>
    <template #header>
      <el-button
        v-if="state.queryMode"
        plain
        type="primary"
        @click="backToInsertMode"
      >
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>返回新增</span>
      </el-button>
      <el-button
        v-else
        plain
        type="primary"
        @click="onAdd"
        v-loading.fullscreen.lock="state.fullscreenLoading"
      >
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>新增</span>
      </el-button>
      <el-button
        plain
        type="primary"
        @click="state.dialogFormVisible = !state.dialogFormVisible"
      >
        <el-icon>
          <Search />
        </el-icon>
        <span>查询</span>
      </el-button>
      <el-button
        v-if="state.queryMode"
        plain
        type="danger"
        @click="onRepeal"
        v-loading.fullscreen.lock="state.fullscreenLoading"
      >
        <el-icon>
          <Delete />
        </el-icon>
        <span>資料作廢</span>
      </el-button>
      <el-text
        size="large"
        style="float: right; font-size: 30px"
        type="primary"
        >{{ sharedData.form.status }}</el-text
      >
      <el-dialog
        v-model="state.dialogFormVisible"
        title="請輸入查詢條件"
        style="max-width: 30%"
      >
        <el-form :model="queryForm" label-width="120px" class="queryForm">
          <el-form-item label="單號">
            <el-input v-model="queryForm.applyNo" />
          </el-form-item>
          <el-form-item label="產品型號">
            <el-input v-model="queryForm.productNo" />
          </el-form-item>
          <el-form-item label="子批号">
            <el-input v-model="queryForm.productSeqNo" />
          </el-form-item>
          <el-form-item label="客戶批號">
            <el-input v-model="queryForm.ST_lotNo" />
          </el-form-item>
          <el-form-item label="晶片刻號">
            <el-input v-model="queryForm.ST_WIPID" />
          </el-form-item>
          <el-form-item label="派工日期">
            <el-col :span="9">
              <el-date-picker
                v-model="queryForm.startTime"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                value-format="YYYY-MM-DD"
              />
            </el-col>
            <el-col :span="1" style="text-align: center">
              <span class="text-gray-500">~</span>
            </el-col>
            <el-col :span="9">
              <el-date-picker
                v-model="queryForm.endTime"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                value-format="YYYY-MM-DD"
              />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="querySubmit"
              v-loading.fullscreen.lock="state.fullscreenLoading"
              >查詢</el-button
            >
            <el-button @click="state.dialogFormVisible = false">取消</el-button>
            <el-button @click="resetQueryForm">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
    <el-form label-width="120px" label-position="left">
      <el-form-item label="單號">
        <el-input
          v-model="sharedData.form.applyNo"
          :disabled="state.queryMode"
        />
      </el-form-item>
      <el-form-item label="產品型號">
        <el-input
          v-model="sharedData.form.productNo"
          :disabled="state.queryMode"
        />
      </el-form-item>
      <el-form-item label="數量">
        <el-input v-model="sharedData.form.qty" :disabled="state.queryMode" />
      </el-form-item>
      <el-form-item label="派工日期">
        <el-date-picker
          style="width: 70%"
          v-model="sharedData.form.applyDate"
          type="date"
          placeholder="Pick a day"
          :size="'default'"
          :disabled="state.queryMode"
        />
      </el-form-item>
      <el-form-item label="預計完工日期">
        <el-date-picker
          style="width: 70%"
          v-model="sharedData.form.EstimatedDate"
          type="date"
          placeholder="Pick a day"
          :size="'default'"
          :disabled="state.queryMode"
        />
      </el-form-item>
      <el-form-item label="實際完工日期">
        <el-date-picker
          style="width: 70%"
          v-model="sharedData.form.dueDate"
          type="date"
          placeholder="Pick a day"
          :size="'default'"
          :disabled="state.queryMode"
        />
      </el-form-item>
    </el-form>
    <el-divider />
    <el-table
      :data="sharedData.formDetail"
      stripe
      style="width: 100%"
      :height="state.showMoreData ? 200 : 100"
      empty-text="沒有數據"
    >
      <el-table-column
        v-for="colum in formTableColumns"
        :prop="colum.prop"
        :label="colum.label"
        :width="colum.width"
        align="center"
      />
    </el-table>
  </el-card>
</template>

<script setup>
import { reactive, watch, nextTick, toRaw } from 'vue'
import swal from 'sweetalert'
import { DocumentAdd, Delete, Search } from '@element-plus/icons-vue'
import { query, add, repeal } from '@/service/mf/mfb/mfb02'
import { formTableColumns } from '../constants'

const staffNo = window.sessionStorage.getItem('staffNo')
const emits = defineEmits(['resetSlider', 'updateSharedData'])
const props = defineProps({
  slider: Number,
  sharedData: Object,
})
const queryForm = reactive({
  dataIndex: 0,
  applyNo: '',
  startTime: '',
  endTime: '',
  productNo: '',
  productSeqNo: '',
  ST_lotNo: '',
  ST_WIPID: '',
})
const state = reactive({
  dialogFormVisible: false,
  fullscreenLoading: false,
  showMoreData: false,
  queryMode: false,
})

watch(
  () => props.slider,
  async (newVal) => {
    queryForm.dataIndex = newVal - 1
    await queryData()
  },
)

watch(
  () => props.sharedData.change,
  async (newVal) => {
    state.showMoreData = props.sharedData.showMoreData
    state.queryMode = props.sharedData.queryMode
  },
)

const reset = (array) => {
  Object.keys(array).forEach((key) => {
    array[key] = ''
  })
}

const resetQueryForm = () => {
  reset(queryForm)
}

const querySubmit = async () => {
  try {
    state.fullscreenLoading = true
    queryForm.dataIndex = 0
    await queryData()
    await nextTick()
    emits('resetSlider')
  } finally {
    state.fullscreenLoading = false
    state.dialogFormVisible = false
  }
}

const backToInsertMode = () => {
  const onResetData = {
    showMoreData: false,
    queryMode: false,
    dataSize: 0,
    form: {
      applyNo: '',
      applyDate: '',
      EstimatedDate: '',
      productNo: '',
      dueDate: '',
      qty: '',
      status: '',
    },
    formDetail: [],
  }
  emits('updateSharedData', onResetData)
}

const queryData = async () => {
  const onQueryData = {
    queryMode: true,
    showMoreData: true,
    dataSize: 0,
    form: {
      applyNo: '',
      applyDate: '',
      EstimatedDate: '',
      productNo: '',
      dueDate: '',
      qty: '',
      status: '',
    },
    formDetail: [],
  }
  await query(queryForm).then((resolve) => {
    onQueryData.dataSize = resolve.data.dataSize
    if (resolve.data.dataSize < 1) {
      swal('注意', '查詢沒有結果', 'warning')
      return
    }
    Object.keys(onQueryData.form).forEach((key) => {
      onQueryData.form[key] = resolve.data.form[key]
    })
    onQueryData.formDetail.length = 0
    resolve.data.formDetail.forEach((item) => {
      onQueryData.formDetail.push(item)
    })
    emits('updateSharedData', onQueryData)
  })
}

const onRepeal = async () => {
  const requestParams = {
    staffNo: staffNo,
    applyNo: props.sharedData.form.applyNo,
  }
  try {
    state.fullscreenLoading = true
    await repeal(requestParams).then((resolve) => {
      if (resolve.data.tip === 'success') {
        swal('成功', '作废成功', 'success')
        emits('updateSharedData', {
          changeTableData: true,
          form: {
            status: 'VOID',
          },
        })
      }
    })
  } finally {
    state.fullscreenLoading = false
  }
}

const onAdd = async () => {
  try {
    state.fullscreenLoading = true
    await add({
      staffNo: staffNo,
      form: toRaw(props.sharedData.form),
      formDetail: toRaw(props.sharedData.formDetail),
    }).then((resolve) => {
      if (resolve.data.tip === 'success') {
        swal('成功', '新增成功', 'success')
        emits('updateSharedData', {
          changeTableData: true,
        })
        backToInsertMode()
      }
    })
  } finally {
    state.fullscreenLoading = false
  }
}
</script>

<style scoped>
.el-input {
  width: 70%;
}

.queryForm {
  .el-input {
    width: 79%;
  }
}
</style>
