<template>
  <el-descriptions>
    <el-descriptions-item label="部門">{{ data.depName }}</el-descriptions-item>
  </el-descriptions>
  <VueDraggable v-model="data.table" target="tbody" @end="saveOrderChange">
    <el-table 
      style="margin-bottom: 15px; padding: 0;"
      empty-text="沒有數據"
      highlight-current-row
      :height="data.table.length >= 16 ? 700 : 500"
      :data="data.table"
      @cell-click="tableOnclick"
    >
      <el-table-column
        v-for="item in unHoldTableColmuns"
        :prop="item.prop"
        :label="item.label"
        :align="'center'"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" :align="'center'">
        <template #default>
          <el-button link type="primary" size="small" @click="updateBtnOnclick">
            修改
          </el-button>
          <el-button link type="danger" size="small" @click="state.confirmDialogVisible = true">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </VueDraggable>
  <el-dialog
    v-model="state.dialogVisible"
    :title="state.update ? '修改' : '新增'"
    width="500"
  >
    <el-form>
      <el-form-item label="command" label-width="80">
        <el-input v-model="data.dialog.commandModified"/>
      </el-form-item>
      <el-form-item label="isJ(站點)" label-width="80">
        <el-switch 
          v-model="data.dialog.isJ"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="state.dialogVisible = false">取消</el-button>
        <el-button v-show="state.update" type="primary" @click="confirmUpdateBtnOnclick">確認修改</el-button>
        <el-button v-show="!state.update" type="primary" @click="confirmAddBtnOnclick">確認新增</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="state.confirmDialogVisible" title="確認是否刪除" width="195" top="30vh">
    <el-button @click="state.confirmDialogVisible = false">取消</el-button>
    <el-button type="danger" @click="confirmDelBtnOnclick">確認刪除</el-button>
  </el-dialog>
  <el-button
    type="primary"
    @click="addBtnOnclick"
  >
    新增一行
  </el-button>
</template>

<script setup>
import { reactive, defineModel, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { unHoldTableColmuns, unHoldDialog } from './constants'
import { UnHoldRequest } from '@/service/mf/mfa/mfa09'
import ral from '@/utils/response_alert'

const request = new UnHoldRequest()
const staffNo = window.sessionStorage.getItem('staffNo')
const getTableDataFlag = defineModel({ default: false })

watch(getTableDataFlag, async () => {
  await refreshTable()
})

const data = reactive({
  depName: '',
  table: [],
  dialog: Object.assign({ staffNo: staffNo }, unHoldDialog)
})

const state = reactive({
  dialogVisible: false,
  confirmDialogVisible: false,
  update: true
})

const tableOnclick = (row, column, cell, event) => {
  data.dialog.seqNo = row.seqNo
  data.dialog.isJ = row.isJ + ''
  data.dialog.commandOriginal = row.command
  data.dialog.commandModified = row.command
}

const updateBtnOnclick = () => {
  state.dialogVisible = true
  state.update = true
}

const confirmUpdateBtnOnclick = async () => {
  await request.update(data.dialog)
  .then(res => {
    const isSuccess = ral(res)
    if (isSuccess) {
      refreshTable()
    }
  })
  state.dialogVisible = false
}

const addBtnOnclick = () => {
  data.dialog = Object.assign({ staffNo: staffNo }, unHoldDialog)
  data.dialog.isJ = '1'
  state.dialogVisible = true
  state.update = false
}

const confirmAddBtnOnclick = async () => {
  const params = data.dialog
  params.command = data.dialog.commandModified
  await request.add(params)
  .then(res => {
    const isSuccess = ral(res)
    if (isSuccess) {
      refreshTable()
    }
  })
  state.dialogVisible = false
}

const confirmDelBtnOnclick = async () => {
  await request.delete({ seqNo: data.dialog.seqNo })
  .then(res => {
    const isSuccess = ral(res)
    if (isSuccess) {
      refreshTable()
    }
  })
  state.confirmDialogVisible = false
}

const saveOrderChange = async () => {
  await request.saveOrder({
    staffNo: staffNo,
    table: data.table
  })
  await refreshTable()
}

const refreshTable = async () => {
  await request.init(staffNo)
  .then(res => {
    data.depName = res.depName
    data.isJ = res.isJ + ''
    data.table = res.table.map(item => {
      item.createdOn = item.createdOn.slice(0, 10)
      item.modifiedOn = item.modifiedOn.slice(0, 10)
      return item
    })
  })
}
</script>