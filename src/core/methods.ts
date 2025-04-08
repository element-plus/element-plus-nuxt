import { libraryName } from '../config'

export function resolveMethods () {
  return {
    filename: `${libraryName}-methods.plugin.mjs`,
    getContents: () => {
      return `import { defineNuxtPlugin, ElMessage, ElMessageBox, ElNotification, ElLoading } from '#imports';

export default defineNuxtPlugin(nuxtApp => {
  for (const m of [ElMessage, ElMessageBox, ElNotification, ElLoading])
    nuxtApp.vueApp.use(m)
})
`
    }
  }
}
