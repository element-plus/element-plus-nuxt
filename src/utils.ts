export function isArray (value: any): value is any[] {
  return Array.isArray(value)
}

export function toArray<T extends any | any[]> (
  value: T
): T extends any[] ? T : T[] {
  return isArray(value) ? value : [value] as any
}

export function genSideEffectsImport (str: string): string {
  return `import '${str}';`
}
