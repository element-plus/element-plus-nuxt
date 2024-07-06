import { addComponent, createResolver } from '@nuxt/kit'
import { iconLibraryName, libraryName } from '../config'
import { genIconPresets, toArray, hyphenate } from '../utils'
import type { Options } from '../types'

export function resolveComponents (config: Options) {
  const { components, subComponents, icon } = config
  const { resolvePath } = createResolver(import.meta.url)
  const icons = icon !== false ? genIconPresets(icon) : []
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
    const dir = hyphenate(componentName.slice(2))
    const filePath = from !== iconLibraryName
      ? `${libraryName}/es/components/${dir}/index.mjs`
      : from

    addComponent({
      export: name,
      name: alias || name,
      filePath: await resolvePath(filePath)
    })
  })
}
