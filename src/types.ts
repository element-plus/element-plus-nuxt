type PresetComponent = string | [name: string, from?: string]

type PresetImport = string | [name: string, as?: string, from?: string]

export interface ModuleOptions {
  components?: PresetComponent[]
  imports?: PresetImport[]
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    elementPlus?: ModuleOptions
  }
  interface NuxtOptions {
    elementPlus?: ModuleOptions
  }
}
