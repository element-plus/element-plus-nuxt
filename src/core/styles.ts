import { allComponents, allNoStylesComponents, libraryName } from '../config'
import { hyphenate } from '../utils'
import type { ElementPlusModuleOptions } from '../types'

export function getStyleDir (config: ElementPlusModuleOptions, name: string) {
  const dir = hyphenate(name.slice(2))
  const type = config.importStyle === 'sass' ? 'index' : 'css'

  return `${libraryName}/es/components/${dir}/style/${type}`
}

export function resolveStyles (config: ElementPlusModuleOptions, name: string) {
  const noStylesComponents = new Set([
    ...allNoStylesComponents,
    ...config.noStylesComponents || []
  ])

  if (
    !allComponents.includes(name) ||
    noStylesComponents.has(name)
  ) {
    return undefined
  }

  return /^El[A-Z]/.test(name) ? getStyleDir(config, name) : undefined
}
