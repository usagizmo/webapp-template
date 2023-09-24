import { execSync } from 'child_process';
import { readFile, access, writeFile } from 'node:fs/promises';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const publicDir = join(rootDir, 'public');
const distDir = join(rootDir, 'tests');

const imageExtensions = ['jpg', 'png', 'webp'];
const linkAttrs = ['href', 'src'];
const linkRegex = new RegExp(`(?:${linkAttrs.join('|')})="([^"]+?)"`, 'g');

describe.concurrent('The tests (will be run in parallel)', () => {
  it(`Output external-links.txt`, async () => {
    let errorMessage = '';

    const res = execSync(`find ${publicDir} -type f -name "*.html"`);
    const filePaths = res.toString().trim().split('\n');

    /** @type {Set<string>} */
    const externalLinks = new Set();

    /**
     * Add the path of the external link depending on the type
     */
    const addToExternalLinks = {
      /**
       * Add the path of the external link
       * @param {string} path - The path of the external link
       */
      external(path) {
        externalLinks.add(path);
      },
      /**
       * Add the path of the external link if the file does not exist
       * @param {string} path - The path of the external link to check
       * @returns {Promise<void>}
       */
      async rootRelative(path) {
        try {
          await access(join(publicDir, path));
        } catch {
          externalLinks.add(path);
        }
      },
      /**
       * Add the path of the external link if the id does not exist
       * @param {string} path - The path of the external link to check
       * @param {string} text - The text of the html file
       */
      hash(path, text) {
        const id = path.slice(1);
        const index = text.indexOf(`id="${id}"`);
        if (index === -1) {
          externalLinks.add(path);
        }
      },
      /**
       * Add the path of the external link if the file does not exist
       * @param {string} path - The path of the external link to check
       * @param {string} filePath - The path of the html file
       * @returns {Promise<void>}
       */
      async relative(path, filePath) {
        try {
          const pathWithoutQuery = path.split('?')[0];
          await access(join(dirname(filePath), pathWithoutQuery));
        } catch {
          externalLinks.add(path);
        }
      },
    };

    for (const filePath of filePaths) {
      const text = await readFile(filePath, 'utf8');
      await Promise.all(
        [...text.matchAll(linkRegex)].map((match) => {
          const path = match[1];

          if (path.startsWith('http') || path.startsWith('//')) {
            return addToExternalLinks.external(path);
          }
          if (path.startsWith('/')) {
            return addToExternalLinks.rootRelative(path);
          }
          if (path.startsWith('#')) {
            return addToExternalLinks.hash(path, text);
          }
          return addToExternalLinks.relative(path, filePath);
        }),
      );
    }

    const data = [...externalLinks].sort().join('\n');

    let externalLinksText = '';
    try {
      externalLinksText = await readFile(join(distDir, 'external-links.txt'), 'utf8');
    } catch {
      // If external-links.txt does not exist
      try {
        await writeFile(join(distDir, 'external-links.txt'), data, 'utf8');
      } catch (err) {
        errorMessage = err.toString();
      }
      expect(errorMessage).toBe('');
      return;
    }

    expect(data).toBe(externalLinksText);
  });

  describe('All image file names are valid', async () => {
    const findImagesOption = imageExtensions.map((ext) => `-name "*.${ext}"`).join(' -o ');
    const res = execSync(`find ${publicDir} -type f ${findImagesOption}`);
    const filePaths = res.toString().trim().split('\n');

    if (filePaths.length === 1 && filePaths[0] === '') {
      return;
    }

    const fileNames = filePaths.map((filePath) => basename(filePath));
    it.each(fileNames)('%s', (fileName) => {
      const regex = new RegExp(`^[0-9a-z_-]+\\.(?:${imageExtensions.join('|')})$`);
      const isValid = regex.test(fileName);
      expect(isValid).toBe(true);
    });
  });
});
