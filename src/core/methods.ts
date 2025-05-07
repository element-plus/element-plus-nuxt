import { libraryName } from '../config'
import type { ModuleOptions } from '../types'

/**
 * NOTE: Due to some situations where the value cannot be obtained when using getCurrentInstance in the setup function, it is currently not possible to automatically inject the context.
 * Now let the user configure it first, and then look for a more suitable way in the future.
 */
export function resolveMethods (config: ModuleOptions) {
  const { installMethods } = config

  return {
    filename: `${libraryName}-methods.plugin.mjs`,
    getContents: () => {
      return `import { defineNuxtPlugin, ${installMethods.join(',')} } from '#imports';

export default defineNuxtPlugin(nuxtApp => {
  ${installMethods.reduce((all, name) => `${all}.use(${name})`, 'nuxtApp.vueApp')};
})
`
    }
  }
}
