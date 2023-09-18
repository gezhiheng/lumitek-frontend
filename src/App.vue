<script setup>
import NavMenu from './components/NavMenu.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header> 
    <el-container> 
      <el-aside width="200px">
        <NavMenu></NavMenu>
      </el-aside> 
      <el-container>  
          <router-view>
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
  overflow: scroll;
  overflow: hidden;
}

.el-header {
  background-color: white;
  padding: 0;
  color: #333;
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
