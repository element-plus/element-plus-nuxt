import { addComponent } from '@nuxt/kit'
import { iconLibraryName, libraryName } from '../config'
import { genIconPresets, toArray, resolvePath, hyphenate } from '../utils'
import type { Options } from '../types'

export function getComponentPath (name: string): string {
  const dir = hyphenate(name.slice(2))
  return `es/components/${dir}/index.mjs`
}

export function resolveComponents (config: Options) {
  const { components, subComponents, icon } = config
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
      ? `${libraryName}/${getComponentPath(componentName)}`
      : from

    addComponent({
      export: name,
      name: alias || name,
      filePath: await resolvePath(filePath)
    })
  })
}
