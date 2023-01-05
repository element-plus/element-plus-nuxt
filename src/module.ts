import { addPluginTemplate, defineNuxtModule } from '@nuxt/kit'
import { defaults } from './config'
import {
  resolveComponents,
  resolveDirectives,
  resolveImports,
  resolveInjection,
  resolveOptions,
  resolveStyles,
  transformPlugin
} from './core/index'
import type { Options } from './types'

export default defineNuxtModule<Partial<Options>>({
  meta: {
    name: 'element-plus',
    configKey: 'elementPlus'
  },
  defaults,
  setup (_options, nuxt) {
    const options = _options as Options

    resolveOptions()
    addPluginTemplate(resolveInjection(options))
    nuxt.options.imports.autoImport !== false && resolveImports(options)
    nuxt.options.components !== false && resolveComponents(options)

    nuxt.hook('vite:extendConfig', (config, { isClient }) => {
      const mode = isClient ? 'client' : 'server'

      config.plugins = config.plugins || []
      config.plugins.push(transformPlugin.vite({
        include: options.include,
        exclude: options.exclude,
        sourcemap: nuxt.options.sourcemap[mode],
        transformStyles: name => resolveStyles(options, name),
        transformDirectives: name => resolveDirectives(options, name)
      }))
    })

    nuxt.hook('webpack:config', (configs) => {
      configs.forEach((config) => {
        const mode = config.name === 'client' ? 'client' : 'server'

        config.plugins = config.plugins || []
        config.plugins.push(transformPlugin.webpack({
          include: options.include,
          exclude: options.exclude,
          sourcemap: nuxt.options.sourcemap[mode],
          transformStyles: name => resolveStyles(options, name),
          transformDirectives: name => resolveDirectives(options, name)
        }))
      })
    })
  }
})
