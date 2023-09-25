<template>
  <h1>MFB01-晶圓進貨資料</h1>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" el-icon="DocumentAdd">Operation button</el-button>
        <el-icon><DocumentAdd /></el-icon>
      </div>
    </template>

    <MFB01Demo01></MFB01Demo01>

  </el-card>

  <el-card class="box-card-table">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="總表" name="first">總表</el-tab-pane>
      <el-tab-pane label="明細" name="second">明細</el-tab-pane>
      <el-tab-pane label="附件" name="third">附件</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
import MFB01Demo01 from '../test/components/MFB01-demo01.vue';
const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

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
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

h1 {
  margin-top: 15px;
}

.box-card {
  margin: 15px 0 30px 0;
}

.large-input {
  margin: 0 20px 0 8px;
  width: 18em;
}

.mid-input {
  margin: 0 20px 0 8px;
  width: 12em;
}

.tiny-input {
  margin: 0px 20px 0 8px;
  width: 6.5em;
}

.col {
  margin-bottom: 15px;
}
</style>