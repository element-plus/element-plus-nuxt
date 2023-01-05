<script setup lang="ts">
import { ID_INJECTION_KEY } from 'element-plus'
import { $message } from './utils'

provide(ID_INJECTION_KEY, {
  prefix: 1024,
  current: 0
})
const loading = true
const value = ref('Nuxt module playground!')

const tableData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }
]

onMounted(() => {
  ElNotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success'
  })
})

function hello () {
  $message('hello world')
}
</script>

<template>
  <section>
    <el-input v-model="value" />
    <el-button type="success" @click="hello">
      buttton
    </el-button>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </section>
</template>
