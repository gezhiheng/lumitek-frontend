<template>
  <el-dialog v-model="dialogVisible" title="請輸入查詢條件" width="35%">
    <el-form
      :inline="true" 
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="單據狀態">
        <el-radio-group class="ml-4" v-model="form.F_INP_STAT">
          <el-radio label="待處理">待處理</el-radio>
          <el-radio label="預先扣留">預先扣留</el-radio>
          <el-radio label="END">END</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="晶片刻號">
        <el-input v-model="form.ST_WIPID"/>
      </el-form-item>
      <el-form-item label="扣留單號">
        <el-input v-model="form.applyNo"/>
      </el-form-item>
      <el-form-item label="子批號">
        <el-input v-model="form.productSeqNo"/>
      </el-form-item>
      <el-form-item label="扣留時間" >
        <el-col :span="11">
          <el-date-picker v-model="form.holdstartTime" type="date" placeholder="Pick a date" style="width: 100%" value-format="YYYY-MM-DD"/>
        </el-col>
        <el-col :span="2" style="text-align: center;">
          <span class="text-gray-500">~</span>
        </el-col>
        <el-col :span="11">
          <el-date-picker v-model="form.holdendTime" type="date" placeholder="Pick a date" style="width: 100%" value-format="YYYY-MM-DD"/>
        </el-col>
      </el-form-item>
      <el-form-item label="扣留人員">
        <el-input v-model="form.holdBy"/>
      </el-form-item>
      <el-form-item label="放行人員">
        <el-input v-model="form.unholdBy"/>
      </el-form-item>
      <el-form-item label="放行時間">
        <el-col :span="11">
          <el-date-picker v-model="form.unholdstartTime" type="date" placeholder="Pick a date" style="width: 100%" value-format="YYYY-MM-DD"/>
        </el-col>
        <el-col :span="2" style="text-align: center;">
          <span class="text-gray-500">~</span>
        </el-col>
        <el-col :span="11">
          <el-date-picker v-model="form.unholdendTime" type="date" placeholder="Pick a date" style="width: 100%" value-format="YYYY-MM-DD"/>
        </el-col>
      </el-form-item>
      <el-form-item class="btn-group">
        <el-button type="primary" @click="queryBtnOnClick" v-loading.fullscreen.lock="fullscreenLoading">查詢</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="clearQueryCondition">清空</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue'
import swal from 'sweetalert'
import { queryFormAttributes } from '../constants'
import { query } from '@/service/mf/mfd/mfd01'

const dialogVisible = defineModel({ default: false })

const fullscreenLoading = ref(false)

const emits = defineEmits(['getQueryData'])

const form = reactive(Object.assign({}, queryFormAttributes))

const queryBtnOnClick = async () => {
  try {
    fullscreenLoading.value = true
    await query(form).then(res => {
      if (res.data.dataSize === 0) {
        swal('注意', '沒有查詢到結果', 'warning')
        return
      }
      emits('getQueryData', {
        conditions: toRaw(form),
        res: res.data,
        dataSize: res.data.dataSize
      })
    })
  } finally {
    fullscreenLoading.value = false
    dialogVisible.value = false
  }
}

const clearQueryCondition = () => {
  Object.assign(form, queryFormAttributes)
}
</script>

<style scoped>
.el-form-item {
  width: 100%;
}

.btn-group {
  margin-left: 100px;
}
</style>