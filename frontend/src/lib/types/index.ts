export type HasKeys<T, Keys extends PropertyKey> = Keys extends keyof T ? true : false;

export function pick<T, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}