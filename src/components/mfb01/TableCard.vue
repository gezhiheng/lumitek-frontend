<template>
  <el-card type="border-card" style="max-height: 100%;">
    <el-tabs class="demo-tabs" model-value="first">

      <el-tab-pane label="總表" name="first">

        <el-table 
          style="width: 100%; 
          margin-bottom: 15px;
          padding: 0;" 
          :data="formTableData.tbDetail"
          :max-height="verticalLayoutFlag ? 750 : 500"
        >
          <el-table-column
            v-for="(item, index) in tbDetailColumns"
            :prop="item[1]"
            :fixed="verticalLayoutFlag && index < 4"
            :label="item[0]" 
            :width="item[0].length > 4 ? 150 : 80"
          />
        </el-table>

        <span>
          <el-button plain type="success">
            <el-icon><Check /></el-icon>
            <span>资料还原</span>
          </el-button>
          <el-button plain type="danger">
            <el-icon><Close /></el-icon>
            <span>资料作废</span>
          </el-button>
        </span>

      </el-tab-pane>

      <el-tab-pane label="明細" name="second">
        <el-table 
          :data="formTableData.tbDetailDetail" 
          :max-height="verticalLayoutFlag ? 750 : 500"
          style="width: 100%"
        >
          <el-table-column 
            v-for="item in tbDetailDetailColumns"
            :prop="item[1]" 
            :label="item[0]" 
            :width="item[0].length > 4 ? 150 : 100"
          />
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="附件" name="third">
        <el-table 
          :data="formTableData.tbAttachment"
          style="width: 100%; margin-bottom: 15px;" 
          :max-height="verticalLayoutFlag ? 750 : 500"
        >
          <el-table-column label="" width="30"/>
          <el-table-column label="檔案名稱" prop="fileName" width="200"/>
          <el-table-column label="檢視" width="80"/>
        </el-table>

        <div v-if="verticalLayoutFlag" style="margin-bottom: 20px;">
          <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>
        </div>
        <span>
          <el-button type="primary" plain>
            <el-icon><SuccessFilled /></el-icon>
            <span>全选</span>
          </el-button>
          <el-button type="primary" plain>
            <el-icon><CircleCloseFilled /></el-icon>
            <span>取消</span>
          </el-button>
          <el-button type="success" plain>
            <el-icon><CirclePlusFilled /></el-icon>
            <span>新增</span>
          </el-button>
          <el-button type="danger" plain>
            <el-icon><RemoveFilled /></el-icon>
            <span>删除</span>
          </el-button>
          <el-button type="info" plain>
            <el-icon><UploadFilled /></el-icon>
            <span>下载</span>
          </el-button>
        </span>
      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>

<script setup>
import { Check, Close, SuccessFilled, CircleCloseFilled, CirclePlusFilled, RemoveFilled, UploadFilled } from '@element-plus/icons-vue'
import { useFormTableStore } from '../../stores/mfb01/form_table_store'

const { formTableData } = useFormTableStore()

/**
 * '晶圓大小', '退貨重工', '客戶批號', '到期日', '固定BIN', '機群', '方片對角線', '包裝方式', 'pad grade', 'Sort Fail Bin', 'Life Pickup', 'ESD', 'electricCurrent', 'status', '專案代碼', 'Approval', 'KEA', 'AProject', '抽測有效顆粒數', 'Tape可抽測顆粒數', '回貨資訊', '工程驗證', '圓片有效顆數ratio', '方片抽測比例', 'blockSize', '專案代碼blockSize', 'projectName']
   还有上面这些栏位的值没有放到tbDetailColumns，太麻烦了
 */
const tbDetailColumns = [
  ['項次', 'orderItemNo'], 
  ['出廠別', 'custSite'], 
  ['客戶產品型號', 'custProductNo'], 
  ['客戶產品名稱', 'custProductName'], 
  ['批號 委工單號', 'lotNo'], 
  ['作業', 'task'], 
  ['晶圓數量', 'waferQty'], 
  ['回貨廠區', 'shipSite']
 ]
const tbDetailDetailColumns = [
  ['批號', 'lotNo'],
  ['項次', 'itemNo'],
  ['晶片刻號', 'WIPID'],
  ['客戶產品名稱', 'custProductName'],
  ['LaserMark', 'laserMark'],
  ['Life Pickup', 'lifePickup'],
  ['委出片數', 'piece'],
  ['委出KEA', 'KEA']
]

const props = defineProps({
  verticalLayoutFlag: Boolean
})

</script>