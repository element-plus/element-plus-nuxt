import { defineNuxtConfig } from 'nuxt/config'
import ElementPlus from '../src/module'

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-07-05',
  modules: [ElementPlus],
  elementPlus: {
    cache: true,
    importStyle: 'scss',
    defaultLocale: 'zh-cn',
    imports: [
      ['useLocale', 'es/hooks/use-locale/index.mjs']
    ],
    themes: ['dark'],
    namespace: 'ep',
    injectionID: { prefix: 100, current: 1 },
    globalConfig: { size: 'small', zIndex: 1000, namespace: 'ep' },
    themeChalk: {
      $colors: {
        primary: { base: 'rgba(107,33,168, 1)' },
        success: { base: 'green' },
        warning: { base: '#f9a23c' },
        danger: { base: '#ff3300' },
        error: { base: '#f56c6c' }
      },
      dark: {
        $colors: {
          primary: { base: 'rgb(242, 216, 22)' }
        },
        '$bg-color': {
          page: '#0a0a0a',
          overlay: '#1d1e1f'
        }
      }
    }
  }
})
