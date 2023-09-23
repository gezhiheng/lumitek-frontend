<template>
  <div class="main">
    <div class="box" style="box-shadow: var(--el-box-shadow-dark);">
      <img src="../assets/lumitek.jpg" alt="lumitek">
      <el-input v-model="staffNoInput" class="w-50 m-2 staffNoInput" placeholder="請輸入工號">
        <template #prefix>
          <el-icon class="el-input__icon">
            <UserFilled />
          </el-icon>
        </template>
      </el-input>
      <el-input v-model="pwdInput" class="pwdInput" type="password" placeholder="請輸入密碼" show-password>
        <template #prefix>
          <el-icon class="el-input__icon">
            <Lock />
          </el-icon>
        </template>
      </el-input>
      <el-button class="loginBtn" type="primary">Login</el-button>
    </div>
  </div>
</template>

<script setup>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue';

const staffNoInput = ref('')
const pwdInput = ref('')

</script>

<style src="../style/login.css" scoped></style>