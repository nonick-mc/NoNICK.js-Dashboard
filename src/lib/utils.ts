export const nullToUndefined = <T>(value: T | null): T | undefined =>
  value === null ? undefined : value;
