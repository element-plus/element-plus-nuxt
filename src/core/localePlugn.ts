import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'
import type { NuxtOptions } from '@nuxt/schema'
import { libraryName } from '../config'

interface LocalePluginOptions {
  sourcemap?: NuxtOptions['sourcemap']['client']
  locale?: string
}

export const localePlugin = createUnplugin((options: LocalePluginOptions) => {
  return {
    name: `${libraryName}:locale`,
    enforce: 'pre',
    transformInclude (id) {
      return !!id.match(/es\/hooks\/use-locale\/index/) //|| !id.match(/element-plus/)
    },
    transform (code, id) {
      const s = new MagicString(code)

      s.replace('/locale/lang/en', `/locale/lang/${options.locale}`)

      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: options.sourcemap
            ? s.generateMap({ source: id, includeContent: true })
            : undefined
        }
      }
    }
  }
})
