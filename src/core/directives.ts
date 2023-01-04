import { allDirectives } from '../config'
import { toArray } from '../utils'
import type { ElementPlusModuleOptions } from '../types'
import { getStyleDir } from './index'

export function resolveDirectives (
  config: ElementPlusModuleOptions,
  name: string
): undefined | [name: string, styles?: string] {
  const directives = Object.assign(allDirectives, config.directives)

  if (directives[name]) {
    const [directive, styleName] = toArray(directives[name])
    const style = styleName ? getStyleDir(config, styleName) : undefined

    return [directive, style]
  }
}
