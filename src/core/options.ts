import { useNuxt } from '@nuxt/kit'
import { libraryName, optimizeDeps } from '../config'
import type { ModuleOptions, Themes } from '../types'
import { isFunction } from '../utils'

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
    const keys = Object.keys(themeChalk)
    const files: Array<'namespace' | 'common' | Themes> = []

    if (namespace && namespace !== 'el') {
      files.push('namespace')
    }
    if (keys.some(key => key.startsWith('$'))) {
      files.push('common')
    }
    files.push(...keys.filter(key => !key.startsWith('$')) as Themes[])

    const additionalData = files.reduce((all, item) => {
      all += `@use "${nuxt.options.buildDir}/${libraryName}-scss-${item}.scss";`
      return all
    }, '')

    async function genAdditionalData (old: string | Function | undefined, source: string, ...arg: unknown[]) {
      const res = isFunction(old) ? await old(source, ...arg) : (old ?? '') + source
      return additionalData + res
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
