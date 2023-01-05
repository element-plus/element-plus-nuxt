import { addComponent } from '@nuxt/kit'
import { allComponents, libraryName } from '../config'
import { toArray } from '../utils'
import type { Options } from '../types'

export function resolveComponents (config: Options) {
  const components = new Set([
    ...allComponents,
    ...config.components || []
  ])

  components.forEach((item) => {
    const [name, from] = toArray(item)

    addComponent({
      name,
      export: name,
      filePath: from || libraryName
    })
  })
}
