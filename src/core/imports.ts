import { addImportsSources } from '@nuxt/kit'
import { iconLibraryName, libraryName } from '../config'
import { genIconPresets, resolvePath, toArray } from '../utils'
import type { Options } from '../types'

export async function resolveImports (config: Options) {
  const { imports, icon } = config
  const icons = icon !== false ? genIconPresets(icon) : []
  const allImports = new Set(imports)
  const allIcons = new Set(icons)

  allImports.forEach(async ([name, path]) => {
    addImportsSources({
      from: await resolvePath(`${libraryName}/${path}`),
      imports: toArray(name)
    })
  })

  addImportsSources({
    from: await resolvePath(iconLibraryName),
    imports: [...allIcons]
  })
}
