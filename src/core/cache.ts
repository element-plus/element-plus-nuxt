import { libraryName } from '../config'

export function resolveCache () {
  return {
    filename: `${libraryName}-cache.mjs`,
    getContents: () => {
      return `export * from '${libraryName}';`
    }
  }
}
