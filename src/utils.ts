import { readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Component } from 'vue'
import { createResolver, resolveModule } from '@nuxt/kit'
import type { NuxtConfigLayer } from '@nuxt/schema'
import { allIcons, libraryName, optimizeDeps } from './config'
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

/**
 * `dayjs` and `lodash-unified` are CommonJS dependencies of element-plus. They have to be pre-bundled.
 * Vite's nested `parent > dep` syntax resolves them relative to element-plus instead.
 */
export function resolveOptimizeDeps (rootDir: string): string[] {
  let elementPlusEntry: string

  try {
    elementPlusEntry = resolveModule(libraryName, {
      url: pathToFileURL(join(rootDir, 'package.json'))
    })
  } catch {
    return optimizeDeps
  }

  const elementPlusRequire = createRequire(elementPlusEntry)
  const withParent = (dep: string) => `${libraryName} > ${dep}`

  const deps = optimizeDeps
    .filter(dep => !dep.includes('*'))
    .map(dep => withParent(dep))

  for (const glob of optimizeDeps.filter(dep => dep.includes('*'))) {
    deps.push(...expandGlob(elementPlusRequire, glob).map(withParent))
  }

  return deps
}

function expandGlob (require: NodeJS.Require, glob: string): string[] {
  const slashIndex = glob.indexOf('/')
  const pattern = glob.slice(slashIndex + 1)
  const patternSlash = pattern.lastIndexOf('/')

  if (slashIndex < 0 || patternSlash < 0) {
    return []
  }

  const packageName = glob.slice(0, slashIndex)
  const dir = pattern.slice(0, patternSlash)
  const extension = pattern.slice(patternSlash + 1).replace('*', '')

  let packageDir: string
  try {
    packageDir = dirname(require.resolve(packageName))
  } catch {
    return []
  }

  try {
    return readdirSync(join(packageDir, dir))
      .filter(file => file.endsWith(extension))
      .map(file => `${packageName}/${dir}/${file}`)
  } catch {
    return []
  }
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
