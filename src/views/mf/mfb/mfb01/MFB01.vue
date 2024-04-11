<template>
  <div :class="{ 'container-horizontal': !settings.verticalMode.isEnabled }">
    <form-card
      :class="{
        'form-card-horizontal': !settings.verticalMode.isEnabled,
        'form-card-vertical': settings.verticalMode.isEnabled,
      }"
      :vertical-layout-flag="settings.verticalMode.isEnabled"
      :slider="slider"
      @changeSlider="changeSlider"
      @setSliderVisible="setSliderVisible"
      @setQueryMode="setQueryMode"
      @setSliderMarks="setSliderMarks"
      @setInsertMode="setInsertMode"
    ></form-card>
    <table-card
      :class="{
        'table-card-horizontal': !settings.verticalMode.isEnabled,
        'table-card-vertical': settings.verticalMode.isEnabled,
      }"
      :vertical-layout-flag="settings.verticalMode.isEnabled"
      :queryMode="queryMode"
      :insertMode="insertMode"
    ></table-card>
  </div>

  <div style="display: flex; align-items: center; margin: 20px 0 50px 0">
    <suspense>
      <el-slider
        v-if="sliderVisible"
        v-model="slider"
        show-input
        style="padding-left: 12px"
        :min="1"
        :max="formTableData.dataSize"
        :disabled="formTableData.dataSize <= 1"
        :marks="marks"
        @change="change"
      />
    </suspense>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { debounce } from 'lodash-es'
import FormCard from './components/FormCard.vue'
import TableCard from './components/TableCard.vue'
import { useFormTableStore } from '@/stores/mfb01/form_table_store'
import { useQueryStore } from '@/stores/mfb01/query_conditions_store'
import { useSettingsStore } from '@/stores/settings_store'

const { settings } = useSettingsStore()

const slider = ref(0)
const sliderVisible = ref(false)
const queryMode = ref(false)
const sliderIndex = ref(1)
const insertMode = ref(false)

const { formTableData, setFormTable } = useFormTableStore()

const change = async function (index) {
  sliderIndex.value = index
  if (formTableData.dataSize < 1) {
    return
  }
  const { queryConditions } = useQueryStore()
  const debouncedsetFormTable = debounce(async () => {
    queryConditions.dataIndex = index - 1
    await setFormTable(queryConditions)
  }, 300)
  debouncedsetFormTable()
}

const marks = reactive({})

const changeSlider = () => {
  slider.value = 0
}

const setSliderVisible = (visible) => {
  sliderVisible.value = visible
}

const setQueryMode = (mode) => {
  queryMode.value = mode
}

const setSliderMarks = (dataSize) => {
  Object.keys(marks).forEach((key) => {
    delete marks[key]
  })
  marks[dataSize] = '' + dataSize
}

const setInsertMode = (mode) => {
  insertMode.value = mode
}
</script>

<style scoped>
@import url('@/style/toggle-vertical.css');
h1 {
  display: inline-block;
  line-height: 40px;
}

header {
  display: flex;
  justify-content: space-between;
  margin: 15px 0 15px 0;
}
</style>
