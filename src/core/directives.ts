import { toArray } from '../utils'
import type { Options } from '../types'
import { getStyleDir } from './index'

export function resolveDirectives (
  config: Options,
  name: string
): undefined | [name: string, styles?: string] {
  const { directives } = config

  if (directives[name]) {
    const [directive, styleName] = toArray(directives[name])
    const style = styleName && getStyleDir(config, styleName)

    return [directive, style]
  }
}
