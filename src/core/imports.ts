import { addImportsSources } from '@nuxt/kit'
import { allMethods, iconLibraryName, libraryName } from '../config'
import { genIconPresets, resolvePath, toArray } from '../utils'
import type { ModuleOptions, PresetImport } from '../types'
import { getComponentPath } from './index'

function _resolveImports (imports: Set<PresetImport>) {
  imports.forEach(async ([name, path]) => {
    addImportsSources({
      from: await resolvePath(`${libraryName}/${path}`),
      imports: toArray(name)
    })
  })
}

export async function resolveImports (config: ModuleOptions) {
  const { imports, icon } = config
  const icons = icon !== false ? genIconPresets(icon) : []
  const allImports = new Set(imports)
  const allIcons = new Set(icons)

  _resolveImports(allImports)

  addImportsSources({
    from: await resolvePath(iconLibraryName),
    imports: [...allIcons]
  })
}

export function resolveBaseImports (config: ModuleOptions) {
  const { baseImports } = config
  const methodImports = allMethods.map((name) => {
    return [name, getComponentPath(name)] as PresetImport
  })
  const allBaseImports = new Set([...baseImports, ...methodImports])

  _resolveImports(allBaseImports)
}
