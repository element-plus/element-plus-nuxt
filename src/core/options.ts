import { useNuxt } from '@nuxt/kit'
import { libraryName, optimizeDeps } from '../config'

export function resolveOptions () {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push(libraryName)
  nuxt.options.vite.optimizeDeps ||= {}
  nuxt.options.vite.optimizeDeps.include ||= []
  nuxt.options.vite.optimizeDeps.include.push(...optimizeDeps)
}
