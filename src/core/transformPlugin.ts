import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'
import type { NuxtOptions } from '@nuxt/schema'
import { createResolver } from '@nuxt/kit'
import { allImportsWithStyle, libraryName } from '../config'
import {
  camelize,
  genLibraryImport,
  genSideEffectsImport,
  toRegExp
} from '../utils'
import type { PresetImport, TransformOptions } from '../types'

interface PluginOptions extends TransformOptions {
  sourcemap?: NuxtOptions['sourcemap']['client']
  transformStyles: (name: string) => undefined | string
  transformDirectives: (name: string) => undefined | [name: string, styles?: string]
}

const componentsRegExp = /(?<=[ (])_?resolveComponent\(\s*["'](lazy-|Lazy)?([^'"]*?)["'][\s,]*[^)]*\)/g
const directivesRegExp = /(?<=[ (])_?resolveDirective\(\s*["']([^'"]*?)["'][\s,]*[^)]*\)/g
const importsRegExp = toRegExp(allImportsWithStyle, 'g')

export const transformPlugin = createUnplugin((options: PluginOptions) => {
  const { include, exclude, transformStyles, transformDirectives } = options

  return {
    name: `${libraryName}:transform`,
    enforce: 'post',
    transformInclude (id) {
      if (exclude.some(pattern => id.match(pattern))) {
        return false
      }
      if (include.some(pattern => id.match(pattern))) {
        return true
      }
    },
    async transform (code, id) {
      const { resolvePath } = createResolver(import.meta.url)
      const styles = new Set<string>()
      const directives: PresetImport[] = []
      const s = new MagicString(code)
      let no = 0

      const addStyles = (style?: string) => {
        style && styles.add(style)
      }

      s.replace(componentsRegExp, (full, lazy, name) => {
        addStyles(transformStyles(camelize(name)))
        return full
      })

      s.replace(importsRegExp, (full, name) => {
        addStyles(transformStyles(camelize(name)))
        return full
      })

      s.replace(directivesRegExp, (full, name) => {
        const directiveConfig = transformDirectives(camelize(name))

        if (directiveConfig) {
          const [directive, styles] = directiveConfig
          const aliasName = `__el_directive_${no}`

          no += 1
          addStyles(styles)
          directives.push([directive, aliasName])
          return aliasName
        }

        return full
      })

      if (styles.size || directives.length) {
        let imports: string = ''

        if (directives.length) {
          imports += genLibraryImport(directives)
        }

        for (const name of styles) {
          const path = await resolvePath(name)
          imports += genSideEffectsImport(path)
        }

        s.prepend(imports)
      }

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
