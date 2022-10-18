/**
 * Extended types
 */

export type RequiredPartial<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>

export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? NestedPartial<R>[]
    : NestedPartial<T[K]>
}

type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never
}
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type XORS<T extends unknown[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
  ? XORS<[XOR<A, B>, ...Rest]>
  : never
