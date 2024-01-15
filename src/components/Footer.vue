<template>
  <div class="footer">
    <div>
      <span>Lumitek 琉明光電（常州）</span>
    </div>
    <div>
      <span>Frontend</span>
      <a href="https://github.com/gezhiheng/lumitek-frontend" target="_blank">
        <svgIcon name="github"></svgIcon>
      </a>
      <span>Made by Henry.Ge</span>
    </div>
    <div>
      <span>Backend</span>
      <a href="https://gitlab.com/Litong.Qu/lumitek-backend" target="_blank">
        <svgIcon name="gitlab"></svgIcon>
      </a>
      <span>Made by Litong.Qu</span>
    </div>
    <div>
      <span>Powerd by Django & Vue & Element Plus</span>
    </div>
  </div>
</template>

<script setup>
import svgIcon from './SvgIcon.vue'

</script>

<style scoped>
.footer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; /*垂直居中*/
  justify-content: center;
  flex-direction: column;
  color: #abadb1;
}

.footer > div {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.footer > div > * {
  margin-right: 8px;
}

span {
  height: 26px;
  line-height: 26px;
}
</style>