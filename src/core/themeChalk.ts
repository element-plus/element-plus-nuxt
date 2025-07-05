import type { NuxtTemplate } from '@nuxt/schema'
import { libraryName } from '../config'
import type { ModuleOptions, ScssChalk, ScssVariables, Themes } from '../types'
import { isArray, isObject, resolveComponentPath } from '../utils'

export function resolveThemeChalk (config: ModuleOptions) {
  const { themeChalk, namespace } = config
  const files: NuxtTemplate[] = []
  const common: ScssChalk = {}
  const themes: Themes[] = []

  if (!themeChalk) { return [] }

  Object.keys(themeChalk).forEach((key) => {
    if (key.startsWith('$')) {
      const _key = key as keyof ScssChalk
      common[_key] = themeChalk[_key]
    } else {
      themes.push(key as Themes)
    }
  })

  if (namespace && namespace !== 'el') {
    files.push(genNamespaceFile())
  }

  if (Object.keys(common).length) {
    files.push(genThemeChalkFile('common', common))
  }

  themes.forEach((type) => {
    const config = themeChalk[type] as ScssChalk
    if (Object.keys(config).length) {
      files.push(genThemeChalkFile(type, config))
    }
  })

  function genNamespaceFile () : NuxtTemplate {
    return {
      filename: `${libraryName}-scss-namespace.scss`,
      write: true,
      getContents: async () => {
        return `@forward '${await resolveComponentPath('theme-chalk/src/mixins/config.scss', false)}' with (
  $namespace: '${namespace}'
);`
      }
    }
  }

  function genThemeChalkFile (type: Themes | 'common', config: ScssChalk): NuxtTemplate {
    return {
      filename: `${libraryName}-scss-${type}.scss`,
      write: true,
      getContents: async () => {
        return `@forward '${await resolveComponentPath(`theme-chalk/src/${type}/var.scss`, false)}' with (
${genScssVariables(config)}
);`
      }
    }
  }

  function genScssVariables (config: ScssChalk): string {
    function genValue (value: string | string[] | ScssVariables<string, string | string[] | ScssVariables<string>>): string {
      if (isArray(value)) {
        return `(${value.join(', ')})`
      } else if (isObject(value)) {
        return `(${Object.entries(value).reduce((all, [k, v]) => {
          if (!v) { return all }
          all.push(`'${k}': ${genValue(v)}`)
          return all
        }, [] as string[]).join(', ')})`
      } else {
        return value
      }
    }

    return Object.entries(config).reduce((all, [key, value]) => {
      if (!value) { return all }
      all.push(`  ${key}: ${genValue(value)}`)
      return all
    }, [] as string[]).join(',\n')
  }

  return files
}
