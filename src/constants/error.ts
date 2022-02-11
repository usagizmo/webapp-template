export const ERROR = {
  REQUIRED: (name: string) => `${name} is required`,
  PATTERN: (name: string) => `${name} is invalid`,
  MIN_LENGTH: (name: string, length: number) =>
    `${name} should be at least ${length} characters`,
}
