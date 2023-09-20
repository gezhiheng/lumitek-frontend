<script setup>
import NavMenu from './components/NavMenu.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue';
</script>

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

<style>
* {
  margin: 0;
  padding: 0;
  /* background-color: #e9eef3; */
}

.main {
  width: 70%;
  margin: 0 auto;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}

.el-header {
  background-color: white;
  padding: 0;
  color: #333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.el-footer {
  padding: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

}

.el-aside {
  height: 100vh;
  width: 220px;
}

</style>
