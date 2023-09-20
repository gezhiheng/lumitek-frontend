<template>
  <el-row>
    <el-col :span="12">
      <el-menu
        default-active="1"
        :default-active="activeMenu" 
        @select="handleSelect"
      >
        <!-- <el-sub-menu 
          default-active="1"
          style="background-color: white;"
          :index="firstFeature" 
          v-for="firstFeature in feats1stLevel"
        >
          <template #title>
            <span>{{ firstFeature }}</span>
          </template>

          <el-menu-item 
            :index="secondFeature" 
            v-for="secondFeature in feats2ndLevel"
          >
            {{ secondFeature }}
          </el-menu-item>
          <el-sub-menu index="1-4">
            <template #title>MFB進貨派工作業</template>
            <el-menu-item index="mfb01">MFB01-晶圓進貨資料</el-menu-item>
            <el-menu-item index="1-4-2">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->

      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router/router'
import defaultFeatures from '../assets/default-feature-list'

const feats1stLevel = []
const feats2ndLevel = []
const feats3rdLevel = []
function setFeatures(features) {
  for (const feats1st in features) {
    let feats1index = 0
    feats1stLevel.push(feats1st)
    const data2Level = features[feats1st]
    for (const feats2nd in data2Level) {
      let feats2Index = 0
      const map = new Map()
      map.set(feats1index++, feats2nd)
      feats2ndLevel.push(map)
      for (const feads3rd in data2Level[feats2nd]) {
        const map = new Map()
        map.set(feats2Index++, feads3rd)
        feats3rdLevel.push(map)
      }
    }
  }  
}
setFeatures(defaultFeatures)
console.log(feats1stLevel);
console.log(feats2ndLevel);
console.log(feats3rdLevel);

function isObjEmpty(obj) {
  return Object.keys(obj) === 0
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