<template>
  <el-row :gutter="24" class="col">
      <el-col :span="6">
        <span>客戶簡碼</span>
        <el-select v-model="value" class="tiny-input">
          <el-option 
            v-for="item in options" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"
            :disabled="item.disabled" />
        </el-select>
      </el-col>
      <el-col :span="14">
        <span>客戶訂單編號</span>
        <el-input class="mid-input" />
      </el-col>
    </el-row>
    <el-row :gutter="24" class="col">
      <el-col :span="7">
        <span>單號</span>
        <el-input class="mid-input" placeholder="系統產生" disabled />
      </el-col>
      <el-col :span="10">
        <span>製程別</span>
        <el-input class="large-input" />
      </el-col>
      <el-col :span="7">
        <span>進貨日期</span>
        <el-input class="mid-input" /><div class="grid-content ep-bg-purple" />
      </el-col>
    </el-row>
    <el-row :gutter="24" class="col">
      <el-col :span="8">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple" />
      </el-col>
    </el-row>

    <div class="col">
      <span>
        <span>單號</span>
        <el-input class="mid-input" placeholder="系統產生" disabled />
      </span>
      <span>
        <span>客戶簡碼</span>
        <el-select v-model="value" class="tiny-input">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled" />
        </el-select>
      </span>
      <span>
        <span>客戶訂單編號</span>
        <el-input class="mid-input" />
      </span>
      <span>
        <span>進貨日期</span>
        <el-input class="mid-input" />
      </span>
    </div>

    <div>
      <span>
        <span>件別</span>
        <el-radio-group v-model="radio1" style="margin: 0px 40px 0 8px;">
          <el-radio label="1" size="large" style="margin-right: 8px;">急件</el-radio>
          <el-radio label="2" size="large">一般</el-radio>
        </el-radio-group>
      </span>
      <span>
        <span>製程別</span>
        <el-input class="large-input" />
      </span>
      <span>
        <span>客戶訂單編號</span>
        <el-input class="mid-input" />
      </span>
    </div>
</template>

<script setup>

</script>