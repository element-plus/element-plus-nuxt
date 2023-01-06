import { useNuxt } from '@nuxt/kit'
import { libraryName } from '../config'
import type { Options } from '../types'

export function resolveThemes (config: Options) {
  const nuxt = useNuxt()
  const { themes, importStyle } = config
  const allThemes = new Set(themes)

  allThemes.forEach((item) => {
    nuxt.options.css.push(`${libraryName}/theme-chalk${importStyle === 'scss' ? '/src' : ''}/${item}/css-vars.${importStyle}`)
  })
}
