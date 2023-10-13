<template>
  <div class="footer">
    <div>
      <span>Lumitek 琉明光電</span>
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
  </div>
</template>

<script setup>
import svgIcon from './SvgIcon.vue'
</script>

<style src="@/style/footer.css" scoped></style>