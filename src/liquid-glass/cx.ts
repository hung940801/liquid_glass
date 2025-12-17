export function cx(...values: Array<unknown>): string {
  const classNames: string[] = []

  for (const value of values) {
    if (!value) continue
    if (typeof value === 'string') {
      classNames.push(value)
      continue
    }
    if (Array.isArray(value)) {
      classNames.push(cx(...value))
      continue
    }
    if (typeof value === 'object') {
      for (const [key, enabled] of Object.entries(value)) {
        if (enabled) classNames.push(key)
      }
    }
  }

  return classNames.join(' ')
}

export function toDomId(value: string): string {
  return value.replace(/[^A-Za-z0-9_-]/g, '_')
}

