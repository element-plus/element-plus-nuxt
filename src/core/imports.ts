import { addImportsSources } from '@nuxt/kit'
import { libraryName } from '../config'
import { genIconPresets } from '../utils'
import type { Options } from '../types'

export function resolveImports (config: Options) {
  const { imports, icon } = config
  const icons = icon !== false ? genIconPresets(icon) : []
  const allImports = new Set([...imports, ...icons])

  addImportsSources({
    from: libraryName,
    imports: [...allImports]
  })
}
