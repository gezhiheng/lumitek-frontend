<template>
  <el-card class="container --el-box-shadow-dark">
    <template #header>
      <el-button plain type="primary">
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>返回新增</span>
      </el-button>
      <el-button plain type="primary">
        <el-icon>
          <DocumentAdd />
        </el-icon>
        <span>新增</span>
      </el-button>
      <el-button plain type="primary" @click="dialogFormVisible = !dialogFormVisible">
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
      <el-dialog v-model="dialogFormVisible" title="請輸入查詢條件" style="width: 500px;">
        <el-form :model="queryForm" label-width="120px" style="width: 85%;">
          <el-form-item label="是否有效">
            <el-switch v-model="queryForm.isEnable" active-value="1" inactive-value="0"/>
          </el-form-item>
          <el-form-item label="產品型號">
            <el-input v-model="queryForm.produtNo" />
          </el-form-item>
          <el-form-item label="客戶簡碼">
            <el-input v-model="queryForm.custNo" />
          </el-form-item>
          <el-form-item label="狀態">
            <el-input v-model="queryForm.status" />
          </el-form-item>
          <el-form-item label="產品進貨類型">
            <el-input v-model="queryForm.productInType" />
          </el-form-item>
          <el-form-item label="客戶產品類型">
            <el-input v-model="queryForm.custProductNo" />
          </el-form-item>
          <el-form-item label="產品形態">
            <el-input v-model="queryForm.productType" />
          </el-form-item>
          <el-form-item label="客戶内部料號">
            <el-input v-model="queryForm.custProductPartName" />
          </el-form-item>
          <el-form-item label="製程別">
            <el-input v-model="queryForm.processType" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="querySubmit" v-loading.fullscreen.lock="fullscreenLoading">查詢</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button @click="clearQueryCondition">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
    <el-form 
    :label-position="labelPosition" 
    :inline="true" 
    :model="form" 
    label-width="120px"
    class="form">
      <el-form-item label="產品型號">
        <el-input v-model="form.productNo" />
      </el-form-item>
      <el-form-item label="客戶簡碼">
        <el-input v-model="form.custNo" />
      </el-form-item>
      <el-form-item label="客戶厰別">
        <el-input v-model="form.custSiteNo" />
      </el-form-item>
      <el-form-item label="客戶產品型號">
        <el-input v-model="form.custProductNo" />
      </el-form-item>
      <el-form-item label="批單位數量">
        <el-input v-model="form.batchQty" />
      </el-form-item>
      <el-form-item label="客戶内部料號">
        <el-input v-model="form.custProductPartName" />
      </el-form-item>
      <el-form-item label="狀態" style="width: 312px;">
        <el-select v-model="form.status" placeholder="選擇狀態">
          <el-option v-for="option in statusOptions" :label="option" :value="option" />
        </el-select>
      </el-form-item>
      <el-form-item label="產品進貨類型" style="width: 312px;">
        <el-select v-model="form.productInType" placeholder="選擇產品進貨類型">
          <el-option v-for="option in productInTypeOptions" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="產品形態" style="width: 312px;">
        <el-select v-model="form.productType" placeholder="選擇產品形態">
          <el-option v-for="option in productTypeOptions" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="單位" style="width: 312px; padding-left: 0;">
        <el-select v-model="form.productUnit" placeholder="選擇單位">
          <el-option v-for="option in productUnitOptions" :label="option" :value="option" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="規格">
        <el-form :model="form" label-width="120px" :inline="true">
          <el-form-item label="晶園尺寸">
            <el-input v-model="form.waferSize" />
          </el-form-item>
          <el-form-item label="毛晶粒數">
            <el-input v-model="form.grossQty" />
          </el-form-item>
          <el-form-item label="點測晶粒數">
            <el-input v-model="form.proberQty" />
          </el-form-item>
          <el-form-item label="挑揀晶粒數">
            <el-input v-model="form.sorterQty" />
          </el-form-item>
          <el-form-item label="滿BIN數">
            <el-input v-model="form.fullBINQty" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="晶圓製程">
        <el-form :model="form" label-width="120px" :inline="true">
          <el-form-item label="晶圓製程" style="width: 312px;">
            <el-select v-model="form.WipStdNo" placeholder="選擇晶圓製程">
              <el-option v-for="option in wipStdOptions" :label="option" :value="option" />
            </el-select>
          </el-form-item>
          <div style="margin-bottom: 25px;"><span>良率檢查設定</span></div>
          <el-form-item label="點測良率">
            <el-input v-model="form.proberYield"/>
            <span >%(0不檢查)</span>
          </el-form-item>
          <el-form-item label="AOI的KPI值">
            <el-input v-model="form.AOI_KPI"/>
            <span>%(0不檢查)</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="成品製程">
        <div style="width: 40%; float: left;">
          <el-table :data="stations">
            <el-table-column prop="name" label="Name"/>
            <el-table-column prop="date" label="Date"/>
          </el-table>
          <el-button type="primary" plain>設定站別</el-button>
        </div>
        <div style="width: 55%; margin-left: 12px; float: left;">
          <div style="margin-bottom: 12px;">
            <span>良率檢查設定</span>
          </div>
          <el-form 
          :label-position="labelPosition" 
          :inline="true"
          :model="form" 
          label-width="150px"
          class="form">
            <el-form-item label="挑揀良率警戒值" >
              <el-input v-model="form.sorterWarningYield" />
            </el-form-item>
            <el-form-item label="挑揀良率>=入Bin率">
              <el-tooltip 
              effect="light"
              content="单位% （可過生管收殘晶 0.不檢查）"
              placement="right-start"
              >
                <el-input v-model="form.sorterYield" />
              </el-tooltip>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { FormProps } from 'element-plus'
import { DocumentAdd, Search, FolderOpened, Close } from '@element-plus/icons-vue'
import { queryMFA01, getWipStdOptions } from '@/service/mfa01'

const labelPosition = ref<FormProps['labelPosition']>('left')

const dialogFormVisible = ref<boolean>(false)
const fullscreenLoading = ref<boolean>(false)

const form = reactive({
  isEnable: true, //是否有效
  productNo: '', //產品型號
  custNo: '', //客戶簡碼
  custSiteNo: '', // 客戶厰別
  status: '', // 狀態
  productInType: '', // 產品進貨類型
  custProductNo: '', // 客戶產品型號
  custProductPartName: '', //客戶內部料號
  productType: '', // 產品形態
  productUnit: '', // 單位
  batchQty: '', // 批單位數量
  processType: '', //製程別
  waferSize: '',  //晶圓尺寸
  grossQty: '', //毛晶粒數
  proberQty: '',//點測晶粒數
  sorterQty: '',//挑揀晶粒數
  fullBINQty: '',//滿BIN數
  WipStdNo: '',//晶圓製程
  proberYield: '',//點測良率
  AOI_KPI: '',//AOI的kpi值
  sorterWarningYield: '',//挑揀良率警戒值
  sorterYield: '' //挑揀良率>=入Bin率 - (
})

const queryForm = reactive({
  dataIndex: 0,
  isEnable: '1',
  produtNo: '',
  custNo: '',
  status: '',
  productInType: '',
  custProductNo: '',
  custProductPartName: '',
  productType: '',
  processType: ''
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
const wipStdOptions = ref([])
const stations = ref([])

onMounted(() => {
  getWipStdOptions().then(resolve => {
    wipStdOptions.value = resolve.data.WipStdName
  })
})


const clearQueryCondition = () => {

}

const querySubmit = () => {
  console.log('submit!')
}
</script>

<style src="@/style/mfa01.css" scoped></style>