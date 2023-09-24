import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { deepReaddir, convert } from './utils.js';

const PUBLIC_DIR = 'public';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');

/**
 * Process all the html files in the public directory
 * @returns {Promise<void>}
 */
async function processHtmlFiles() {
  const htmlPaths = await deepReaddir(join(rootDir, PUBLIC_DIR), { ext: '.html' });

  await Promise.all(
    htmlPaths.map(async (htmlPath) => {
      // convert the width and height of the images in the html file
      const nextHtml = await convert(htmlPath);

      try {
        await writeFile(htmlPath, nextHtml, 'utf8');
      } catch (err) {
        console.error(err);
      }
    }),
  );
}

processHtmlFiles();
