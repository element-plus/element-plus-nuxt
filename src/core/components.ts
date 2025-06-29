import { addComponent } from '@nuxt/kit'
import { iconLibraryName } from '../config'
import { genIconPresets, toArray, resolvePath, hyphenate, resolveComponentPath } from '../utils'
import type { ModuleOptions } from '../types'

export function getComponentPath (name: string): string {
  const dir = hyphenate(name.slice(2))
  return `es/components/${dir}/index.mjs`
}

export function resolveComponents (config: ModuleOptions) {
  const { components, subComponents, icon, cache } = config
  const icons = icon !== false ? genIconPresets(icon, iconLibraryName) : []
  const allComponents = new Set([...components, ...icons])
  const subComponentsMap = Object.fromEntries<string>(
    Object.entries(subComponents).reduce((all, [key, values]) => {
      values.forEach((item) => {
        all.push([item, key])
      })
      return all
    }, [] as unknown as [string, any])
  )

  allComponents.forEach(async (item) => {
    const [name, alias, from] = toArray(item)
    const componentName = subComponentsMap[name] || name
    const filePath = from !== iconLibraryName
      ? await resolveComponentPath(getComponentPath(componentName), cache)
      : await resolvePath(from)

    addComponent({
      export: name,
      name: alias || name,
      filePath
    })
  })
}
