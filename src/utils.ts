import type { Component } from 'vue'
import { createResolver } from '@nuxt/kit'
import { allIcons } from './config'
import type { PresetComponent } from './types'

export function resolvePath (path: string): Promise<string> {
  const { resolvePath } = createResolver(import.meta.url)
  return resolvePath(path)
}

export function isArray (value: any): value is any[] {
  return Array.isArray(value)
}

export function isVueComponent (value: any): value is Component {
  return typeof value === 'object' && value.name && (value.props || value.emits || value.setup || value.render)
}

export function toArray<T extends any | any[]> (
  value: T
): T extends any[] ? T : T[] {
  return (isArray(value) ? value : [value]) as any
}

export function toRegExp (arr: string[], flags?: string): RegExp {
  return new RegExp(`\\b(${arr.join('|')})\\b`, flags)
}

export async function genLibraryImport ([name, as, from]: Required<Exclude<PresetComponent, string>>): Promise<string> {
  const fromPath = await resolvePath(from)
  return `import { ${name} as ${as} } from '${fromPath}';\n`
}

export async function genSideEffectsImport (from: string): Promise<string> {
  const fromPath = await resolvePath(from)
  return `import '${fromPath}';\n`
}

export function genIconPresets (prefix: string, from?: string): Exclude<PresetComponent, string>[] {
  return allIcons.map((name) => {
    return [name, `${prefix}${name}`, from] as Exclude<PresetComponent, string>
  })
}

export function camelize (value: string): string {
  return value.replace(/(^|-)(\w)/g, (a, b, c) => c.toUpperCase())
}

export function hyphenate (value: string): string {
  return value.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}
