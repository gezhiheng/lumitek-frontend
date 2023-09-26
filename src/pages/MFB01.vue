<template>
  <header>
    <h1>MFB01-晶圓進貨資料</h1>
    <span>
      <el-switch 
        class="switch" 
        size="large" 
        style="--el-switch-on-color: #409eff; --el-switch-off-color: #dcdfe6" 
        v-model="horizontalLayoutFlag" 
        inline-prompt active-text="水平展示" 
        inactive-text="垂直展示 "/>
    </span>
  </header>
  <div v-if="horizontalLayoutFlag" class="container-horizontal">
    <form-card class="form-card-horizontal"></form-card>
    <table-card class="table-card-horizontal"></table-card>
  </div>
  <div v-else class="container-vertical">
    <form-card class="form-card-vertical"></form-card>
    <table-card class="table-card-vertical"></table-card>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import FormCard from '../components/mfb01/formCard.vue'
import TableCard from '../components/mfb01/tableCard.vue'

let horizontalLayoutFlag = ref(true)

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