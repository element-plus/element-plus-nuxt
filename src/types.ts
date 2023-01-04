export type PresetComponent = string | [name: string, from?: string]

export type PresetImport = string | [name: string, as?: string, from?: string]

export type PresetDirectives = Record<string, string | [directive: string, name?: string]>

export interface ElementPlusModuleOptions {
  components?: PresetComponent[]
  directives?: PresetDirectives
  imports?: PresetImport[]
  importStyle?: 'css' | 'sass'
  noStylesComponents?: string[]
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    elementPlus?: ElementPlusModuleOptions
  }
  interface NuxtOptions {
    elementPlus?: ElementPlusModuleOptions
  }
}
