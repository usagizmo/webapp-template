import { readdir, readFile } from 'node:fs/promises';
import { join, dirname } from 'path';
import sizeOf from 'image-size';

export const deepReaddir = async (dirPath, options) => {
  const ext = options?.ext ?? '';
  const dirents = await readdir(dirPath, { withFileTypes: true });

  const filteredPath = (path) => (path.endsWith(ext) ? path : null);
  const paths = (
    await Promise.all(
      dirents.map(async (dirent) => {
        const path = join(dirPath, dirent.name);
        return dirent.isDirectory() ? await deepReaddir(path, options) : filteredPath(path);
      })
    )
  ).filter(Boolean);

  return paths ? paths.flat() : [];
};

export const convert = async (filePath) => {
  const html = await readFile(filePath, 'utf8');

  const res = html.replace(
    /(<img(?:(?!(?:width|height)=")[^>])+?src=")([^"]+?)("(?:(?!(?:width|height)=")[^>])+?>)/g,
    (_, prefix, imgSrcPath, suffix) => {
      const imagePath = join(dirname(filePath), imgSrcPath);

      try {
        const { width, height } = sizeOf(imagePath);
        return `${prefix}${imgSrcPath}" width="${width}" height="${height}${suffix}`;
      } catch {
        return prefix + imgSrcPath + suffix;
      }
    }
  );

  return res;
};
