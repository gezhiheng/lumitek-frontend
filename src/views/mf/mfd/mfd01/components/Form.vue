<template>
  <el-form
    :inline="true"
    label-width="100px"
    label-position="left"
    v-model="form"
  >
    <el-form-item label="子批號">
      <el-input v-model="form.productSeqNo" :disabled="props.isUnholdPage" />
    </el-form-item>
    <el-form-item label="扣留類型">
      <el-radio-group
        class="ml-4"
        v-model="form.holdType"
        :disabled="props.isUnholdPage"
        @change="onRadioGroupChange"
      >
        <el-radio label="H">直接扣留</el-radio>
        <el-radio label="PH">預先扣留</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="STAGE">
      <el-select
        placeholder="選擇STAGE"
        v-model="form.stageNo"
        :disabled="props.isUnholdPage || disabled"
      >
        <div v-for="item of data.stageOptions">
          <el-option :label="item" :value="item" />
        </div>
      </el-select>
    </el-form-item>
    <el-form-item label="扣留單號">
      <el-input v-model="form.applyNo" :disabled="props.isUnholdPage" />
    </el-form-item>
    <el-form-item label="STEP">
      <el-select
        placeholder="選擇STEP"
        v-model="form.stepNo"
        :disabled="props.isUnholdPage || disabled"
      >
        <div v-for="item of data.stepOptions">
          <el-option :label="item" :value="item" />
        </div>
      </el-select>
    </el-form-item>
    <el-form-item label="扣留人員">
      <el-input v-model="form.holdBy" :disabled="props.isUnholdPage" />
    </el-form-item>
    <el-form-item label="處理單位">
      <el-select
        placeholder="選擇單位"
        v-model="form.depNo"
        :disabled="props.isUnholdPage"
      >
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item label="扣留部門">
      <el-select
        placeholder="選擇部門"
        v-model="form.holdDepNo"
        :disabled="props.isUnholdPage"
      >
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item label="扣留代碼">
      <el-select
        placeholder="選擇代碼"
        v-model="form.holdCode"
        :disabled="props.isUnholdPage"
      >
        <div v-for="item of data.holdCodeOptions">
          <el-option :label="item.holdCode" :value="item.holdCode">
            <span style="float: left">{{ item.holdCode }}</span>
            <span style="float: right">{{ item.holdCommand }}</span>
          </el-option>
        </div>
      </el-select>
    </el-form-item>
    <el-form-item label="扣留時間">
      <el-input v-model="form.holdOn" :disabled="props.isUnholdPage" />
    </el-form-item>
    <el-form-item label="扣留訊息">
      <el-input
        class="wider"
        :rows="5"
        type="textarea"
        placeholder="扣留訊息"
        :disabled="props.isUnholdPage"
        v-model="form.holdCommand"
      />
    </el-form-item>
    <el-form-item label="放行人員">
      <el-input v-model="form.unholdBy" :disabled="props.isUnholdPage" />
    </el-form-item>
    <el-form-item label="放行單位">
      <el-select
        placeholder="選擇單位"
        v-model="form.unholdDepNo"
        :disabled="props.isUnholdPage"
      >
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item label="放行時間">
      <el-input
        class="wider"
        v-model="form.unholdOn"
        :disabled="props.isUnholdPage"
      />
    </el-form-item>
    <el-form-item label="扣留放行command">
      <el-select
        class="wider"
        placeholder="選擇放行command"
        v-model="form.unholdCommand"
      >
        <div v-for="item of unHoldCommand">
          <el-option :label="item" :value="item" />
        </div>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="props.isUnholdPage"
      class="wider"
      style="margin-left: 100px"
    >
      <el-button plain type="primary" :icon="CaretTop" width="50"
        >加入變數</el-button
      >
      <el-select
        style="margin: 0 12px 0 12px"
        v-model="data.unHoldParam"
        placeholder="添加扣留command"
      >
        <div v-for="item in unholdParams">
          <el-option :label="item" :value="item" />
        </div>
      </el-select>
      <el-button
        plain
        type="primary"
        :icon="CaretRight"
        width="50"
        style="margin-right: 12px"
        >扣留放行</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { CaretTop, CaretRight } from '@element-plus/icons-vue'
import { unholdParams, unHoldCommand, formAttributes } from '../constants'
import { getHoldCode, getStageAndStep } from '@/service/mf/mfd/mfd01'

const props = defineProps({
  isUnholdPage: {
    type: Boolean,
    default: false,
  },
})

const form = defineModel({
  default: Object.assign({}, formAttributes),
  required: true,
})

const data = reactive({
  holdCodeOptions: [],
  unHoldParam: '',
  stageOptions: [],
  stepOptions: [],
})

const disabled = ref(false)

onMounted(async () => {
  await getHoldCode().then((res) => {
    if (res.data) {
      data.holdCodeOptions = []
      data.holdCodeOptions = res.data.holdCodelist
    }
  })
})

const onRadioGroupChange = (value) => {
  if (value === 'H') {
    disabled.value = true
  } else if (value === 'PH') {
    disabled.value = false
  }
  getStageAndStep({
    productSeqNo: form.value.productSeqNo,
    holdType: value,
  }).then((res) => {
    if (res.data && value === 'H') {
      form.value.stepNo = res.data.stepNo
      form.value.stageNo = res.data.stageNo
    } else if (res.data && value === 'PH') {
      data.stageOptions = res.data.stageNo
      data.stepOptions = res.data.stepNo
    }
  })
}
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
