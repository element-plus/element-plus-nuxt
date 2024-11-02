import { libraryName } from '../config'
import type { ModuleOptions } from '../types'

export function resolveTeleports (config: ModuleOptions) {
  const { namespace, appendTo } = config
  const defaultId = `#${namespace}-popper-container-`

  return {
    filename: `${libraryName}-teleports.plugin.mjs`,
    getContents: () => {
      return `import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:rendered', (ctx) => {
    if (ctx.ssrContext?.teleports) {
      ctx.ssrContext.teleports = renderTeleports(ctx.ssrContext.teleports)
    }
  })
})

function renderTeleports (teleports) {
  const body = Object.entries(teleports).reduce((all, [key, value]) => {
    if (key.startsWith('${defaultId}') || ${JSON.stringify(appendTo)}.includes(key)) {
      return \`\${all}<div id="\${key.slice(1)}">\${value}</div>\`
    }
    return all
  }, teleports.body || '')
  return { ...teleports, body }
}
`
    }
  }
}
