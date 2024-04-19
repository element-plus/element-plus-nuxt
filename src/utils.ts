import { allIcons, iconLibraryName, libraryName } from './config'
import type { PresetImport } from './types'

export function isArray (value: any): value is any[] {
  return Array.isArray(value)
}

export function isVueComponent (value: any): boolean {
  return typeof value === 'object' && (value.name || value.props || value.emits || value.setup || value.render)
}

export function toArray<T extends any | any[]> (
  value: T
): T extends any[] ? T : T[] {
  return isArray(value) ? value : [value] as any
}

export function toRegExp (arr: string[], flags?: string): RegExp {
  return new RegExp(`\\b(${arr.join('|')})\\b`, flags)
}

export function genLibraryImport (list: PresetImport[]): string {
  const values = list.map((item) => {
    if (isArray(item)) {
      const [name, as] = item
      return `${name} as ${as}`
    }

    return item
  })

  return `import {${values.join(',')}} from '${libraryName}';`
}

export function genSideEffectsImport (value: string): string {
  return `import '${value}';`
}

export function genIconPresets (prefix: string): PresetImport[] {
  return allIcons.map((name) => {
    return [name, `${prefix}${name}`, iconLibraryName] as PresetImport
  })
}

export function camelize (value: string): string {
  return value.replace(/(^|-)(\w)/g, (a, b, c) => c.toUpperCase())
}

export function hyphenate (value: string): string {
  return value.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}
