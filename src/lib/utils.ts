export const nullToUndefined = <T>(value: T | null): T | undefined =>
  value === null ? undefined : value;

export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertPlainObject<T>(obj: T): T {
  return obj ? JSON.parse(JSON.stringify(obj)) : undefined;
}

export function intersect<T, S>(
  a: readonly T[],
  b: readonly S[],
  compareFn: (a: T, b: S) => boolean,
): T[] {
  return a.filter((x) => b.some((y) => compareFn(x, y)));
}
