import type { ElIdInjectionContext } from 'element-plus'

export type PresetComponent = string | [name: string, from?: string]

export type PresetImport = string | [name: string, as?: string, from?: string]

export type PresetDirectives = Record<string, string | [directive: string, name?: string]>

export interface TransformOptions {
  include: RegExp[]
  exclude: RegExp[]
}

export interface Options extends Partial<TransformOptions> {
  components?: PresetComponent[]
  directives?: PresetDirectives
  imports?: PresetImport[]
  importStyle?: 'css' | 'sass'
  noStylesComponents?: string[]
  injectionID?: ElIdInjectionContext
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    elementPlus?: Options
  }
  interface NuxtOptions {
    elementPlus?: Options
  }
}
