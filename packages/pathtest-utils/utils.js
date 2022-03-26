// ref: https://regexper.com/#%5E%28%3F%3A%28%3F%3A%23%5B%5E%3F%23%5D*%29%7C%28%3F%3A%28%3F%3A%5C.%7C%5C.%5C.%29%5C%2F%28%3F%3A%5C.%5C.%5C%2F%29*%29%28%3F%3A%5B%5Cw%5D%5B%5E%22%5D%2B%7C%28%3F%3A%5C%3F%5B%5E%3F%23%5D%2B%29%3F%28%3F%3A%23%5B%5E%3F%23%5D*%29%3F%29%3F%29%24
const validPathPattern =
  /^(?:(?:#[^?#]*)|(?:(?:\.|\.\.)\/(?:\.\.\/)*)(?:[\w][^"]+|(?:\?[^?#]+)?(?:#[^?#]*)?)?)$/

export const isValidPath = (path) => validPathPattern.test(path)

export const relativeUrlToFilePath = (path) => {
  if (!path) return ''

  const plain = path.split('#')[0].split('?')[0]
  if (/\/$/.test(plain)) return plain + 'index.html'
  return plain
}
