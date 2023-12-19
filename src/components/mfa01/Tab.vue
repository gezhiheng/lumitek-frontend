<template>
  <el-tabs type="border-card" class="tabs">
    <el-tab-pane label="規格">
      <el-form  
        :label-position="labelPosition" 
        :model="formTabData.form" 
        label-width="120px" 
        :inline="true"
      >
        <el-form-item label="晶園尺寸">
          <el-input v-model="formTabData.form.waferSize" />
        </el-form-item>
        <el-form-item label="毛晶粒數">
          <el-input v-model="formTabData.form.grossQty" />
        </el-form-item>
        <el-form-item label="點測晶粒數">
          <el-input v-model="formTabData.form.proberQty" />
        </el-form-item>
        <el-form-item label="挑揀晶粒數">
          <el-input v-model="formTabData.form.sorterQty" />
        </el-form-item>
        <el-form-item label="滿BIN數">
          <el-input v-model="formTabData.form.fullBINQty" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="晶圓製程">
      <el-form 
        :label-position="labelPosition"
        :model="formTabData.form" 
        label-width="120px" 
        :inline="true"
      >
        <el-form-item label="晶圓製程" style="width: 312px;">
          <el-select v-model="formTabData.form.WipStdNo" placeholder="選擇晶圓製程">
            <el-option v-for="option in props.wipStdOptions" :label="option" :value="option" />
          </el-select>
        </el-form-item>
        <div style="margin-bottom: 25px;"><span>良率檢查設定</span></div>
        <el-form-item label="點測良率">
          <el-input v-model="formTabData.form.proberYield" style="width: 50%;"/>
          <span style="margin-left: 12px;">%(0不檢查)</span>
        </el-form-item>
        <el-form-item label="AOI的KPI值">
          <el-input v-model="formTabData.form.AOI_KPI" style="width: 50%;"/>
          <span style="margin-left: 12px;">%(0不檢查)</span>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="成品製程">
      <div style="width: 40%; float: left;">
        <el-table :data="formTabData.stations">
          <el-table-column prop="stationNo" label="站別代碼"/>
          <el-table-column prop="stationName" label="站別名稱"/>
        </el-table>
        <el-button type="primary" plain style="margin-top: 12px;">設定站別</el-button>
      </div>
      <!-- <el-dialog v-model="flag.stationDialogVisible" style="width: 500px;">
        <el-transfer
          v-model="value"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="State Abbreviations"
          :data="data"
        />
      </el-dialog> -->
      <div style="width: 55%; margin-left: 12px; float: left;">
        <div style="margin-bottom: 12px;">
          <span>良率檢查設定</span>
        </div>
        <el-form 
          :label-position="labelPosition"
          :inline="true"
          :model="formTabData.form" 
          label-width="150px"
          class="form"
        >
          <el-form-item label="挑揀良率警戒值" >
            <el-input v-model="formTabData.form.sorterWarningYield" />
          </el-form-item>
          <el-form-item label="挑揀良率>=入Bin率">
            <el-tooltip 
              effect="light"
              content="单位% （可過生管收殘晶 0.不檢查）"
              placement="right-start"
            >
              <el-input v-model="formTabData.form.sorterYield" />
            </el-tooltip>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFormTabStore } from '../../stores/mfa01/form_tab_store'
import type { FormProps } from 'element-plus'

const labelPosition = ref<FormProps['labelPosition']>('left')
const props = defineProps({
  wipStdOptions: []
})
const { formTabData } = useFormTabStore()
</script>