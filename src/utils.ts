import type { Component } from 'vue'
import { createResolver } from '@nuxt/kit'
import type { NuxtConfigLayer } from '@nuxt/schema'
import { allIcons, libraryName } from './config'
import type { PresetComponent } from './types'

export function resolvePath (path: string): Promise<string> {
  const { resolvePath } = createResolver(import.meta.url)
  return resolvePath(path)
}

export async function resolveComponentPath (
  path: string,
  cache: boolean | undefined
): Promise<string> {
  if (cache) {
    return `#build/${libraryName}-cache.mjs`
  }

  return await resolvePath(`${libraryName}/${path}`)
}

export function getLayersDir (layers: readonly NuxtConfigLayer[]) {
  const list = []

  for (const layer of layers) {
    const srcDir = layer.config.srcDir || layer.cwd
    if (
      srcDir.includes('node_modules') &&
      isObject(layer.config.elementPlus) &&
      layer.config.elementPlus?.importStyle !== false
    ) {
      list.push(srcDir)
    }
  }

  return list
}

export function isObject (value: any): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !isArray(value)
}

export function isFunction (value: any): value is Function {
  return typeof value === 'function'
}

export function isArray (value: any): value is any[] {
  return Array.isArray(value)
}

export function isVueComponent (value: any): value is Component {
  return (
    typeof value === 'object' &&
    value.name &&
    (value.props || value.emits || value.setup || value.render)
  )
}

export function toArray<T extends any | any[]> (
  value: T
): T extends any[] ? T : T[] {
  return (isArray(value) ? value : [value]) as any
}

export function toRegExp (arr: string[], flags?: string): RegExp {
  return new RegExp(`\\b(${arr.join('|')})\\b`, flags)
}

export async function genLibraryImport (
  [name, as, from]: Required<Exclude<PresetComponent, string>>,
  cache: boolean | undefined
): Promise<string> {
  const fromPath = await resolveComponentPath(from, cache)
  return `import { ${name} as ${as} } from '${fromPath}';\n`
}

export async function genSideEffectsImport (from: string): Promise<string> {
  const fromPath = await resolvePath(from)
  return `import '${fromPath}';\n`
}

export function genIconPresets (
  prefix: string,
  from?: string
): Exclude<PresetComponent, string>[] {
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
