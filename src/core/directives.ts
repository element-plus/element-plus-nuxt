import { libraryName } from '../config'
import { toArray } from '../utils'
import type { Options } from '../types'
import { getComponentPath, getStyleDir } from './index'

export function resolveDirectives (
  config: Options,
  name: string
): undefined | [name: string, path: string, style?: string] {
  const { directives } = config

  if (!directives[name]) { return undefined }

  const [directive, styleName] = toArray(directives[name])
  const path = getComponentPath(styleName ?? directive)
  const style = styleName && getStyleDir(config, styleName)

  return [directive, `${libraryName}/${path}`, style]
}
