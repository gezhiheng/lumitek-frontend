<template>
  <el-row>
    <el-col :span="12">
      <el-menu
        default-active="1"
        :default-active="activeMenu" 
        @select="handleSelect"
      >
        <el-sub-menu 
          default-active="1"
          style="background-color: white;"
          :index="feat1st" 
          v-for="(feat1st, feat1stIndex) in feats1stLevel"
        >
          <template #title>
            <span style="font-weight: bolder">{{ feat1st }}</span>
          </template>
            <div v-for="(feat2nd, feat2Index) in feats2ndLevel">
            <el-sub-menu 
              v-if="feat2nd.index === feat1stIndex" 
              :index="feat2nd.value"  
            >
              <template #title>{{ feat2nd.value }}</template>
              <div v-for="feads3rd in feats3rdLevel">
                <el-menu-item 
                  v-if="feads3rd.index === feat2Index"
                  :index="feads3rd.value" 
                >
                  {{ feads3rd.value }}
                </el-menu-item>
              </div>
            </el-sub-menu>
          </div>
        </el-sub-menu>
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
  let feats1index = 0
  let feats2Index = 0
  for (const feats1st in features) {
    feats1stLevel.push(feats1st)
    const data2Level = features[feats1st]
    for (const feats2nd in data2Level) {
      feats2ndLevel.push({
        index: feats1index,
        value: feats2nd
      })
      for (const feads3rd in data2Level[feats2nd]) {
        feats3rdLevel.push({
          index: feats2Index,
          value: feads3rd
        })
      }
      feats2Index++
    }
    feats1index++
  }  
}
setFeatures(defaultFeatures)

const activeMenu = ref('')
const handleSelect = (index) => {
  switch(index) {
    case 'MFB01-晶圓進貨資料':
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