<template>
  <div :class="{ 'container-horizontal': !settings.verticalMode.isEnabled }">
    <FormCard
      :class="{
        'form-card-horizontal': !settings.verticalMode.isEnabled, 
        'form-card-vertical': settings.verticalMode.isEnabled 
      }"
      :slider="data.onChangeIndex"
      :sharedData="sharedData"
      @updateSharedData="updateSharedData"
      @resetSlider="data.slider = 0"
    ></FormCard>
    <TableCard
      :class="{
        'table-card-horizontal': !settings.verticalMode.isEnabled, 
        'table-card-vertical': settings.verticalMode.isEnabled
      }"
      :sharedData="sharedData"
      :showMoreData="sharedData.showMoreData"
      @updateSharedData="updateSharedData"
    ></TableCard>
  </div>
  <div style="display: flex; align-items: center; margin: 20px 0 50px 0;">
    <suspense>
      <el-slider
        show-input
        style="padding: 0 12px;"
        v-show="sharedData.queryMode && sharedData.dataSize > 1"
        v-model="data.slider"
        :min="sharedData.queryMode ? 1 : 0"
        :max="sharedData.dataSize"
        :marks="data.marks"
        @change="change"
      />
    </suspense>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import FormCard from '@/components/mfb/mfb02/FormCard.vue'
import TableCard from '@/components/mfb/mfb02/TableCard.vue'
import { useSettingsStore } from '@/stores/settings_store'

const { settings } = useSettingsStore()
const data = reactive({
  slider: 0,
  marks: {},
  onChangeIndex: 0
})
const sharedData = reactive({
  change: false,
  changeTableData: false,
  showMoreData: false,
  queryMode: false,
  dataSize: 0,
  form: {
    applyNo: '',
    applyDate: '',
    EstimatedDate: '',
    productNo: '',
    dueDate: '',
    qty: '',
    status: ''
  },
  formDetail: []
})

const updateSharedData = (data) => {
  sharedData.change = !sharedData.change

  sharedData.changeTableData = data.changeTableData !== undefined ? !sharedData.changeTableData : sharedData.changeTableData
  sharedData.showMoreData = data.showMoreData !== undefined ? data.showMoreData : sharedData.showMoreData
  sharedData.queryMode = data.queryMode !== undefined ? data.queryMode : sharedData.queryMode

  if (data.dataSize) {
    sharedData.dataSize = data.dataSize
    updateMarks(data.dataSize)
  }
  if (data.form) {
    Object.assign(sharedData.form, data.form)
  }
  if (data.formDetail) {
    sharedData.formDetail.length = 0
    data.formDetail.forEach(item => {
      sharedData.formDetail.push(item)
    })
  }
}

const updateMarks = (dataSize) => {
  Object.keys(data.marks).forEach(key => {
    delete data.marks[key]
  })
  data.marks[dataSize] = '' + dataSize
}

const change = async function(index) {
  data.onChangeIndex = index
}
</script>

<style scoped>
.container-horizontal {
  margin-top: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.form-card-horizontal {
  margin: 0 10px 0 12px;
}

.table-card-horizontal {
  margin: 0 10px 0 12px;
}

.form-card-vertical {
  margin: 10px 10px 16px 10px;
}

.table-card-vertical {
  margin: 0 8px;
}
</style>