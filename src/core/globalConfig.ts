import { libraryName } from '../config'
import type { ModuleOptions } from '../types'
import { camelize, resolveComponentPath } from '../utils'

export function resolveGlobalConfig (config: ModuleOptions) {
  const { globalConfig, cache, defaultLocale } = config
  const needLocale = !!(cache && defaultLocale)
  const locale = camelize(defaultLocale ?? '')
  let provideConfig = JSON.stringify(globalConfig)

  if (needLocale) {
    provideConfig = JSON.stringify(Object.assign({}, globalConfig, { locale })).replace(`"${locale}"`, locale)
  }

  return {
    filename: `${libraryName}-globalConfig.plugin.mjs`,
    getContents: async () => {
      return `import { defineNuxtPlugin, provideGlobalConfig } from '#imports';
${needLocale ? `import { ${locale} } from '${await resolveComponentPath('', cache)}';\n` : ''}
export default defineNuxtPlugin(nuxtApp => { 
  provideGlobalConfig(${provideConfig}, nuxtApp.vueApp, true);
})`
    }
  }
}
