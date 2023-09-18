<script setup>
import NavMenu from './components/NavMenu.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <el-container class="main">
    <el-header>
      <Header></Header>
    </el-header> 
    <el-container> 
      <el-aside width="200px">
        <NavMenu></NavMenu>
      </el-aside> 
      <el-container>  
          <router-view style="height: 962px;">
            router-view
          </router-view>
      </el-container>
    </el-container>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
</template>

<style>
* {
  margin: 0;
}

.main {
  max-width: 60%;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-header {
  background-color: white;
  padding: 0;
  color: #333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.el-footer {
  padding: 0;
}

.el-aside {
  color: #ffff;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body>.el-container {
  margin-bottom: 40px;
}
</style>
