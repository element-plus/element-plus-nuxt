import { useNuxt } from '@nuxt/kit'
import { libraryName } from '../config'

export function resolveOptions () {
  const nuxt = useNuxt()

  // nuxt.options.build.transpile.push(libraryName)

  const regExp = new RegExp(`${libraryName}/es/components/.*/style/(index|css).mjs`)
  const include = ['dayjs', 'dayjs/plugin/*.js']

  nuxt.options.build.transpile.push(regExp)
  if (nuxt.options.vite.optimizeDeps?.include?.length) {
    nuxt.options.vite.optimizeDeps.include.concat(include)
  } else if (nuxt.options.vite.optimizeDeps) {
    nuxt.options.vite.optimizeDeps.include = include
  } else {
    nuxt.options.vite.optimizeDeps = { include }
  }
}
