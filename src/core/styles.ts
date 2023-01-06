import { allImportsWithStyle, libraryName } from '../config'
import { hyphenate } from '../utils'
import type { Options } from '../types'

export function getStyleDir (config: Options, name: string) {
  const dir = hyphenate(name.slice(2))
  const type = config.importStyle === 'scss' ? 'index' : 'css'

  return `${libraryName}/es/components/${dir}/style/${type}`
}

export function resolveStyles (config: Options, name: string) {
  const { components, noStylesComponents } = config
  const allComponents = [...components, ...allImportsWithStyle]

  if (!allComponents.includes(name) || noStylesComponents.includes(name)) {
    return undefined
  }

  return /^El[A-Z]/.test(name) ? getStyleDir(config, name) : undefined
}
