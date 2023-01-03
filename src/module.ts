import { defineNuxtModule } from '@nuxt/kit'
import { resolveComponent, resolveImports, resolveOptions, transformPlugin } from './core/index'
import type { ElementPlusModuleOptions } from './types'

export default defineNuxtModule<ElementPlusModuleOptions>({
  meta: {
    name: 'nuxt-element-plus',
    configKey: 'ElementPlus'
  },
  setup (options, nuxt) {
    const config = options || nuxt.options.elementPlus

    resolveOptions()
    nuxt.options.imports.autoImport !== false && resolveImports(config)
    nuxt.options.components !== false && resolveComponent(config)

    nuxt.hook('vite:extendConfig', (config, { isClient }) => {
      const mode = isClient ? 'client' : 'server'

      config.plugins = config.plugins || []
      config.plugins.push(transformPlugin.vite({
        sourcemap: nuxt.options.sourcemap[mode],
        transformStyles: undefined // TODO:
      }))
    })

    nuxt.hook('webpack:config', (configs) => {
      configs.forEach((config) => {
        const mode = config.name === 'client' ? 'client' : 'server'

        config.plugins = config.plugins || []
        config.plugins.push(transformPlugin.webpack({
          sourcemap: nuxt.options.sourcemap[mode],
          transformStyles: undefined // TODO:
        }))
      })
    })
  }
})
