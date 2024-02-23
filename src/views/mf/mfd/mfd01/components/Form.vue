<template>
  <el-form 
    :inline="true" 
    label-width="100px"
    label-position="left"
  >
    <el-form-item label="子批號">
      <el-input />
    </el-form-item>
    <el-form-item label="扣留類型">
      <el-radio-group class="ml-4">
        <el-radio label="1" size="large">Option 1</el-radio>
        <el-radio label="2" size="large">Option 2</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="STAGE">
      <el-select placeholder="選擇單位">
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item label="扣留單號">
      <el-input />
    </el-form-item>
    <el-form-item label="STEP">
      <el-select placeholder="選擇單位">
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item label="扣留人員">
      <el-input />
    </el-form-item>
    <el-form-item label="處理單位">
      <el-select  placeholder="選擇單位">
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item label="扣留部門">
      <el-select  placeholder="選擇單位">
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item label="扣留代碼">
      <el-input />
    </el-form-item>
    <el-form-item label="扣留時間">
      <el-input />
    </el-form-item>
    <el-form-item label="扣留訊息">
      <el-input 
        class="wider"
        :rows="5" 
        type="textarea"
        placeholder="Please input"/>
    </el-form-item>
    <el-form-item label="放行人員">
      <el-input />
    </el-form-item>
    <el-form-item label="放行單位">
      <el-select  placeholder="選擇單位">
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item label="放行時間">
      <el-input class="wider" />
    </el-form-item>
    <el-form-item label="扣留放行command">
      <el-input 
        class="wider"
        :rows="2" 
        type="textarea"
        placeholder="Please input"/>
    </el-form-item>
    <el-form-item class="wider" style="margin-left: 100px">
      <el-button plain type="primary" :icon="CaretTop" width="50">加入變數</el-button>
      <el-select  placeholder="選擇單位" style="margin: 0 12px 0 12px;">
        <el-option />
      </el-select>
      <el-button plain type="primary" :icon="CaretRight" width="50" style="margin-right: 12px;">扣留放行</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { CaretTop, CaretRight } from '@element-plus/icons-vue'

</script>

<style scoped>
.el-radio-group {
  width: 204px;
}

.el-select {
  width: 204px;
}

.wider {
  width: 542px;
}
</style>