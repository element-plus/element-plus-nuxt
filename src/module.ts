import { defineNuxtModule } from '@nuxt/kit'
import {
  resolveComponents,
  resolveDirectives,
  resolveImports,
  resolveOptions,
  resolveStyles,
  transformPlugin
} from './core/index'
import type { Options } from './types'

export default defineNuxtModule<Options>({
  meta: {
    name: 'element-plus',
    configKey: 'ElementPlus'
  },
  setup (options, nuxt) {
    const config = options || nuxt.options.elementPlus

    resolveOptions()
    nuxt.options.imports.autoImport !== false && resolveImports(config)
    nuxt.options.components !== false && resolveComponents(config)

    nuxt.hook('vite:extendConfig', (configs, { isClient }) => {
      const mode = isClient ? 'client' : 'server'

      configs.plugins = configs.plugins || []
      configs.plugins.push(transformPlugin.vite({
        include: config.include,
        exclude: config.exclude,
        sourcemap: nuxt.options.sourcemap[mode],
        transformStyles: name => resolveStyles(config, name),
        transformDirectives: name => resolveDirectives(config, name)
      }))
    })

    nuxt.hook('webpack:config', (configs) => {
      configs.forEach((config) => {
        const mode = config.name === 'client' ? 'client' : 'server'

        config.plugins = config.plugins || []
        config.plugins.push(transformPlugin.webpack({
          include: config.include,
          exclude: config.exclude,
          sourcemap: nuxt.options.sourcemap[mode],
          transformStyles: name => resolveStyles(config, name),
          transformDirectives: name => resolveDirectives(config, name)
        }))
      })
    })
  }
})
