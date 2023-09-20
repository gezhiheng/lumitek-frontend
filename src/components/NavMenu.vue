<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :default-active="activeMenu" 
        @select="handleSelect"
      >
        <el-sub-menu index="1" style="background-color: white;">
          <template #title>
            <span>MF製造管理</span>
          </template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-3">item three</el-menu-item>
          <el-sub-menu index="1-4">
            <template #title>MFB進貨派工作業</template>
            <el-menu-item index="mfb01">MFB01-晶圓進貨資料</el-menu-item>
            <el-menu-item index="1-4-2">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <el-sub-menu index="2" style="background-color: white;">
          <template #title>
            <span>Navigator Two</span>
          </template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <el-sub-menu index="3" style="background-color: white;">
          <template #title>
            <span>Navigator Three</span>
          </template>
            <el-menu-item index="3-1">item one</el-menu-item>
            <el-menu-item index="3-2">item two</el-menu-item>
            <el-menu-item index="3-3">item three</el-menu-item>
          <el-sub-menu index="3-4">
            <template #title>item four</template>
            <el-menu-item index="3-4-1">item one</el-menu-item>
            <el-menu-item index="3-4-2">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router/router'
import defaultFeatureList from '../assets/default-feature-list'

const featrueList = [];

function setFeatureList(featureListObj, featureList) {
  let level = 0
  for (const key in featureListObj) {
      
  }
}

const activeMenu = ref('')
const handleSelect = (index) => {
  switch(index) {
    case 'mfb01':
      router.push('/mfb01')
      break
    default:
      router.push('/')
  }
}

</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  width: 200px;
}
</style>