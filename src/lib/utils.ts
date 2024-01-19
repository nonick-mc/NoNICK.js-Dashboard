export const nullToUndefined = <T>(value: T | null): T | undefined =>
  value === null ? undefined : value;

export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertPlainObject<T>(obj: T): T {
  return obj ? JSON.parse(JSON.stringify(obj)) : undefined;
}
