<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="客戶簡碼">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="客戶訂單編號">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="單號">
      <el-input v-model="form.name" placeholder="系統產生" disabled/>
    </el-form-item>
    <el-form-item label="進貨日期">
      <el-input v-model="form.name" disabled/>
    </el-form-item>
    <el-form-item label="製程別">
      <el-input v-model="form.name" disabled/>
    </el-form-item>
    <el-form-item label="總晶圓數">
      <el-input v-model="form.name" disabled/>
    </el-form-item>
    <el-form-item label="件別">
      <el-radio-group v-model="form.resource" disabled>
        <el-radio label="急件" />
        <el-radio label="一般" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="備註">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// do not use same name with ref
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

const onSubmit = () => {
  console.log('submit!')
}
</script>
