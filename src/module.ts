import { defineNuxtModule } from '@nuxt/kit'
import { resolveComponent } from './core/index'
import type { ElementPlusModuleOptions } from './types'

export default defineNuxtModule<ElementPlusModuleOptions>({
  meta: {
    name: 'nuxt-element-plus',
    configKey: 'ElementPlus'
  },
  setup (options, nuxt) {
    const config = options || nuxt.options.elementPlus

    resolveComponent(config)
  }
})
