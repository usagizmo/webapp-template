import { readFile } from 'node:fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';
import { deepReaddir, convert } from '../../commands/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('@deepReaddir', async () => {
  const dirsPath = join(__dirname, 'dirs');

  it('All files', async () => {
    const expected = [
      join(dirsPath, 'dir0/dir00/00.html'),
      join(dirsPath, 'dir0/dir00/00.js'),
      join(dirsPath, 'dir1/1.html'),
      join(dirsPath, 'dir1/dir10/10.js'),
    ];

    expect(await deepReaddir(dirsPath)).toStrictEqual(expected);
  });

  it('Filtered by .html', async () => {
    const options = { ext: '.html' };
    const expected = [join(dirsPath, 'dir0/dir00/00.html'), join(dirsPath, 'dir1/1.html')];

    expect(await deepReaddir(dirsPath, options)).toStrictEqual(expected);
  });

  it('Filtered by .js', async () => {
    const options = { ext: '.js' };
    const expected = [join(dirsPath, 'dir0/dir00/00.js'), join(dirsPath, 'dir1/dir10/10.js')];

    expect(await deepReaddir(dirsPath, options)).toStrictEqual(expected);
  });
});

describe('@convert', async () => {
  it('Add image sizes', async () => {
    const inputPath = join(__dirname, 'html/input.txt');
    const expected = await readFile(join(__dirname, 'html/expected.txt'), 'utf8');

    expect(await convert(inputPath)).toBe(expected);
  });
});
