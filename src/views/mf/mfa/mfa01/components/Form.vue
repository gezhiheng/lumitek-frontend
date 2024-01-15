<template>
  <el-form 
    :label-position="labelPosition" 
    :inline="true" 
    :model="formTabData.form" 
    label-width="120px"
    class="form"
  >
    <el-form-item label="產品型號">
      <el-input v-model="formTabData.form.productNo" :disabled="queryMode"/>
    </el-form-item>
    <el-form-item label="客戶簡碼">
      <el-input v-model="formTabData.form.custNo" />
    </el-form-item>
    <el-form-item label="客戶厰別">
      <el-input v-model="formTabData.form.custSiteNo" />
    </el-form-item>
    <el-form-item label="客戶產品型號">
      <el-input v-model="formTabData.form.custProductNo" />
    </el-form-item>
    <el-form-item label="批單位數量">
      <el-input v-model="formTabData.form.batchQty" />
    </el-form-item>
    <el-form-item label="客戶内部料號" >
      <el-input v-model="formTabData.form.custProductPartName" />
    </el-form-item>
    <el-form-item label="製程別" >
      <el-input v-model="formTabData.form.processType" />
    </el-form-item>
    <el-form-item label="狀態">
      <el-select v-model="formTabData.form.status" placeholder="選擇狀態">
        <el-option v-for="option in statusOptions" :label="option" :value="option" />
      </el-select>
    </el-form-item>
    <el-form-item label="產品進貨類型">
      <el-select v-model="formTabData.form.productInType" placeholder="選擇產品進貨類型">
        <el-option v-for="option in productInTypeOptions" :label="option.label" :value="option.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="產品形態" >
      <el-select v-model="formTabData.form.productType" placeholder="選擇產品形態">
        <el-option v-for="option in productTypeOptions" :label="option.label" :value="option.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="單位">
      <el-select v-model="formTabData.form.productUnit" placeholder="選擇單位">
        <el-option v-for="option in productUnitOptions" :label="option" :value="option" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormProps } from 'element-plus'
import { useFormTabStore } from '../../../../../stores/mfa01/form_tab_store'

const labelPosition = ref<FormProps['labelPosition']>('left')
const { formTabData } = useFormTabStore()
const props = defineProps({
  queryMode: Boolean
})
const statusOptions = ['工程', '試產', '量產', '終止', '滯產', '重工']
const productInTypeOptions = [
  {
    label: '客戶晶圓',
    value: '1'
  },
  {
    label: '成品晶圓',
    value: '2'
  },
  {
    label: '成品',
    value: '3'
  }
]
const productTypeOptions = [
  {
    label: 'LED',
    value: '0'
  },
  {
    label: 'LC',
    value: '1'
  }
]
const productUnitOptions = ['片', '頁', '粒']
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>