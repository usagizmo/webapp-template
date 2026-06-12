import { access, readdir, readFile, writeFile } from 'node:fs/promises';

import { describe, expect, it } from 'bun:test';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const publicDir = join(rootDir, 'public'); // The root directory
const targetDir = join(rootDir, 'public'); // The directory to be tested
const distDir = join(rootDir, 'tests'); // The directory to output the test results

const imageExtensions = ['jpg', 'png', 'webp'];
const linkAttrs = ['href', 'src'];
const linkRegex = new RegExp(`(?:${linkAttrs.join('|')})="([^"]+?)"`, 'g');
const updateSnapshots = process.argv.includes('-u') || process.argv.includes('--update-snapshots');

/**
 * Recursively read a directory and return paths for files that match the predicate.
 * @param {string} dirPath - The directory path
 * @param {(filePath: string) => boolean} predicate - The file filter
 * @returns {Promise<string[]>} The matching file paths
 */
async function findFiles(dirPath, predicate) {
  const dirents = await readdir(dirPath, { withFileTypes: true });
  const paths = await Promise.all(
    dirents.map(async (dirent) => {
      const path = join(dirPath, dirent.name);
      return dirent.isDirectory()
        ? await findFiles(path, predicate)
        : predicate(path)
          ? path
          : null;
    }),
  );

  return paths.flat().filter((path) => path !== null);
}

describe('The tests', () => {
  it(`Output external-links.txt`, async () => {
    const filePaths = await findFiles(targetDir, (filePath) => filePath.endsWith('.html'));

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

    let externalLinksText;
    if (updateSnapshots) {
      await writeFile(join(distDir, 'external-links.txt'), data, 'utf8');
      return;
    }

    try {
      externalLinksText = await readFile(join(distDir, 'external-links.txt'), 'utf8');
    } catch {
      throw new Error('Missing tests/external-links.txt. Run `bun test:update` to create it.');
    }

    expect(data).toBe(externalLinksText);
  });

  describe('All image file names are valid', async () => {
    const filePaths = await findFiles(targetDir, (filePath) =>
      imageExtensions.some((ext) => filePath.endsWith(`.${ext}`)),
    );

    if (filePaths.length === 0) {
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
