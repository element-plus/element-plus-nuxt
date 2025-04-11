import { libraryName } from '../config'

export function resolveMethods () {
  return {
    filename: `${libraryName}-methods.plugin.mjs`,
    getContents: () => {
      return `
import { defineNuxtPlugin, useState } from '#imports'

function camelize(value) {
  return value.replace(/(^|-)(\\w)/g, (a, b, c) => c.toUpperCase())
}

const allImportsWithStyle = [
  'ElLoading',
  'ElMessage',
  'ElMessageBox',
  'ElNotification',
]

export default defineNuxtPlugin((nuxtApp) => {
  const methodComps = useState('element-plus', () => [])

  nuxtApp.hook('app:rendered', (ctx) => {
    const allComps = [
      ...(ctx.renderResult?.renderStyles()?.matchAll(/el-\\w+\\.css/g) ?? []),
    ].flatMap(([comp]) => comp)
    methodComps.value = [...new Set(allComps)]
      .map((comp) => camelize(comp.substring(0, comp.length - 4)))
      .filter((comp) => allImportsWithStyle.includes(comp))
  })

  nuxtApp.hook('app:beforeMount', async (app) => {
    const plugins = await import('element-plus').then((lib) =>
      methodComps.value.map((comp) => lib[comp]),
    )
    for (const plug of plugins) app.use(plug)
  })
})
`
    }
  }
}
