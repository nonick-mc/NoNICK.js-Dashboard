export function convertPlainObject<T>(obj: T): T {
  return obj ? JSON.parse(JSON.stringify(obj)) : undefined;
}
