<template>
  <el-card class="container --el-box-shadow-dark">
    <el-form 
    :label-position="labelPosition" 
    :inline="true" 
    :model="form" 
    label-width="120px"
    class="form">
      <el-form-item label="產品型號" >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="客戶簡碼">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="客戶厰別">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="客戶產品型號">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="批單位數量">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="客戶内部料號">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="狀態" style="width: 312px;">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="產品進貨類型" style="width: 312px;">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="產品形態" style="width: 312px;">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="單位" style="width: 312px; padding-left: 0;">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="規格">
        
      </el-tab-pane>
      <el-tab-pane label="晶圓製程">Config</el-tab-pane>
      <el-tab-pane label="成品製程">Role</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormProps } from 'element-plus'

const labelPosition = ref<FormProps['labelPosition']>('left')

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

<style src="@/style/mfa01.css" scoped></style>