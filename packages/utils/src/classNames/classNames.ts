export const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(' ')
