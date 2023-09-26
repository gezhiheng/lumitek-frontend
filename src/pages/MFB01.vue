<template>
  <header>
    <h1 style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">MFB01-晶圓進貨資料</h1>
    <span>
      <el-switch 
        class="switch" 
        size="large" 
        style="--el-switch-on-color: #409eff; --el-switch-off-color: #dcdfe6" 
        v-model="verticalLayoutFlag" 
        inline-prompt active-text="垂直展示" 
        inactive-text="水平展示 "/>
    </span>
  </header>
  
  <div v-if="verticalLayoutFlag" class="container-vertical">
    <form-card class="form-card-vertical" :vertical-layout-flag="verticalLayoutFlag"></form-card>
    <table-card class="table-card-vertical"></table-card>
  </div>
  <div v-else  class="container-horizontal">
    <form-card class="form-card-horizontal"></form-card>
    <table-card class="table-card-horizontal"></table-card>
  </div>
  <div style="margin: 20px 12px 0 12px;">
    <el-slider v-model="value1" />
  </div>
  
</template>
<script setup>
import { ref } from 'vue';
import FormCard from '../components/mfb01/FormCard.vue'
import TableCard from '../components/mfb01/tableCard.vue'

let verticalLayoutFlag = ref(false)

</script>

<style scoped>
h1 {
  display: inline-block;
  line-height: 40px;
}

header {
  display: flex;
  justify-content: space-between;
  margin: 15px 0 15px 0;
}

.switch {
  margin-left: 10px;
}

.container-horizontal {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.form-card-horizontal {
  margin-right: 8px;
}

.table-card-horizontal {
  margin-left: 8px;
}

.container-vertical {
  
}

.form-card-vertical {
  margin-bottom: 16px;
}

.table-card-vertical {

}
</style>