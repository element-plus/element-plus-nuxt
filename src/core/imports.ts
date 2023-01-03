import { addImportsSources } from '@nuxt/kit'
import type { ElementPlusModuleOptions, PresetImport } from '../types'

export function resolveImports (config: ElementPlusModuleOptions) {
  const defaultImports: PresetImport[] = [
    'ElLoading',
    'ElMessage',
    'ElMessageBox',
    'ElNotification'
  ]
  const imports = new Set([
    ...defaultImports,
    ...config.imports || []
  ])

  addImportsSources({
    from: 'element-plus',
    imports: [...imports]
  })
}
