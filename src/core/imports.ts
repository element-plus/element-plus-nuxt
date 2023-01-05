import { addImportsSources } from '@nuxt/kit'
import { allImports, libraryName } from '../config'
import type { Options } from '../types'

export function resolveImports (config: Options) {
  const imports = new Set([
    ...allImports,
    ...config.imports || []
  ])

  addImportsSources({
    from: libraryName,
    imports: [...imports]
  })
}
