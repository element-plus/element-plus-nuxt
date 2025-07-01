import { libraryName } from '../config'
import type { ModuleOptions } from '../types'
import { camelize } from '../utils'

export function resolveCache (config: ModuleOptions) {
  const { defaultLocale } = config
  const locale = camelize(defaultLocale ?? '')

  return {
    filename: `${libraryName}-cache.mjs`,
    getContents: () => {
      return `export * from '${libraryName}';
${defaultLocale
  ? `import ${locale} from '${libraryName}/es/locale/lang/${defaultLocale}.mjs';
export { ${locale} };`
  : ''}`
    }
  }
}
