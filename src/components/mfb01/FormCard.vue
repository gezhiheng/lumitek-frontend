<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>
          <el-button plain type="primary">
            <el-icon>
              <DocumentAdd />
            </el-icon>
            <span>新增</span>
          </el-button>
          <el-button plain type="primary" @click="dialogFormVisible = true">
            <el-icon>
              <Search />
            </el-icon>
            <span>查询</span>
          </el-button>
          <el-button plain type="primary">
            <el-icon>
              <FolderOpened />
            </el-icon>
            <span>资料汇入</span>
          </el-button>
        </span>

        <el-dialog v-model="dialogFormVisible" title="Shipping address">
          <el-form :model="form" label-width="120px">
            <el-form-item label="單號">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="客戶簡碼">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="客戶訂單編號">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Activity zone">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">~</span>
              </el-col>
              <el-col :span="11">
                <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="Activity type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Online activities" name="type" />
                <el-checkbox label="Promotion activities" name="type" />
                <el-checkbox label="Offline activities" name="type" />
                <el-checkbox label="Simple brand exposure" name="type" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor" />
                <el-radio label="Venue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <span>
          <!-- <el-button plain type="success">
          <el-icon><Check/></el-icon>
          <span>资料还原</span>
        </el-button> -->
          <el-button plain type="danger">
            <el-icon>
              <Close />
            </el-icon>
            <span>资料作废</span>
          </el-button>
        </span>
      </div>
    </template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="客戶簡碼">
        <el-select v-model="form.region">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="客戶訂單編號">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" />
      </el-form-item>
      <el-form-item label="單號">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" placeholder="系統產生" disabled />
      </el-form-item>
      <el-form-item label="進貨日期">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="製程別">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="總晶圓數">
        <el-input v-model="form.name" :class="{ input: verticalLayoutFlag }" disabled />
      </el-form-item>
      <el-form-item label="件別">
        <el-radio-group v-model="form.resource" disabled>
          <el-radio label="急件" />
          <el-radio label="一般" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="備註">
        <el-input v-model="form.desc" :class="{ input: verticalLayoutFlag }" type="textarea" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { DocumentAdd, Search, FolderOpened, Check, Close } from '@element-plus/icons-vue'

const props = defineProps({
  verticalLayoutFlag: Boolean
})

const dialogFormVisible = ref(false)

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

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped>
.input {
  max-width: 70%;
}

.card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>