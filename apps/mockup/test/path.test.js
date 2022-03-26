import { execSync } from 'child_process'
import { readFile, access } from 'fs/promises'
import { dirname, join, basename } from 'path'
import { describe, test, expect } from '@jest/globals'
import { isValidPath, relativeUrlToFilePath } from 'pathtest-utils'
import { allowedPathList, publicDir, imageExtensions } from './config'

const findHtml = execSync(`find ${publicDir} -type f -name "*.html"`)
const htmlFilePaths = findHtml.toString().trim().split('\n')

const findImagesOption = imageExtensions
  .map((ext) => `-name "*.${ext}"`)
  .join(' -o ')
const findImages = execSync(`find ${publicDir} -type f ${findImagesOption}`)
const imageFilePaths = findImages.toString().trim().split('\n')

describe('All paths are valid:', () => {
  test.each(htmlFilePaths)(' %s', async (filePath) => {
    const text = await readFile(filePath, 'utf8')
    const allPaths = Array.from(text.matchAll(/(?:href|src)="([^"]+?)"/g)).map(
      (match) => match[1]
    )

    const baseDir = dirname(filePath)

    /** @type [string, { exists: boolean, isValid: boolean }][] */
    const pathStatuses = await Promise.all(
      allPaths.map(async (path) => {
        if (allowedPathList.some((allowedPath) => path === allowedPath)) {
          return [path, { exists: true, isValid: true }]
        }

        let exists = false
        try {
          await access(join(baseDir, relativeUrlToFilePath(path)))
          exists = true
        } catch (err) {
          console.error(err)
        }

        const isValid = isValidPath(path)
        return [path, { exists, isValid }]
      })
    )

    const invalidPathStatuses = pathStatuses
      .filter((pathStatus) => {
        const [, { exists, isValid }] = pathStatus
        return !exists || !isValid
      })
      .map((status) => (process.env.NODE_ENV === 'debug' ? status : status[0]))

    expect(invalidPathStatuses).toHaveLength(0)
  })
})

describe('All image file names are varid:', () => {
  const allowedImageExtensions = imageExtensions.join('|')

  if (imageFilePaths.length === 1 && imageFilePaths[0] === '') return

  test.each(imageFilePaths)(' %s', async (filePath) => {
    const fileName = basename(filePath)
    const regex = new RegExp(`^[0-9a-z_-]+\\.(?:${allowedImageExtensions})$`)
    const isValid = regex.test(fileName)
    expect(isValid).toBe(true)
  })
})
