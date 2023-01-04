export function isArray (value: any): value is any[] {
  return Array.isArray(value)
}

export function toArray<T extends any | any[]> (
  value: T
): T extends any[] ? T : T[] {
  return isArray(value) ? value : [value] as any
}

export function genSideEffectsImport (value: string): string {
  return `import '${value}';`
}

export function camelize (value: string): string {
  return value.replace(/(^|-)(\w)/g, (a, b, c) => c.toUpperCase())
}

export function hyphenate (value: string): string {
  return value.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}
