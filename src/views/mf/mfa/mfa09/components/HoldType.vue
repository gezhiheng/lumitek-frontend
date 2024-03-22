<template>
  <el-descriptions>
    <el-descriptions-item label="部門">{{ data.depName }}</el-descriptions-item>
  </el-descriptions>

    <el-table 
      style="margin-bottom: 15px; padding: 0;"
      empty-text="沒有數據"
      highlight-current-row
      :data="data.table"
      @cell-click="tableOnclick"
    >
      <el-table-column 
        v-for="item in holdTypeTableColumns"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        index="seqNo"
        :align="'center'"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" :align="'center'">
        <template #default>
          <el-button link type="primary" size="small" @click="state.dialogVisible = true">
            修改
          </el-button>
          <el-button link type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-dialog
    v-model="state.dialogVisible"
    title="修改"
    width="500"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="扣留代碼">
        <el-input v-model="data.toUpdateTableItem.holdCode.modified"/>
      </el-form-item>
      <el-form-item label="扣留信息">
        <el-input v-model="data.toUpdateTableItem.holdCommand"/>
      </el-form-item>
      <el-form-item label="有&emsp;&emsp;效">
        <el-switch 
          v-model="data.toUpdateTableItem.isEnable"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="晶&emsp;&emsp;園">
        <el-switch 
          v-model="data.toUpdateTableItem.isWafer"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="state.formDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="resetQueryForm">確認修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <div class="btn-group">
    <el-button
      type="primary"
      @click="clearBtnOnClick"
    >
      新增一行
    </el-button>
    <el-button
      type="primary"
      @click="brushInBtnOnClick"
    >
      保存變更
    </el-button>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { holdTypeTableColumns } from './constants'
import MFA09Request from '@/service/mf/mfa/mfa09'

const request = new MFA09Request()
const staffNo = window.sessionStorage.getItem('staffNo')

const data = reactive({
  depName: '',
  table: [],
  toUpdateTableItem: {
    staffNo: staffNo,
    seqNo: '',
    isEnable: "0",
    isWafer: "0",
    holdCode: {
      orginal: '',
      modified: ''
    },
    holdCommand: ''
  }
})

const state = reactive({
  dialogVisible: false
})

onMounted(async () => {
  await request.init(staffNo)
  .then(res => {
    data.depName = res.depName
    data.table = res.table.map(item => {
      item.createdOn = item.createdOn.slice(0, 10)
      item.modifiedOn = item.modifiedOn.slice(0, 10)
      return item
    })
  })
})

const tableOnclick = (row, column, cell, event) => {
  data.toUpdateTableItem.seqNo = row.seqNo
  data.toUpdateTableItem.isEnable = row.isEnable + ''
  data.toUpdateTableItem.isWafer = row.isWafer + ''
  data.toUpdateTableItem.holdCode.orginal = row.holdCode
  data.toUpdateTableItem.holdCode.modified = row.holdCode
  data.toUpdateTableItem.holdCommand = row.holdCommand
}
</script>

<style scoped>

</style>