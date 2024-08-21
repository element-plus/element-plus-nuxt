import { useNuxt } from '@nuxt/kit'
import { libraryName } from '../config'

export function resolveOptions () {
  const nuxt = useNuxt()
  // Is not an ES Module dependency
  const include = ['dayjs', 'dayjs/plugin/*.js']

  nuxt.options.build.transpile.push(libraryName)
  nuxt.options.vite.optimizeDeps ||= {}
  nuxt.options.vite.optimizeDeps.include ||= []
  nuxt.options.vite.optimizeDeps.include.push(...include)
}
