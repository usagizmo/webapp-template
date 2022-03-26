import { describe, test, expect } from '@jest/globals'
import { isValidPath, relativeUrlToFilePath } from './utils'

describe('Path validation:', () => {
  test.each([
    ['./', true],
    ['../', true],
    ['#', true],
    ['#hash', true],
    ['./#', true],
    ['./#hash', true],
    ['./?param=value', true],
    ['./index.html', true],
    ['../index.html', true],
    ['../dir/index.html', true],
    ['/', false],
    ['.//', false],
    ['..//', false],
    ['.../', false],
    ['?', false],
    ['?param=value', false],
    ['./?', false],
    ['index.html', false],
    ['.././index.html', false],
  ])('`%s` is %s', (path, expected) => {
    expect(isValidPath(path)).toBe(expected)
  })
})

describe('@relativeUrlToFilePath:', () => {
  test.each([
    ['', ''],
    ['/', '/index.html'],
    ['./', './index.html'],
    ['../', '../index.html'],
    ['index.html', 'index.html'],
    ['./index.html#hash', './index.html'],
    ['../dir/index.html?param=value', '../dir/index.html'],
    ['second.html', 'second.html'],
    ['../second.html', '../second.html'],
  ])('`%s` → `%s`', async (from, to) => {
    expect(relativeUrlToFilePath(from)).toBe(to)
  })
})
