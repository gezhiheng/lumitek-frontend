<template>
  <el-tabs type="border-card" class="tabs">
    <el-tab-pane label="規格">
      <el-form  
        :label-position="labelPosition" 1
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
      <div style="width: 40%; float: left;">
        <el-table :data="formTabData.wipStations" max-height="220px" stripe>
          <el-table-column prop="parentStationNo" label="母站點"/>
          <el-table-column prop="stationNo" label="子站點"/>
          <el-table-column prop="stationName" label="站點名稱"/>
        </el-table>
        <el-button 
          type="primary" 
          style="margin-top: 12px;"
          plain 
          @click="wipOnClick"
        >
          設定制程
        </el-button>
        <el-dialog v-model="state.isShowWipStationsDialog" style="width: 610px;">
          <template #header>
            <p style="text-align: center;">
              <span>請設定制程</span>
            </p>
          </template>
          <el-transfer
            v-model="wipStationOptions.selected"
            filterable
            filter-placeholder="搜索制程"
            :titles="['全部制程', '設定制程']"
            :data="wipStationOptions.resource"
            @change="onWipOptionsChange"
          >
          </el-transfer>
        </el-dialog>
      </div>
      <div style="width: 55%; margin-left: 12px; float: left;">
        <el-form 
          :label-position="labelPosition"
          :model="formTabData.form" 
          label-width="120px" 
          :inline="true"
        >
          <div style="margin-bottom: 12px;"><span>良率檢查設定</span></div>
          <el-form-item label="點測良率">
            <el-input v-model="formTabData.form.proberYield" style="width: 50%;"/>
            <span style="margin-left: 12px;">%(0不檢查)</span>
          </el-form-item>
          <el-form-item label="AOI的KPI值">
            <el-input v-model="formTabData.form.AOI_KPI" style="width: 50%;"/>
            <span style="margin-left: 12px;">%(0不檢查)</span>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="成品製程">
      <div style="width: 40%; float: left;">
        <el-table :data="formTabData.productStations">
          <el-table-column prop="stationNo" label="站別代碼"/>
          <el-table-column prop="stationName" label="站別名稱"/>
        </el-table>
        <el-button 
          type="primary" 
          style="margin-top: 12px;"
          plain 
          @click="productOnClick"
        >
          設定站別
        </el-button>
      </div>
      <el-dialog v-model="state.isShowProductStationsDialog" style="width: 610px;">
        <template #header>
          <p style="text-align: center;">
            <span>請設定站別</span>
          </p>
        </template>
        <el-transfer
          v-model="productStationOptions.selected"
          filterable
          filter-placeholder="搜索站別"
          :titles="['全部站別', '設定站別']"
          :data="productStationOptions.resource"
          @change="onProductOptionsChange"
        >
        </el-transfer>
      </el-dialog>
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
import { ref, reactive, onMounted } from 'vue'
import type { FormProps } from 'element-plus'
import type { stationOption, station, axiosResponse, stationResponse } from '../../../../../types/type'
import { useFormTabStore } from '../../../../../stores/mfa01/form_tab_store'
import { getWipStations, getProductStations } from '../../../../../service/mf/mfa/mfa01'

const labelPosition = ref<FormProps['labelPosition']>('left')
const state = reactive({
  isShowWipStationsDialog: false,
  isShowProductStationsDialog: false
})
const { formTabData, setStations } = useFormTabStore()
const productStationOptions = reactive({
  resource: [] as stationOption[],
  selected: [] as string[]
})
const wipStationOptions = reactive({
  resource: [] as stationOption[],
  selected: [] as string[]
})
const productOrginalStations = [] as station[]
const wipOrginalStations = [] as station[]

onMounted(async () => {
  let resolve = await getProductStations() as axiosResponse<stationResponse>
  resolve.data.productStations.forEach((station: station) => {
    productStationOptions.resource.push({
      key: station.stationNo,
      label: station.stationName,
      disabled: false
    })
    productOrginalStations.push(station)
  })

  resolve = await getWipStations() as axiosResponse<stationResponse>
  resolve.data.wipStations.forEach((station: station) => {
    wipStationOptions.resource.push({
      key: station.stationNo,
      label: station.stationName,
      disabled: false
    })
    wipOrginalStations.push(station)
  })
})

const productOnClick = () => {
  state.isShowProductStationsDialog = true
  productStationOptions.selected= []
  formTabData.productStations.forEach((station: station) => {
    productStationOptions.selected.push(station.stationNo)
  })
}

const wipOnClick = () => {
  state.isShowWipStationsDialog = true
  wipStationOptions.selected= []
  formTabData.wipStations.forEach((station: station) => {
    wipStationOptions.selected.push(station.stationNo)
  })
}

const onProductOptionsChange = (
  value: number[] | string[],
  direction: 'left' | 'right',
  movedKeys: string[] | number[]
) => {
  const movedStations: station[] = productOrginalStations.filter(
    (station: station) => (value as string[]).includes(station.stationNo)
  )
  setStations('productStations', movedStations)
}

const onWipOptionsChange = (
  value: number[] | string[], 
  direction: 'left' | 'right',
  movedKeys: string[] | number[]
) => {
  const movedStations: station[] = wipOrginalStations.filter(
    (station: station) => (value as string[]).includes(station.stationNo)
  )
  setStations('wipStations', movedStations)
}
</script>