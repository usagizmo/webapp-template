import { readdir, readFile } from 'node:fs/promises';

import { imageSizeFromFile } from 'image-size/fromFile';
import { dirname, join } from 'path';

/**
 * Recursively read a directory and return all the paths of the files that match the extension
 * @param {string} dirPath - The path of the directory to read
 * @param {object} [options] - The options
 * @param {string} [options.ext] - The extension to match
 * @returns {Promise<string[]>} - The paths of the files that match the extension
 */
export async function deepReaddir(dirPath, options) {
  const ext = options?.ext ?? '';
  const dirents = await readdir(dirPath, { withFileTypes: true });

  const filteredPath = (path) => (path.endsWith(ext) ? path : null);
  const paths = (
    await Promise.all(
      dirents.map(async (dirent) => {
        const path = join(dirPath, dirent.name);
        return dirent.isDirectory() ? await deepReaddir(path, options) : filteredPath(path);
      }),
    )
  ).filter(Boolean);

  return paths ? paths.flat() : [];
}

/**
 * Convert the width and height of the images in the html file
 * @param {string} filePath - The path of the html file
 * @returns {Promise<string>} - The html file with the width and height of the images
 */
export async function convert(filePath) {
  const html = await readFile(filePath, 'utf8');

  // Find all img tags that need size attributes
  const imgRegex =
    /(<img(?:(?!(?:width|height)=")[^>])+?src=")([^"]+?)("(?:(?!(?:width|height)=")[^>])+?>)/g;
  const matches = [...html.matchAll(imgRegex)];

  let result = html;

  // Process each match in reverse order to preserve indices
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const [fullMatch, prefix, imgSrcPath, suffix] = match;
    const imagePath = join(dirname(filePath), imgSrcPath);

    try {
      const { width, height } = await imageSizeFromFile(imagePath);
      const replacement = `${prefix}${imgSrcPath}" width="${width}" height="${height}${suffix}`;

      result =
        result.slice(0, match.index) + replacement + result.slice(match.index + fullMatch.length);
    } catch {
      // Keep original if image can't be processed
      continue;
    }
  }

  return result;
}
