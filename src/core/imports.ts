import { addImportsSources } from '@nuxt/kit'
import { libraryName } from '../config'
import type { Options } from '../types'

export function resolveImports (config: Options) {
  const imports = new Set(config.imports)

  addImportsSources({
    from: libraryName,
    imports: [...imports]
  })
}
