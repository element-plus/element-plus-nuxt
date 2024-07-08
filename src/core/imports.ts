import { addImportsSources } from '@nuxt/kit'
import { iconLibraryName, libraryName } from '../config'
import { genIconPresets, resolvePath } from '../utils'
import type { Options } from '../types'

export async function resolveImports (config: Options) {
  const { imports, icon } = config
  const iconLibraryPath = await resolvePath(iconLibraryName)
  const icons = icon !== false ? genIconPresets(icon, iconLibraryPath) : []
  const allImports = new Set(imports)
  const allIcons = new Set(icons)

  addImportsSources({
    from: await resolvePath(libraryName),
    imports: [...allImports]
  })

  addImportsSources({
    from: iconLibraryPath,
    imports: [...allIcons]
  })
}
