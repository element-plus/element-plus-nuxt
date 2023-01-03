<script setup lang="ts">
import { ID_INJECTION_KEY } from 'element-plus'

provide(ID_INJECTION_KEY, {
  prefix: 1024,
  current: 0
})
const value = ref('Nuxt module playground!')
</script>

<template>
  <section>
    <el-input v-model="value" />
    <el-button type="success">
      buttton
    </el-button>
  </section>
</template>
