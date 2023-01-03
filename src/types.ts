type PresetComponent = string | [name: string, from?: string]

export type PresetImport = string | [name: string, as?: string, from?: string]

export interface ElementPlusModuleOptions {
  components?: PresetComponent[]
  imports?: PresetImport[]
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    elementPlus?: ElementPlusModuleOptions
  }
  interface NuxtOptions {
    elementPlus?: ElementPlusModuleOptions
  }
}
