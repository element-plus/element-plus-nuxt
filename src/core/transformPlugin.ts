import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'
import { genSideEffectsImport, toArray } from '../utils'

interface TransformOptions {
  sourcemap?: boolean
  transformStyles?: (name: string) => undefined | string | string[]
}

const componentsRegExp = /(?<=[ (])_?resolveComponent\(\s*["'](lazy-|Lazy)?([^'"]*?)["'][\s,]*[^)]*\)/g

export const transformPlugin = createUnplugin((options: TransformOptions) => {
  const { transformStyles } = options

  return {
    name: 'nuxt-element-plus:transform',
    enforce: 'post',
    transform (code, id) {
      const imports = new Set<string>()
      const s = new MagicString(code)

      transformStyles && s.replace(componentsRegExp, (full, lazy, name) => {
        const styles = transformStyles(name)

        styles && toArray(styles).forEach((item) => {
          imports.add(genSideEffectsImport(item))
        })

        return full
      })

      if (imports.size) {
        s.prepend([...imports, ''].join('\n'))
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
