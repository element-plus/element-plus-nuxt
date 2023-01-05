import { defaultInjectionID } from '../config'
import type { Options } from '../types'

/** Inject some additional configuration into Vue at runtime */
export function resolveInjection (config: Options) {
  const { injectionID = defaultInjectionID } = config

  return {
    filename: 'element-plus-injection.plugin.mjs',
    getContents: () => {
      return `import { defineNuxtPlugin } from '#app';
import { ID_INJECTION_KEY } from 'element-plus';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, ${JSON.stringify(injectionID)});
})
`
    }
  }
}
