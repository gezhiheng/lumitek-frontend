<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :default-openeds="defaultOpeneds">
        <el-submenu index="1">
          <template v-slot:title>
            <span>MF-製造管理</span>
          </template>
          <el-submenu index="1-1">
            <template v-slot:title>选项1</template>
            <el-menu-item index="1-1-1">选项1</el-menu-item>
            <el-menu-item index="1-1-2">选项2</el-menu-item>
            <el-menu-item index="1-1-3">选项3</el-menu-item>
            <el-menu-item index="1-1-4">选项4</el-menu-item>
            <el-menu-item index="1-1-5">选项5</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template v-slot:title>选项2</template>
            <el-menu-item index="1-2-1">选项1</el-menu-item>
            <el-menu-item index="1-2-2">选项2</el-menu-item>
            <el-menu-item index="1-2-3">选项3</el-menu-item>
            <el-menu-item index="1-2-4">选项4</el-menu-item>
            <el-menu-item index="1-2-5">选项5</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template v-slot:title>
            <span>MF-製造管理</span>
          </template>
          <el-submenu index="2-1">
            <template v-slot:title>选项1</template>
            <el-menu-item index="2-1-1">选项1</el-menu-item>
            <el-menu-item index="2-1-2">选项2</el-menu-item>
            <el-menu-item index="2-1-3">选项3</el-menu-item>
            <el-menu-item index="2-1-4">选项4</el-menu-item>
            <el-menu-item index="2-1-5">选项5</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <template v-slot:title>选项2</template>
            <el-menu-item index="2-2-1">选项1</el-menu-item>
            <el-menu-item index="2-2-2">选项2</el-menu-item>
            <el-menu-item index="2-2-3">选项3</el-menu-item>
            <el-menu-item index="2-2-4">选项4</el-menu-item>
            <el-menu-item index="2-2-5">选项5</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>


<script>
import { ref } from 'vue'
export default {
  setup() {
    let defaultOpeneds = ref(['1', '1-4'])

    function handleOpen(key, keyPath) {
      console.log(key, keyPath)
    }
    function handleClose(key, keyPath) {
      console.log(key, keyPath)
    }

    return { defaultOpeneds, handleOpen, handleClose }
  }
}
</script>

<style scoped>
* {
  width: 100%;
  overflow: scroll;
  overflow: hidden;
}
</style>