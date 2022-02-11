/**
 * Extended types
 */

export type RequiredPartial<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>
