<template>
  <el-container class="main">
    <el-header><Header></Header></el-header>
    <el-container>
      <el-aside width="200px"><NavMenu></NavMenu></el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script setup>
import NavMenu from './components/NavMenu.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
console.log('router',router.currentRoute.value.fullpath);
</script>

<style src="../src/style/app.css"></style>