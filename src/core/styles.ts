import { allComponents, allNoStylesComponents } from '../config'
import { hyphenate } from '../utils'
import type { ElementPlusModuleOptions } from '../types'

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

  if (/^El[A-Z]/.test(name)) {
    const dir = hyphenate(name.slice(2))
    const type = config.importStyle === 'sass' ? 'index' : 'css'

    return `element-plus/es/components/${dir}/style/${type}`
  }
}
