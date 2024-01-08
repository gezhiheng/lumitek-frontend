<template>
  <!-- default-active的默认选中菜单绑定为透传的title 是因为app组件透传时，是把index设置为title -->
  <el-menu mode="horizontal" :ellipsis="false" class="el-menu" @Select="handleSelect" :default-active="title">
    <router-link to="/welcome">
      <img v-if="!isDark" src="@/assets/lumitek.jpg" alt="lumitek">
      <img v-else src="@/assets/lumitek-dark-mode.png" alt="lumitek">
    </router-link>
    <h1>{{ title }}</h1>
    <div class="flex-grow"></div>
    <div v-for="feature in featuresRequest.features">
      <el-sub-menu v-if="feature.children.length > 0" :index="feature.index">
        <template #title>
          {{ feature.label }}
        </template>
        <div v-for="child1 in feature.children">
          <el-sub-menu v-if="child1.children && child1.children.length > 0" :index="child1.index">
            <template #title>
              {{ child1.label }}
            </template>
            <el-menu-item v-for="child2 in child1.children" :index="child2.index">
              {{ child2.label }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-if="!child1.children" :index="child1.index">
            {{ child1.label }}
          </el-menu-item>
        </div>
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script setup>
import { onMounted, inject } from 'vue'
import { useDark } from "@vueuse/core"
import { getFeatures }  from '@/service/user'
import { useFeaturesStore } from '@/stores/features_store'
import router from '@/router/router'
import useableFeatures from '@/constants/useable_features'

const isDark = useDark()
const title = inject('title')
const staffNo = window.sessionStorage.getItem('staffNo')
const { featuresRequest, setFeaturesRequest } = useFeaturesStore()

onMounted(async () => {
  if (!featuresRequest.requested) {
    const featuresRequested = await getFeatures(staffNo).then((resolve, reject) => {
      return resolve.data
    })
    setFeaturesRequest(featuresRequested)
  }
})

const handleSelect = (index) => {
  let feature = ''
  useableFeatures.forEach(item => {
    if (item.index === index) {
      feature = item.index
      router.push({ name: item.index })
      return
    }
  })
  if (feature === '') {
    router.push({ name: 'empty' })
  }
}
</script>

<style src="@/style/menu.css" scoped></style>