<template>
  <el-input 
    v-model="staffNoInput" 
    class="w-50 m-2" 
    placeholder="請輸入工號"
  >
    <template #prefix>
      <el-icon class="el-input__icon"><UserFilled /></el-icon>
    </template>
  </el-input>
  <el-input
    v-model="pwdInput"
    type="password"
    placeholder="請輸入密碼"
    show-password
  >
    <template #prefix>
      <el-icon class="el-input__icon"><Lock /></el-icon>
    </template>
  </el-input>
  <el-button type="primary">Login</el-button>
</template>

<script setup>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue';

const staffNoInput = ref('')
const pwdInput = ref('')

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>