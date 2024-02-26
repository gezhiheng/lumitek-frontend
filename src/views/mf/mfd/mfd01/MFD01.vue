<template>
  <el-card>
    <template #header>
      <el-button plain type="primary">
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
      <el-badge :value="12" style="margin-left: 12px;">
        <el-button plain type="primary" @click="state.dialogVisable = true">
          <span>扣留放行&nbsp;</span>
          <el-icon>
            <CaretRight />
          </el-icon>
        </el-button>
      </el-badge>
      <el-dialog v-model="state.dialogVisable" title="扣留放行" width="38%">
        <Form :isUnholdPage="true" :form="data.unHoldForm"></Form>
        <el-slider
          show-input
          style="padding-left: 12px;"
          :min="1"
          :max="100"
        />
      </el-dialog>
      <QueryForm v-model="state.QueryFormVisable" @getData="onGetData"/>
    </template>
    <div class="container">
      <div class="form">
        <Form :form="data.form"></Form>
      </div>
      <div class="hold-history">
        <el-table
          height="520px"
          empty-text="沒有數據"
        >
          <el-table-column prop="message" label="扣留歷程"/>
        </el-table>
      </div>
    </div>
  </el-card>
  <el-slider
    show-input
    style="padding: 12px; width: 99%;"
    :min="1"
    :max="100"
  />
</template>

<script setup>
import { reactive } from 'vue'
import { DocumentAdd, Search, CaretRight } from '@element-plus/icons-vue'
import Form from './components/Form.vue'
import QueryForm from './components/QueryForm.vue'
import { formAttributes, queryFormAttributes } from './constants'
import { query } from '@/service/mf/mfd/mfd01'

const state = reactive({
  dialogVisable: false,
  QueryFormVisable: false,
  queryMode: false,
})

const data = reactive({
  form: Object.assign({}, formAttributes),
  unHoldForm: Object.assign({}, formAttributes),
  queryForm: Object.assign({}, queryFormAttributes),
  dataSize: 0,
})

const onGetData = ({
  conditions,
  res,
  dataSize
}) => {
  data.form = Object.assign({}, res.form)
  data.queryForm = Object.assign({}, conditions)
  data.dataSize = dataSize
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