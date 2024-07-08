import { useNuxt } from '@nuxt/kit'
import { libraryName } from '../config'

export function resolveOptions () {
  const nuxt = useNuxt()
  const styleRegExp = new RegExp(`${libraryName}/es/components/.*/style/(index|css).mjs`)
  const themeRegExp = new RegExp(`${libraryName}/theme-chalk/.*`)
  // Is not an ES Module dependency
  const include = ['dayjs', 'dayjs/plugin/*.js']

  nuxt.options.build.transpile.push(styleRegExp, themeRegExp)
  nuxt.options.vite.optimizeDeps ||= {}
  nuxt.options.vite.optimizeDeps.include ||= []
  nuxt.options.vite.optimizeDeps.include.push(...include)
}
