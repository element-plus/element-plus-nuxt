import { libraryName } from '../config'
import { resolvePath } from '../utils'
import type { Options } from '../types'

/** Inject some additional configuration into Vue at runtime */
export async function resolveInjection (config: Options) {
  const { injectionID, injectionZIndex } = config
  const libraryPath = await resolvePath(libraryName)

  return {
    filename: `${libraryName}-injection.plugin.mjs`,
    getContents: () => {
      return `import { defineNuxtPlugin } from '#imports';
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from '${libraryPath}';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp
    .provide(ID_INJECTION_KEY, ${JSON.stringify(injectionID)})
    .provide(ZINDEX_INJECTION_KEY, ${JSON.stringify(injectionZIndex)});
})
`
    }
  }
}
