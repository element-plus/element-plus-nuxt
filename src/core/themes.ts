import { useNuxt } from '@nuxt/kit'
import { libraryName } from '../config'
import { resolvePath } from '../utils'
import type { ModuleOptions } from '../types'

export function resolveThemes (config: ModuleOptions) {
  const nuxt = useNuxt()
  const { themes, importStyle } = config
  const allThemes = new Set(themes)

  if (importStyle === false) {
    return
  }

  allThemes.forEach(async (item) => {
    const isScss = importStyle === 'scss'
    const theme = await resolvePath(`${libraryName}/theme-chalk${isScss ? '/src' : ''}/${item}/css-vars.${isScss ? 'scss' : 'css'}`)

    nuxt.options.css.push(theme)
  })
}
