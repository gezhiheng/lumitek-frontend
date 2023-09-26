<template>
  <el-card type="border-card">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" model-value="first">
      <el-tab-pane label="總表" name="first">總表</el-tab-pane>
      <el-tab-pane label="明細" name="second">明細</el-tab-pane>
      <el-tab-pane label="附件" name="third">附件</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>

</script>