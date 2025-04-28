import { libraryName } from '../config'
import type { ModuleOptions } from '../types'

/** Inject some additional configuration into Vue at runtime */
export function resolveInjection (config: ModuleOptions) {
  const { injectionID, injectionZIndex } = config

  return {
    filename: `${libraryName}-injection.plugin.mjs`,
    getContents: () => {
      return `import { defineNuxtPlugin, ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from '#imports';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp
    .provide(ID_INJECTION_KEY, ${JSON.stringify(injectionID)})
    .provide(ZINDEX_INJECTION_KEY, ${JSON.stringify(injectionZIndex)});
})
`
    }
  }
}
