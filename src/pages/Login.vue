<template>
  <div class="main">
    <el-form :rules="rules" :model="ruleForm" ref="ruleFormRef">
      <div class="box" style="box-shadow: var(--el-box-shadow-dark);">
        <img src="../assets/lumitek.jpg" alt="lumitek">
        <el-form-item prop="staffNo" class="staffNoInput">
          <el-input class="w-50 m-2" placeholder="請輸入工號" v-model="ruleForm.staffNo" autocapitalize="off">
            <template #prefix>
              <el-icon class="el-input__icon">
                <UserFilled />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="pwdInput">
          <el-input type="password" placeholder="請輸入密碼" show-password v-model="ruleForm.password" autocapitalize="off">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button class="loginBtn" type="primary" @click="submit(ruleFormRef)">Login</el-button>
      </div>
    </el-form>
  </div>
</template>

<script  setup>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import swal from 'sweetalert'
import { login }  from '../service/user'
import router from '../router/router'

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
        router.push({name: 'mfb01'})
      } else {
        swal("登錄失敗", "工號或密碼錯誤", "error");
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style src="../style/login.css" scoped></style>