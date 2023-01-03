import { defineNuxtModule } from '@nuxt/kit'
import { resolveComponent, resolveImports } from './core/index'
import type { ElementPlusModuleOptions } from './types'

export default defineNuxtModule<ElementPlusModuleOptions>({
  meta: {
    name: 'nuxt-element-plus',
    configKey: 'ElementPlus'
  },
  setup (options, nuxt) {
    const config = options || nuxt.options.elementPlus

    nuxt.options.imports.autoImport !== false && resolveImports(config)
    nuxt.options.components !== false && resolveComponent(config)
  }
})
