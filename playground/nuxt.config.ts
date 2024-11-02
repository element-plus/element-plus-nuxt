import { defineNuxtConfig } from 'nuxt/config'
import ElementPlus from '../src/module'

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-07-05',
  modules: [ElementPlus],
  elementPlus: {
    defaultLocale: 'zh-cn',
    imports: [
      ['useLocale', 'es/hooks/use-locale/index.mjs']
    ],
    themes: ['dark'],
    injectionID: { prefix: 100, current: 1 },
    globalConfig: { size: 'small', zIndex: 1000 }
  }
})
