<template>
  <div :class="{ 'container-horizontal': !settings.verticalMode.isEnabled }">
    <FormCard
      :class="{
        'form-card-horizontal': !settings.verticalMode.isEnabled, 
        'form-card-vertical': settings.verticalMode.isEnabled 
      }"
    ></FormCard>
    <TableCard
      :class="{
        'table-card-horizontal': !settings.verticalMode.isEnabled, 
        'table-card-vertical': settings.verticalMode.isEnabled
      }"
    ></TableCard>
  </div>
  <div style="display: flex; align-items: center; margin: 20px 0 50px 0;">
    <suspense>
      <el-slider
        style="padding: 0 12px;"
      />
    </suspense>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import FormCard from '@/components/mfb/mfb02/FormCard.vue'
import TableCard from '@/components/mfb/mfb02/TableCard.vue'
import { useSettingsStore } from '@/stores/settings_store'

const { settings } = useSettingsStore()
</script>

<style scoped>
.container-horizontal {
  margin-top: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.form-card-horizontal {
  margin: 0 10px 0 12px;
}

.table-card-horizontal {
  margin: 0 10px 0 12px;
}

.form-card-vertical {
  margin: 10px 10px 16px 10px;
}

.table-card-vertical {
  margin: 0 8px;
}
</style>