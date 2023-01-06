import { addComponent } from '@nuxt/kit'
import { libraryName } from '../config'
import { genIconPresets, toArray } from '../utils'
import type { Options } from '../types'

export function resolveComponents (config: Options) {
  const { components, icon } = config
  const icons = icon !== false ? genIconPresets(icon) : []
  const _components = [...components, ...icons]
  const allComponents = new Set(_components)

  allComponents.forEach((item) => {
    const [name, alias, from] = toArray(item)

    addComponent({
      export: name,
      name: alias || name,
      filePath: from || libraryName
    })
  })
}
