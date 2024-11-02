import { allImportsWithStyle, libraryName } from '../config'
import { hyphenate } from '../utils'
import type { ModuleOptions } from '../types'

export function getStyleDir (config: ModuleOptions, name: string) {
  if (config.importStyle === false) {
    return undefined
  }
  const dir = hyphenate(name.slice(2))
  const type = config.importStyle === 'scss' ? 'index' : 'css'

  return `${libraryName}/es/components/${dir}/style/${type}.mjs`
}

export function resolveStyles (config: ModuleOptions, name: string) {
  const { components, noStylesComponents } = config
  const allComponents = [...components, ...allImportsWithStyle]

  if (!allComponents.includes(name) || noStylesComponents.includes(name)) {
    return undefined
  }

  return /^El[A-Z]/.test(name) ? getStyleDir(config, name) : undefined
}
