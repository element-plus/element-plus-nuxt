import { addPluginTemplate, defineNuxtModule } from '@nuxt/kit'
import { defaults, libraryName } from './config'
import {
  resolveComponents,
  resolveDirectives,
  resolveImports,
  resolveInjection,
  resolveOptions,
  resolveStyles,
  resolveTeleports,
  resolveThemes,
  transformPlugin
} from './core/index'
import type { Options } from './types'
import { localePlugin } from './core/localePlugn'

export default defineNuxtModule<Partial<Options>>({
  meta: {
    name: libraryName,
    configKey: 'elementPlus',
    compatibility: {
      nuxt: '>=3'
    }
  },
  defaults,
  async setup (_options, nuxt) {
    const options = _options as Options

    resolveOptions()
    resolveThemes(options)
    nuxt.options.imports.autoImport !== false && resolveImports(options)
    nuxt.options.components !== false && resolveComponents(options)

    if (nuxt.options.ssr !== false) {
      addPluginTemplate(await resolveInjection(options))
      addPluginTemplate(resolveTeleports(options))
    }

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

      if (options.defaultLocale && options.defaultLocale !== 'en') {
        config.plugins.push(localePlugin.vite({
          sourcemap: nuxt.options.sourcemap[mode],
          locale: options.defaultLocale
        }))
      }
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

        if (options.defaultLocale && options.defaultLocale !== 'en') {
          config.plugins.push(localePlugin.webpack({
            sourcemap: nuxt.options.sourcemap[mode],
            locale: options.defaultLocale
          }))
        }
      })
    })
  }
})
