<template>
  <el-card>
    <template #header>
      <el-button plain type="primary">
        <el-icon>
          <DocumentAdd />
         </el-icon>
        <span>新增</span>
      </el-button>
      <el-button plain type="primary">
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
        <Form></Form>
        <el-slider
          show-input
          style="padding-left: 12px;"
          :min="1"
          :max="100"
        />
      </el-dialog>
    </template>
    <div class="container">
      <div class="form">
        <Form></Form>
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
</template>

<script setup>
import { reactive } from 'vue'
import { DocumentAdd, Search, CaretRight } from '@element-plus/icons-vue'
import Form from './components/Form.vue'

const state = reactive({
  dialogVisable: false
})
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