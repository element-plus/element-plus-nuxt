import { defineNuxtConfig } from 'nuxt/config'
import ElementPlus from '..'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [ElementPlus],
  elementPlus: {
    imports: ['useLocale'],
    injectionID: { prefix: 100, current: 1 }
  }
})
