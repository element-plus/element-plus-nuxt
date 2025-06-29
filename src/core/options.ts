import { useNuxt } from '@nuxt/kit'
import { libraryName, optimizeDeps } from '../config'
import type { ModuleOptions } from '../types'

export function resolveOptions (config: ModuleOptions) {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push(libraryName)
  nuxt.options.vite.optimizeDeps ||= {}
  nuxt.options.vite.optimizeDeps.include ||= []
  nuxt.options.vite.optimizeDeps.include.push(...optimizeDeps)

  if (config.cache) {
    nuxt.options.vite.optimizeDeps.include.push(libraryName)
  } else {
    nuxt.options.vite.optimizeDeps.exclude ||= []
    nuxt.options.vite.optimizeDeps.exclude.push(libraryName)
  }
}
