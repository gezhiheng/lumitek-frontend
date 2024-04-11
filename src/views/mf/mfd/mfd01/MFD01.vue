<template>
  <el-card>
    <template #header>
      <el-button
        v-if="state.queryMode"
        plain
        type="primary"
        @click="state.queryMode = false"
      >
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>返回新增</span>
      </el-button>
      <el-button v-else="!state.queryMode" plain type="primary">
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>新增</span>
      </el-button>
      <el-button plain type="primary" @click="state.QueryFormVisable = true">
        <el-icon>
          <Search />
        </el-icon>
        <span>查询</span>
      </el-button>
      <el-badge :value="data.pendingNum" style="margin-left: 12px">
        <el-button plain type="primary" @click="state.dialogVisable = true">
          <span>扣留放行&nbsp;</span>
          <el-icon>
            <CaretRight />
          </el-icon>
        </el-button>
      </el-badge>
      <el-dialog v-model="state.dialogVisable" title="扣留放行" width="38%">
        <Form :isUnholdPage="true" v-model="data.unHoldForm"></Form>
        <el-slider show-input style="padding-left: 12px" :min="1" :max="100" />
      </el-dialog>
      <QueryForm
        v-model="state.QueryFormVisable"
        @getQueryData="onGetQueryData"
      />
    </template>
    <div class="container">
      <div class="form">
        <Form v-model="data.form"></Form>
      </div>
      <div class="hold-history">
        <el-table height="520px" empty-text="沒有數據">
          <el-table-column prop="message" label="扣留歷程" />
        </el-table>
      </div>
    </div>
  </el-card>
  <suspense>
    <el-slider
      v-if="state.queryMode"
      show-input
      style="padding: 12px; width: 99%"
      v-model="data.sliderValue"
      :min="1"
      :max="data.dataSize"
      @change="onSliderChange"
    />
  </suspense>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { DocumentAdd, Search, CaretRight } from '@element-plus/icons-vue'
import Form from './components/Form.vue'
import QueryForm from './components/QueryForm.vue'
import { formAttributes, queryFormAttributes } from './constants'
import { query, queryDepartment, getPendingNum } from '@/service/mf/mfd/mfd01'

const staffNo = window.sessionStorage.getItem('staffNo')
const state = reactive({
  dialogVisable: false,
  QueryFormVisable: false,
  queryMode: false,
})

const data = reactive({
  form: Object.assign({}, formAttributes),
  unHoldForm: Object.assign({}, formAttributes),
  queryForm: Object.assign({}, queryFormAttributes),
  sliderValue: 0,
  dataSize: 0,
  pendingNum: 0,
})

onMounted(async () => {
  await queryDepartment({
    staffNo: staffNo,
  }).then((res) => {
    data.form.holdBy = res?.data?.holdBy
    data.form.holdDepNo = res?.data?.holdDepNo
  })
  await getPendingNum({
    staffNo: staffNo,
  }).then((res) => {
    data.pendingNum = res?.data?.dataSize
  })
})

const onGetQueryData = ({ conditions, res, dataSize }) => {
  data.form = Object.assign({}, res.form)
  data.queryForm = Object.assign({}, conditions)
  data.dataSize = dataSize
  state.queryMode = true
}

const onSliderChange = async (index) => {
  data.queryForm.dataIndex = index - 1
  await query(data.queryForm).then((res) => {
    data.form = Object.assign({}, res.data.form)
  })
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.hold-history {
  width: 50%;
}

.form {
  width: 60%;
}
</style>
