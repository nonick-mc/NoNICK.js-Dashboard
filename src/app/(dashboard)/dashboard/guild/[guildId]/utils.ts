export function convertPlainObject<T>(obj: T): T {
  return obj ? JSON.parse(JSON.stringify(obj)) : undefined;
}

export function wrapValueInArray<T>(value: T | null | undefined) {
  return value ? [value] : [];
}
