import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

import { dirname, join, relative, sep } from 'path';
import { fileURLToPath } from 'url';

import { deepReaddir } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const imagesDir = join(publicDir, 'images');
const dryRun = process.argv.includes('--dry-run') || process.argv.includes('-n');

/**
 * Run a command and return stdout.
 * @param {string} command - The command to run
 * @param {string[]} args - The command arguments
 * @returns {string} The command stdout
 */
function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || `${command} ${args.join(' ')} failed`);
  }

  return result.stdout.trim();
}

/**
 * Convert a filesystem path to a URL-style path.
 * @param {string} path - The filesystem path
 * @returns {string} The path using forward slashes
 */
function toUrlPath(path) {
  return path.split(sep).join('/');
}

/**
 * Escape a string for use in a regular expression.
 * @param {string} value - The string to escape
 * @returns {string} The escaped string
 */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Read public files that can reference assets.
 * @returns {Promise<string[]>} The text file contents
 */
async function readSearchablePublicTexts() {
  const publicPaths = await deepReaddir(publicDir);
  const searchablePaths = publicPaths.filter(
    (publicPath) => !publicPath.startsWith(`${imagesDir}${sep}`),
  );
  const texts = await Promise.all(
    searchablePaths.map(async (publicPath) => {
      try {
        return await readFile(publicPath, 'utf8');
      } catch {
        return null;
      }
    }),
  );

  return texts.filter((text) => text !== null);
}

/**
 * Check whether text references an image path.
 * @param {string} text - The text to check
 * @param {string} imagePath - The image path relative to public
 * @returns {boolean} Whether the image is referenced
 */
function textReferencesImage(text, imagePath) {
  const normalizedImagePath = imagePath.replace(/^\.\//, '');
  const escapedPath = escapeRegExp(normalizedImagePath);
  const encodedPath = escapeRegExp(encodeURI(normalizedImagePath));
  const referenceRegex = new RegExp(
    `(?:^|["'(=,\\s/])(?:\\./|/)?(?:${escapedPath}|${encodedPath})(?:$|[)"'?#,\\s])`,
  );

  return referenceRegex.test(text);
}

/**
 * Check whether an image is referenced from public files.
 * @param {string} imagePath - The image path relative to public
 * @param {string[]} publicTexts - The public text file contents
 * @returns {boolean} Whether the image is referenced
 */
function isReferenced(imagePath, publicTexts) {
  return publicTexts.some((text) => textReferencesImage(text, imagePath));
}

/**
 * Remove tracked public images that are not referenced from public files.
 * @returns {Promise<void>}
 */
async function cleanImages() {
  const stdout = run('git', ['ls-files', '--', 'public/images']);
  const imagePaths = stdout ? stdout.split('\n') : [];
  const publicTexts = await readSearchablePublicTexts();
  const unusedImagePaths = [];

  for (const imagePath of imagePaths) {
    const imagePathFromPublic = toUrlPath(relative(publicDir, join(rootDir, imagePath)));

    if (!isReferenced(imagePathFromPublic, publicTexts)) {
      unusedImagePaths.push(imagePath);
    }
  }

  if (unusedImagePaths.length === 0) {
    console.log('No unused images found.');
    return;
  }

  for (const imagePath of unusedImagePaths) {
    if (dryRun) {
      console.log(`Would remove ${imagePath}`);
      continue;
    }

    run('git', ['rm', '--quiet', '--', imagePath]);
    console.log(`Removed ${imagePath}`);
  }
}

cleanImages().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
