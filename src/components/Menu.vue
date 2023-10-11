<template>
  <el-menu mode="horizontal" :ellipsis="false" class="el-menu" @Select="handleSelect">
    <img src="../assets/lumitek.jpg" alt="lumitek">
    <div class="flex-grow" />
    <el-sub-menu :index="feat1.value" v-for="(feat1, feat1Index) in feats1Level" :disabled="feat1.isEmpty">
      <template #title>{{ feat1.value }}</template>
      <div v-for="(feat2, feat2Index) in feats2Level">
        <div v-if="feat2.index === feat1Index">
          <el-menu-item v-if="feat2.isEmpty" :index="feat2.value">{{ feat2.value }}</el-menu-item>
          <el-sub-menu v-else :index="feat2.value">
            <template #title>{{ feat2.value }}</template>
            <div v-for="feat3 in feats3Level">
              <el-menu-item v-if="feat3.index === feat2Index" :index="feat3.value">
                {{ feat3.value }}
              </el-menu-item>
            </div>
          </el-sub-menu>
        </div>
      </div>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import router from '../router/router';

const props = defineProps({
  features: Object
})
const features = props.features
console.log("🚀 ~ file: Menu.vue:31 ~ features:", features)
const feats1Level = []
const feats2Level = []
const feats3Level = []

function setFeatures(features) {
  let feats1index = 0
  let feats2Index = 0
  for (const feats1 in features) {
    const isEmpty = Object.getOwnPropertyNames(features[feats1]).length === 0
    feats1Level.push({
      isEmpty: isEmpty,
      value: feats1
    })
    const data2Level = features[feats1]
    for (const feats2 in data2Level) {
      const data2 = data2Level[feats2]
      const isEmpty = Object.getOwnPropertyNames(data2).length === 0
      feats2Level.push({
        index: feats1index,
        isEmpty: isEmpty,
        value: feats2
      })
      for (const feats3 in data2) {
        feats3Level.push({
          index: feats2Index,
          value: feats3
        })
      }
      feats2Index++
    }
    feats1index++
  }
}
setFeatures(features)

const handleSelect = (index) => {
  switch(index) {
    case 'MFB01-晶圓進貨資料':
      router.push({ name: 'mfb01' })
      break
    default:
      router.push({ name: 'empty' })
      break
  }
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

img {
  height: 40px;
  margin: 6px 0 0 1.5em;
}

.el-menu {
  font-weight: bold;
}
</style>