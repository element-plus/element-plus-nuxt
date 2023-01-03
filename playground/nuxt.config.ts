import { defineNuxtConfig } from 'nuxt/config'
import ElementPlus from '..'

export default defineNuxtConfig({
  modules: [ElementPlus],
  build: {
    transpile: ['element-plus/es']
  }
  // elementPlus: {},
})
