import { libraryName } from '../config'
import type { ModuleOptions } from '../types'

export function resolveGlobalConfig (config: ModuleOptions, autoImport?: boolean) {
  const { globalConfig } = config

  return {
    filename: `${libraryName}-globalConfig.plugin.mjs`,
    getContents: () => {
      let imports = `import { defineNuxtPlugin ${(autoImport || '') && ', provideGlobalConfig'} } from '#imports'`;
      if(!autoImport) imports = imports.concat("\nimport { provideGlobalConfig } from 'element-plus'")

      return `${imports}
export default defineNuxtPlugin(nuxtApp => {
  provideGlobalConfig(${JSON.stringify(globalConfig)}, nuxtApp.vueApp, true);
})
`
    }
  }
}
