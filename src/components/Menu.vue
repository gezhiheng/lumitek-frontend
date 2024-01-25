<template>
  <!-- default-active的默认选中菜单绑定为透传的title 是因为app组件透传时，是把index设置为title -->
  <el-menu mode="horizontal" :ellipsis="false" class="el-menu el-menu-demo" @Select="handleSelect" :default-active="activeIndex">
    <router-link to="/welcome">
      <img v-show="!isDark" src="@/assets/lumitek.jpg" alt="lumitek">
      <img v-show="isDark" src="@/assets/lumitek-dark-mode.png" alt="lumitek">
    </router-link>
    <h2>{{ title }}</h2>
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
import { ref, onMounted, inject } from 'vue'
import { useDark } from "@vueuse/core"
import { getFeatures }  from '@/service/user'
import { useFeaturesStore } from '@/stores/features_store'
import router from '@/router'
import useableFeatures from '@/config/useable_features'

const isDark = useDark()
const title = inject('title')
const activeIndex = ref('')
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
  if (useableFeatures[index]) {
    setActiveMenuIndex(index)
  } else {
    router.push({ name: 'empty' })
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

h2 {
  line-height: 58px; 
  margin-left: 30px;
}
</style>