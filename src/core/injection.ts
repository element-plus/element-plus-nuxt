import { libraryName } from '../config'
import type { ModuleOptions } from '../types'

/** Inject some additional configuration into Vue at runtime */
export function resolveInjection (config: ModuleOptions, autoImport?: boolean) {
  const { injectionID, injectionZIndex } = config

  return {
    filename: `${libraryName}-injection.plugin.mjs`,
    getContents: () => {
      let imports = `import { defineNuxtPlugin ${(autoImport || '') && ', ID_INJECTION_KEY, ZINDEX_INJECTION_KEY'} } from '#imports'`;
      if(!autoImport) imports = imports.concat("\nimport { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'")
      return `${imports}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp
    .provide(ID_INJECTION_KEY, ${JSON.stringify(injectionID)})
    .provide(ZINDEX_INJECTION_KEY, ${JSON.stringify(injectionZIndex)});
})
`
    }
  }
}
