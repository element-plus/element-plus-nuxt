import { useNuxt } from '@nuxt/kit'
import { libraryName, optimizeDeps } from '../config'
import { isFunction } from '../utils'
import type { ModuleOptions, Themes } from '../types'

export function resolveOptions (config: ModuleOptions) {
  const { cache, importStyle, namespace, themeChalk } = config
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push(libraryName)
  nuxt.options.vite.optimizeDeps ||= {}
  nuxt.options.vite.optimizeDeps.include ||= []
  nuxt.options.vite.optimizeDeps.include.push(...optimizeDeps)

  if (cache) {
    nuxt.options.vite.optimizeDeps.include.push(libraryName)
  } else {
    nuxt.options.vite.optimizeDeps.exclude ||= []
    nuxt.options.vite.optimizeDeps.exclude.push(libraryName)
  }

  nuxt.options.vite.css ||= {}
  nuxt.options.vite.css.preprocessorOptions ||= {}
  nuxt.options.vite.css.preprocessorOptions.scss ||= {}
  nuxt.options.vite.css.preprocessorOptions.scss.api ??= 'modern-compiler'
  nuxt.options.webpack.loaders.scss.api ??= 'modern-compiler'

  if (importStyle === 'scss' && themeChalk) {
    const files: Array<'namespace' | 'common' | Themes> = []
    const keys = Object.keys(themeChalk) as (keyof typeof themeChalk)[]
    const themes = keys.filter((key) => {
      return !key.startsWith('$') && themeChalk[key] && Object.keys(themeChalk[key]).length
    }) as Themes[]

    if (namespace && namespace !== 'el') {
      files.push('namespace')
    }
    if (keys.some(key => key.startsWith('$'))) {
      files.push('common')
    }
    files.push(...themes)

    const additionalData = files.reduce((all, item) => {
      all += `@use "${nuxt.options.buildDir}/${libraryName}-scss-${item}.scss";`
      return all
    }, '')

    async function genAdditionalData (old: string | Function | undefined, source: string, ...arg: unknown[]) {
      const content = isFunction(old) ? await old(source, ...arg) : (old ?? '') + source
      return additionalData + content
    }

    if (additionalData) {
      const oldVite = nuxt.options.vite.css!.preprocessorOptions!.scss.additionalData
      nuxt.options.vite.css.preprocessorOptions.scss.additionalData = (source: string, ...arg: unknown[]) => {
        return genAdditionalData(oldVite, source, ...arg)
      }

      const oldWebpack = nuxt.options.webpack.loaders.scss.additionalData
      nuxt.options.webpack.loaders.scss.additionalData = (source: string, ...arg: unknown[]) => {
        return genAdditionalData(oldWebpack, source, ...arg)
      }
    }
  }
}
