import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'
import { findStaticImports, parseStaticImport } from 'mlly'
import type { NuxtOptions } from '@nuxt/schema'
import { allMethods, libraryName } from '../config'
import {
  camelize,
  genLibraryImport,
  genSideEffectsImport,
  toRegExp
} from '../utils'
import type { PresetComponent, TransformOptions } from '../types'

interface PluginOptions extends TransformOptions {
  layers: string[];
  cache: boolean | undefined;
  sourcemap?: NuxtOptions['sourcemap']['client'];
  transformStyles: (name: string) => undefined | string;
  transformDirectives: (
    name: string,
  ) => undefined | [name: string, path: string, style?: string];
}

const componentsRegExp =
  /(?<=[ (])_?resolveComponent\(\s*["'](lazy-|Lazy)?([^'"]*?)["'][\s,]*[^)]*\)/g
const lazyComponentsRegExp =
  /\/virtual:nuxt-component:(?:lazy(?:-[A-Za-z]+)?|client|server):([A-Za-z0-9_$]+):/
const directivesRegExp =
  /(?<=[ (])_?resolveDirective\(\s*["']([^'"]*?)["'][\s,]*[^)]*\)/g
const methodsRegExp = toRegExp(allMethods, 'g')

function collectComponentNames (code: string): Set<string> {
  const names = new Set<string>()

  if (code.includes(libraryName) || code.includes('virtual:nuxt-component:')) {
    const imports = findStaticImports(code)

    for (const statement of imports) {
      if (statement.specifier.includes('virtual:nuxt-component:')) {
        const match = lazyComponentsRegExp.exec(statement.specifier)
        if (match && match[1]) {
          names.add(match[1])
        }
        continue
      }

      if (!statement.specifier.includes(libraryName)) {
        continue
      }

      const { namedImports } = parseStaticImport(statement)

      if (namedImports) {
        for (const name of Object.keys(namedImports)) {
          names.add(name)
        }
      }
    }
  }

  return names
}

export const transformPlugin = createUnplugin((options: PluginOptions) => {
  const {
    cache,
    layers,
    include,
    exclude,
    sourcemap,
    transformStyles,
    transformDirectives
  } = options

  return {
    name: `${libraryName}:transform`,
    enforce: 'post',
    transformInclude (id) {
      if (layers.some(layer => id.startsWith(layer))) {
        return true
      }
      if (exclude.some(pattern => id.match(pattern))) {
        return false
      }
      if (include.some(pattern => id.match(pattern))) {
        return true
      }
    },
    async transform (code, id) {
      const styles = new Set<string>()
      const directives: Required<Exclude<PresetComponent, string>>[] = []
      const s = new MagicString(code)
      let no = 0

      const addStyles = (style?: string) => {
        style && styles.add(style)
      }

      collectComponentNames(code).forEach((name) => {
        addStyles(transformStyles(camelize(name)))
      })

      s.replace(componentsRegExp, (full, lazy, name) => {
        addStyles(transformStyles(camelize(name)))
        return full
      })

      s.replace(methodsRegExp, (full, name) => {
        addStyles(transformStyles(camelize(name)))
        return full
      })

      s.replace(directivesRegExp, (full, name) => {
        const directiveConfig = transformDirectives(camelize(name))

        if (directiveConfig) {
          const [directive, path, style] = directiveConfig
          const aliasName = `__el_directive_${no}`

          no += 1
          addStyles(style)
          directives.push([directive, aliasName, path])
          return aliasName
        }

        return full
      })

      if (styles.size || directives.length) {
        let imports: string = ''

        for (const directive of directives) {
          imports += await genLibraryImport(directive, cache)
        }

        for (const style of styles) {
          imports += await genSideEffectsImport(style)
        }

        s.prepend(imports)
      }

      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: sourcemap
            ? s.generateMap({ source: id, includeContent: true, hires: true })
            : undefined
        }
      }
    }
  }
})
