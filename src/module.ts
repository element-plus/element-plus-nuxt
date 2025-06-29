import { addPluginTemplate, addTemplate, defineNuxtModule } from '@nuxt/kit'
import { defaults, libraryName } from './config'
import {
  resolveCache,
  resolveComponents,
  resolveDirectives,
  resolveGlobalConfig,
  resolveBaseImports,
  resolveImports,
  resolveInjection,
  resolveOptions,
  resolveStyles,
  resolveTeleports,
  resolveThemes,
  resolveMethods,
  transformPlugin,
  localePlugin
} from './core/index'
import { getLayersDir } from './utils'
import type { ModuleOptions } from './types'
export type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: libraryName,
    configKey: 'elementPlus',
    compatibility: {
      nuxt: '>=3'
    }
  },
  defaults,
  setup (options, nuxt) {
    const layers = getLayersDir(nuxt.options._layers)

    resolveOptions(options)
    resolveThemes(options)
    resolveBaseImports(options)
    nuxt.options.imports.autoImport !== false && resolveImports(options)
    nuxt.options.components !== false && resolveComponents(options)
    options.cache && addTemplate(resolveCache())
    options.globalConfig && addPluginTemplate(resolveGlobalConfig(options))

    if (nuxt.options.ssr !== false) {
      addPluginTemplate(resolveInjection(options))
      addPluginTemplate(resolveTeleports(options))
      options.installMethods.length && addPluginTemplate(resolveMethods(options))
    }

    nuxt.hook('vite:extendConfig', (config, { isClient }) => {
      const mode = isClient ? 'client' : 'server'

      config.plugins = config.plugins || []
      config.plugins.push(transformPlugin.vite({
        layers,
        cache: options.cache,
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
          layers,
          cache: options.cache,
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
