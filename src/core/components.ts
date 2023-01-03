import { addComponent } from '@nuxt/kit'
import AllComponents from 'element-plus/es/component'
import type { Component } from 'vue'
import { isArray } from '../utils'
import type { ElementPlusModuleOptions } from '../types'

export function resolveComponent (config: ElementPlusModuleOptions) {
  const allComponents = (AllComponents as unknown as Component[])
    .map(item => item.name!)
  const components = new Set([
    ...allComponents,
    ...config.components || []
  ])

  components.forEach((item) => {
    const [name, from] = isArray(item) ? item : [item]

    addComponent({
      name,
      export: name,
      filePath: from || 'element-plus'
    })
  })
}
