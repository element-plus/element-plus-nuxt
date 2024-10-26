import { libraryName } from '../config'
import type { Options } from '../types'

export function resolveGlobalConfig (config: Options) {
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
