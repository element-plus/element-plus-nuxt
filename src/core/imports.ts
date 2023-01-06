import { addImportsSources } from '@nuxt/kit'
import { libraryName } from '../config'
import { genIconPresets } from '../utils'
import type { Options } from '../types'

export function resolveImports (config: Options) {
  const { imports, icon } = config
  const icons = icon !== false ? genIconPresets(icon) : []
  const _imports = [...imports, ...icons]
  const allImports = new Set(_imports)

  addImportsSources({
    from: libraryName,
    imports: [...allImports]
  })
}
