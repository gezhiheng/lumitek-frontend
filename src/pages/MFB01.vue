<template>
  <header>
    <h1 style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">MFB01-晶圓進貨資料</h1>
    <span>
      <el-switch 
        class="switch" 
        size="large" 
        style="--el-switch-on-color: #409eff; --el-switch-off-color: #dcdfe6" 
        v-model="verticalLayoutFlag" 
        inline-prompt active-text="水平展示" 
        inactive-text="垂直展示 "/>
    </span>
  </header>

  <div :class="{ 'container-horizontal': !verticalLayoutFlag }">
    <form-card
      :class="{ 'form-card-horizontal' : !verticalLayoutFlag, 'form-card-vertical': verticalLayoutFlag }"
      :vertical-layout-flag="verticalLayoutFlag" 
      :slider="slider" 
      @changeSlider="changeSlider"
      @setSliderVisible="setSliderVisible"
      @setQueryMode="setQueryMode"
    ></form-card>
    <table-card
      :class="{ 'table-card-horizontal' : !verticalLayoutFlag }"
      :vertical-layout-flag="verticalLayoutFlag" 
      :queryMode="queryMode"
    ></table-card>
  </div>

  <div style="display: flex; align-items: center; margin: 20px 0 50px 0;">
    <suspense>
      <el-slider
        v-if="sliderVisible"
        v-model="slider" 
        show-input
        style="padding-left: 12px;" 
        :max="formTableData.dataSize - 1"
        @change="change"
      />
    </suspense>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import FormCard from '@/components/mfb01/FormCard.vue'
import TableCard from '@/components/mfb01/TableCard.vue'
import { useFormTableStore } from '@/stores/mfb01/form_table_store'
import { debounce } from 'lodash-es'
import { useQueryStore } from '@/stores/mfb01/query_conditions_store';

const slider = ref(0)
const sliderVisible = ref(false)
const queryMode = ref(false)

const { formTableData, setFormTable } = useFormTableStore()
let verticalLayoutFlag = ref(false)

const change = async function(index) {
  if (formTableData.dataSize < 1) {
    return
  }
  const { queryConditions } = useQueryStore()
  const debouncedsetFormTable = debounce(async () => {
    queryConditions.dataIndex = index
    await setFormTable(queryConditions)
  }, 300)
  debouncedsetFormTable()
}

const changeSlider = () => {
  slider.value = 0
}

const setSliderVisible = (visible) => {
  sliderVisible.value = visible
}

const setQueryMode = (mode) => {
  queryMode.value = mode
}
</script>

<style src="@/style/mfb01/mfb01.css" scoped></style>