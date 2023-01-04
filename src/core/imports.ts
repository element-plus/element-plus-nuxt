import { addImportsSources } from '@nuxt/kit'
import { allImports } from '../config'
import type { ElementPlusModuleOptions } from '../types'

export function resolveImports (config: ElementPlusModuleOptions) {
  const imports = new Set([
    ...allImports,
    ...config.imports || []
  ])

  addImportsSources({
    from: 'element-plus',
    imports: [...imports]
  })
}
