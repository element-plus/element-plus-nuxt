import { addComponent } from '@nuxt/kit'
import { allComponents } from '../config'
import { toArray } from '../utils'
import type { ElementPlusModuleOptions } from '../types'

export function resolveComponents (config: ElementPlusModuleOptions) {
  const components = new Set([
    ...allComponents,
    ...config.components || []
  ])

  components.forEach((item) => {
    const [name, from] = toArray(item)

    addComponent({
      name,
      export: name,
      filePath: from || 'element-plus'
    })
  })
}
