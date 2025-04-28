import { libraryName } from '../config'
import type { ModuleOptions } from '../types'

export function resolveGlobalConfig (config: ModuleOptions) {
  const { globalConfig } = config

  return {
    filename: `${libraryName}-globalConfig.plugin.mjs`,
    getContents: () => {
      return `import { defineNuxtPlugin, provideGlobalConfig } from '#imports';

export default defineNuxtPlugin(nuxtApp => {
  provideGlobalConfig(${JSON.stringify(globalConfig)}, nuxtApp.vueApp, true);
})
`
    }
  }
}
