<template>
  <el-card>
    <template #header>
      <el-button v-if="queryMode" plain type="primary" @click="backToInsertMode">
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
      <el-button plain type="primary" @click="dialogFormVisible = !dialogFormVisible">
        <el-icon>
          <Search />
        </el-icon>
        <span>查询</span>
      </el-button>
      <el-button plain type="danger" @click="lotRepeal">
        <el-icon>
          <Delete />
        </el-icon>
        <span>资料作废</span>
      </el-button>
    </template>
    <el-form label-width="120px">
      <el-form-item label="單號">
        <el-input v-model="data.form.applyNo"/>
      </el-form-item>
      <el-form-item label="產品型號">
        <el-input v-model="data.form.productNo"/>
      </el-form-item>
      <el-form-item label="數量">
        <el-input v-model="data.form.qty"/>
      </el-form-item>
      <el-form-item label="派工日期">
        <el-date-picker
          class="date-picker"
          v-model="data.form.applyDate"
          type="date"
          placeholder="Pick a day"
          :size="'default'"
          style="width: 70%;"
        />
      </el-form-item>
      <el-form-item label="預計完工日期">
        <el-date-picker
          class="date-picker"
          v-model="data.form.EstimatedDate"
          type="date"
          placeholder="Pick a day"
          :size="'default'"
          style="width: 70%;"
        />
      </el-form-item>
      <el-form-item label="實際完工日期">
        <el-date-picker
          v-model="data.form.dueDate"
          type="date"
          placeholder="Pick a day"
          :size="'default'"
          style="width: 70%;"
        />
      </el-form-item>
    </el-form>
    <el-divider />
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column v-for="colum in tableColum" :prop="colum.prop" :label="colum.label" :width="colum.width" />
    </el-table>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue'
import { DocumentAdd, Delete, Search } from '@element-plus/icons-vue'

const data = reactive({
  form: {
    applyNo: '',
    applyDate: '',
    EstimatedDate: '',
    productNo: '',
    dueDate: '',
    qty: '',
    status: ''
  }
})
const tableColum = [
  {
    prop: 'productSeqNo',
    label: '子批號',
    width: 90
  },
  {
    prop: 'ST_lotNo',
    label: '客戶批號',
    width: 90
  },
  {
    prop: 'ST_itemNo',
    label: '客戶項次',
    width: 90
  },
  {
    prop: 'ST_WIPID',
    label: '晶片刻號',
    width: 90
  },
  {
    prop: 'ST_laserMark',
    label: 'LaserMark',
    width: 100
  },
  {
    prop: 'status',
    label: '狀態',
    width: 90
  },
  {
    prop: 'stageNo',
    label: '站別',
    width: 90
  },
  {
    prop: 'stepNo',
    label: '子站別',
    width: 90
  },
  {
    prop: 'PROD_BATCH_M',
    label: '母批號',
    width: 90
  },
]

</script>

<style scoped>
.el-input {
  width: 70%;
}
</style>