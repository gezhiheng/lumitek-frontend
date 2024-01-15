<template>
  <div class="main main-background">
    <el-form :rules="rules" :model="ruleForm" ref="ruleFormRef">
      <div class="box">
        <img src="../assets/lumitek-dark-mode.png" alt="lumitek">
        <el-form-item prop="staffNo" class="staffNoInput">
          <el-input 
            class="w-50 m-2" 
            placeholder="請輸入工號" 
            v-model="ruleForm.staffNo" 
            autocomplete="new-password"
            @keydown.enter="focusPassword"
            input-style="color: white;"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <UserFilled />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="pwdInput">
          <el-input 
            type="password" 
            placeholder="請輸入密碼" 
            show-password 
            v-model="ruleForm.password" 
            autocomplete="new-password"
            ref="passwordInputRef"
            @keydown.enter="submit(ruleFormRef)"
            input-style="color: white;"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button text class="loginBtn transparent-btn" type="primary" @click="submit(ruleFormRef)">Login</el-button>
      </div>
    </el-form>
  </div>
</template>

<script  setup>
import { reactive, ref, nextTick } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import swal from 'sweetalert'
import { login }  from '@/service/user'
import router from '@/router'

const passwordInputRef = ref()
const focusPassword = () => { nextTick(() => { passwordInputRef.value.focus() }) }

const rules = reactive({
  staffNo: [
    { required: true, message: '工號不能爲空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密碼不能爲空', trigger: 'blur' }
  ]
})
const ruleForm = reactive({
  staffNo: '',
  password: ''
})
const ruleFormRef = ref()
const submit = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {   
      const data = await login({
        staffNo: ruleForm.staffNo,
        password: ruleForm.password
      }).then((resolve, reject) => {
        return {
          staffNo: resolve.data.staffNo,
          username: resolve.data.username
        }
      })
      if(data.username) {
        window.sessionStorage.setItem('username', data.username)
        window.sessionStorage.setItem('staffNo', data.staffNo)
        router.push({name: 'welcome'})
      } else {
        swal("失敗", "登錄失敗-工號或密碼錯誤", "error");
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
@import url('@/style/background.css');

* {
  margin: 0;
  padding: 0;
}

.main {
  display: grid;
  place-items: center; /* 居中元素 */
  height: 100vh; /* 设置容器的高度，以确保垂直居中占据整个视口 */
}

.box {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  box-shadow: 
    rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, 
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, 
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}

img {
  margin: 140px 0px 18px 150px;
  width: 200px;
  height: 60px;
}

.staffNoInput {
  margin-left: 50px;
  margin-bottom: 18px;
  width: 400px;
}

.pwdInput {
  margin-left: 50px;
  margin-bottom: 18px;
  width: 400px;
}

.loginBtn {
  font-display: swap;
  margin-left: 50px;
  width: 400px;
  color: #fff;
  border: 1px solid #fff;
}

:deep(.el-input__wrapper) {
  background-color: transparent !important;
  border: 1px solid #fff;
}

:deep([data-v-37dfd6fc] input:-webkit-autofill) {
  -webkit-text-fill-color: #fff;
  transition: background-color 5000s ease-out 0.5s;
}

:deep(input::-webkit-input-placeholder) {
  color: #fff;
}

:deep(input::-moz-input-placeholder) {
  color: #fff;
}

:deep(input::-ms-input-placeholder) {
  color: #fff;
}

:deep(.el-form-item--large .el-form-item__label) {
  color: #fff !important;
}

:deep(.el-input__prefix-inner) {
  color: #ffffff !important;
}
</style>