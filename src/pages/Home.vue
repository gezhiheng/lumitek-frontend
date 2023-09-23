<template>
  <el-container class="main">
    <el-header><Header></Header></el-header>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
</script>

<style src="../style/home.css" scoped></style>