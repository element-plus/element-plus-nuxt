import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'
import type { NuxtOptions } from '@nuxt/schema'
import { allImportsWithStyle, libraryName } from '../config'
import {
  camelize,
  genLibraryImport,
  genSideEffectsImport,
  resolvePath,
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
  const { include, exclude, sourcemap, transformStyles, transformDirectives } = options

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
          const path = await resolvePath(libraryName)
          imports += genLibraryImport(directives, path)
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
          map: sourcemap
            ? s.generateMap({ source: id, includeContent: true })
            : undefined
        }
      }
    }
  }
})
