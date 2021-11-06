export const isLastIndex = (length: number, index: number): boolean => {
  return index === length - 1
}

export const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))

export const wait = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
