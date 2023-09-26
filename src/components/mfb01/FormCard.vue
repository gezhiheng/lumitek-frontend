<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" el-icon="DocumentAdd">Operation button</el-button>
        <el-icon>
          <DocumentAdd />
        </el-icon>
      </div>
    </template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="客戶簡碼">
        <el-select v-model="form.region">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="客戶訂單編號">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" />
      </el-form-item>
      <el-form-item label="單號">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" placeholder="系統產生" disabled />
      </el-form-item>
      <el-form-item label="進貨日期">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="製程別">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="總晶圓數">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="件別">
        <el-radio-group v-model="form.resource" disabled>
          <el-radio label="急件" />
          <el-radio label="一般" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="備註">
        <el-input v-model="form.desc" :class="{ input: verticalLayoutFlag }" type="textarea" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup> 
import { reactive } from 'vue'

const props = defineProps({
  verticalLayoutFlag: Boolean
})

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped>
.input {
  max-width: 70%;
}
</style>