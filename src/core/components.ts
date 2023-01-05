import { addComponent } from '@nuxt/kit'
import { libraryName } from '../config'
import { toArray } from '../utils'
import type { Options } from '../types'

export function resolveComponents (config: Options) {
  const components = new Set(config.components)

  components.forEach((item) => {
    const [name, alias, from] = toArray(item)

    addComponent({
      name,
      export: alias || name,
      filePath: from || libraryName
    })
  })
}
