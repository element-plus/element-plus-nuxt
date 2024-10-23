import { libraryName } from '../config'
import { resolvePath } from '../utils'
import type { Options } from '../types'

export async function resolveGlobalConfig (config: Options) {
  const { globalConfig } = config
  const libraryPath = await resolvePath(libraryName)

  return {
    filename: `${libraryName}-globalConfig.plugin.mjs`,
    getContents: () => {
      return `import { defineNuxtPlugin } from '#imports';
import { provideGlobalConfig } from '${libraryPath}';

export default defineNuxtPlugin(nuxtApp => {
  provideGlobalConfig(${JSON.stringify(globalConfig)}, nuxtApp.vueApp, true);
})
`
    }
  }
}
