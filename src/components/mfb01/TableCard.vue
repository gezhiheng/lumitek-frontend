<template>
  <el-card type="border-card">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" model-value="first">

      <el-tab-pane label="總表" name="first">
        <el-table :data="tableData" style="width: 100%; margin-bottom: 15px;">
          <el-table-column fixed prop="date" label="Date" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="120" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column label="Operations" width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>

        <span>
          <el-button plain type="success">
            <el-icon>
              <Check />
            </el-icon>
            <span>资料还原</span>
          </el-button>
          <el-button plain type="danger">
            <el-icon>
              <Close />
            </el-icon>
            <span>资料作废</span>
          </el-button>
        </span>

      </el-tab-pane>

      <el-tab-pane label="明細" name="second">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="120" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column label="Operations" width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="附件" name="third">
        <el-table :data="tableData" style="width: 100%; margin-bottom: 15px;">
          <el-table-column fixed prop="date" label="Date" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="120" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column label="Operations" width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </el-table-column>
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
            <el-icon>
              <SuccessFilled />
            </el-icon>
            <span>全选</span>
          </el-button>
          <el-button type="primary" plain>
            <el-icon>
              <CircleCloseFilled />
            </el-icon>
            <span>取消</span>
          </el-button>
          <el-button type="success" plain>
            <el-icon>
              <CirclePlusFilled />
            </el-icon>
            <span>新增</span>
          </el-button>
          <el-button type="danger" plain>
            <el-icon>
              <RemoveFilled />
            </el-icon>
            <span>删除</span>
          </el-button>
          <el-button type="info" plain>
            <el-icon>
              <UploadFilled />
            </el-icon>
            <span>下载</span>
          </el-button>
        </span>
      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>

<script setup>
import { Check, Close, SuccessFilled, CircleCloseFilled, CirclePlusFilled, RemoveFilled, UploadFilled } from '@element-plus/icons-vue'

const props = defineProps({
  verticalLayoutFlag: Boolean
})

</script>