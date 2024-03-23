import { useNuxt } from '@nuxt/kit'
import { libraryName } from '../config'

export function resolveOptions () {
  const nuxt = useNuxt()
  const optimizeDeps = nuxt.options.vite.optimizeDeps?.include ?? []

  nuxt.options.build.transpile.push(libraryName)
  if (nuxt.options.vite.optimizeDeps) {
    nuxt.options.vite.optimizeDeps.include = [...optimizeDeps, 'dayjs', 'dayjs/plugin/*']
  } else {
    nuxt.options.vite.optimizeDeps = {
      include: ['dayjs', 'dayjs/plugin/*']
    }
  }
}
