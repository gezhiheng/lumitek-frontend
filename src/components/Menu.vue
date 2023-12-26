<template>
  <!-- default-active的默认选中菜单绑定为透传的title 是因为app组件透传时，是把index设置为title -->
  <el-menu mode="horizontal" :ellipsis="false" class="el-menu" @Select="handleSelect" :default-active="title">
    <router-link to="/welcome">
      <img v-if="!isDark" src="@/assets/lumitek.jpg" alt="lumitek">
      <img v-else src="@/assets/lumitek-dark-mode.png" alt="lumitek">
    </router-link>
    <h1>{{ title }}</h1>
    <div class="flex-grow"></div>
    <el-sub-menu :index="feat1.value" v-for="(feat1, feat1Index) in menu.firstLevel" :disabled="feat1.isEmpty">
      <template #title>{{ feat1.value }}</template>
      <div v-for="(feat2, feat2Index) in menu.secondLevel">
        <div v-if="feat2.index === feat1Index">
          <el-menu-item v-if="feat2.isEmpty" :index="feat2.value">{{ feat2.value }}</el-menu-item>
          <el-sub-menu v-else :index="feat2.value">
            <template #title>{{ feat2.value }}</template>
            <div v-for="feat3 in menu.thirdLevel">
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
import { reactive, onMounted, inject } from 'vue'
import { useDark } from "@vueuse/core"
import { getFeatures }  from '@/service/user'
import { useFeaturesStore } from '@/stores/features_store'
import router from '@/router/router'
import routerMapping from '@/constants/router_mapping'

const isDark = useDark()
const menu = reactive({
  firstLevel: [],
  secondLevel: [],
  thirdLevel: []
})
const title = inject('title')
const staffNo = window.sessionStorage.getItem('staffNo')
const useBackendDataFlag = import.meta.env.VITE_USE_BACKEND_DATA_FLAG === 'true'
const { features, setFeatures } = useFeaturesStore()

onMounted(async () => {
  if (useBackendDataFlag && !features.requested) {
    const featuresRequested = await getFeatures(staffNo).then((resolve, reject) => {
      return resolve.data
    })
    setFeatures(featuresRequested)
  }
  setMenu(features.features)
})

function setMenu(features) {
  let index1 = 0
  let index2 = 0
  for (const feats1 in features) {
    const isEmpty = Object.getOwnPropertyNames(features[feats1]).length === 0
    menu.firstLevel.push({
      isEmpty: isEmpty,
      value: feats1
    })
    const data2Level = features[feats1]
    for (const feats2 in data2Level) {
      const data2 = data2Level[feats2]
      const isEmpty = Object.getOwnPropertyNames(data2).length === 0
      menu.secondLevel.push({
        index: index1,
        isEmpty: isEmpty,
        value: feats2
      })
      for (const feats3 in data2) {
        menu.thirdLevel.push({
          index: index2,
          value: feats3
        })
      }
      index2++
    }
    index1++
  }
}

const handleSelect = (index) => {
  let name = ''
  routerMapping.forEach(item => {
    if (item.index === index) {
      name = item.name
      router.push({ name: item.name })
      return
    }
  })
  if (name === '') {
    router.push({ name: 'empty' })
  }
}
</script>

<style src="@/style/menu.css" scoped></style>