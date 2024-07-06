import { defineNuxtConfig } from 'nuxt/config'
import ElementPlus from '..'

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-07-05',
  sourcemap: true,
  modules: [ElementPlus],
  elementPlus: {
    imports: ['useLocale'],
    injectionID: { prefix: 100, current: 1 }
  }
})
