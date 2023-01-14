import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { deepReaddir, convert } from './utils.js';

const PUBLIC_DIR = 'public';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const htmlPaths = await deepReaddir(join(rootDir, PUBLIC_DIR), { ext: '.html' });

await Promise.all(
  htmlPaths.map(async (htmlPath) => {
    const nextHtml = await convert(htmlPath);

    try {
      await writeFile(htmlPath, nextHtml, 'utf8');
    } catch (err) {
      console.error(err);
    }
  })
);
