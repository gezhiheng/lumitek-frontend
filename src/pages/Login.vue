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
import router from '@/router/router'

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

<style src="@/style/login.css" scoped></style>