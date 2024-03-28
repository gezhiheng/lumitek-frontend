<template>
  <el-table 
    highlight-current-row
    :height="data.table.length >= 16 ? 700 : 500"
    style="margin-bottom: 15px; padding: 0;"
    empty-text="沒有數據"
    lazy="true"
    :data="data.table"
    @cell-click="tableOnclick"
  >
    
    <el-table-column 
      index="seqNo"
      v-for="item in cancelTableColmuns"
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
  <el-dialog
    v-model="state.dialogVisible"
    :title="state.update ? '修改' : '新增'"
    width="500"
  >
    <el-form>
      <el-form-item label="command">
        <el-input v-model="data.dialog.commandModified"/>
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
import { reactive, onMounted } from 'vue'
import { cancelTableColmuns, cancelDialog } from './constants'
import { CancelRequest } from '@/service/mf/mfa/mfa09'
import ral from '@/utils/response_alert'

const request = new CancelRequest()
const staffNo = window.sessionStorage.getItem('staffNo')

const data = reactive({
  table: [],
  dialog: Object.assign({ staffNo: staffNo }, cancelDialog)
})

const state = reactive({
  dialogVisible: false,
  confirmDialogVisible: false,
  update: true
})

onMounted(async () => {
  await refreshTable()
})

const tableOnclick = (row, column, cell, event) => {
  data.dialog.seqNo = row.seqNo
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
  data.dialog = Object.assign({ staffNo: staffNo }, cancelDialog)
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

const refreshTable = async () => {
  await request.init(staffNo)
  .then(res => {
    data.table = res.table.map(item => {
      item.createdOn = item.createdOn.slice(0, 10)
      item.modifiedOn = item.modifiedOn.slice(0, 10)
      return item
    })
  })
}
</script>