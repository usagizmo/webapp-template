import { execSync } from 'child_process';
import { readFile, access, writeFile } from 'fs/promises';
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

    let set = new Set<string>();
    for (const filePath of filePaths) {
      const text = await readFile(filePath, 'utf8');
      const paths = [...text.matchAll(linkRegex)].map((match) => match[1]);
      set = new Set([...set, ...paths]);
    }

    const linkPaths = [...set].sort();

    const externalLinks: string[] = [];
    for (const linkPath of linkPaths) {
      try {
        await access(join(publicDir, linkPath));
      } catch {
        externalLinks.push(linkPath);
      }
    }
    const data = externalLinks.join('\n');

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
