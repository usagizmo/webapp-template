export const REGEX = {
  // ref: https://regexper.com/#%5E%28%28%5B%5E%3C%3E%28%29%5B%5C%5D%5C%5C.%2C%3B%3A%5Cs%40%5C%22%5D%2B%28%5C.%5B%5E%3C%3E%28%29%5B%5C%5D%5C%5C.%2C%3B%3A%5Cs%40%5C%22%5D%2B%29*%29%7C%28%5C%22.%2B%5C%22%29%29%40%28%28%5C%5B%5B0-9%5D%7B1%2C3%7D%5C.%5B0-9%5D%7B1%2C3%7D%5C.%5B0-9%5D%7B1%2C3%7D%5C.%5B0-9%5D%7B1%2C3%7D%5C%5D%29%7C%28%28%5Ba-zA-Z%5C-0-9%5D%2B%5C.%29%2B%5Ba-zA-Z%5D%7B2%2C%7D%29%29%24
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

export const ERROR = {
  REQUIRED: (name: string) => `${name} is required`,
  PATTERN: (name: string) => `${name} is invalid`,
  MIN_LENGTH: (name: string, length: number) =>
    `${name} should be at least ${length} characters`,
}
