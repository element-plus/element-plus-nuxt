import { useNuxt } from '@nuxt/kit'

export function resolveOptions () {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push('element-plus/es')
}
