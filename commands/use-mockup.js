import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');

/**
 * Remove a file
 * @param {string} filePath - The path of the file to remove
 */
async function removeFile(filePath) {
  const fullPath = join(projectRoot, filePath);
  try {
    await rm(fullPath, { force: true, recursive: true });
    console.log(`\x1b[32mRemoved\x1b[0m\x1b[33m ${filePath}\x1b[0m`);
  } catch (error) {
    console.error(`Error removing ${filePath}:`, error);
  }
}

/**
 * Replace a string in a file
 * @param {string} filePath - The path of the file to replace the string in
 * @param {RegExp} search - The search string
 * @param {string} replacement - The replacement string
 */
async function replaceInFile(filePath, search, replacement) {
  const fullPath = join(projectRoot, filePath);
  try {
    let content = await readFile(fullPath, 'utf8');
    content = content.replace(search, replacement);
    await writeFile(fullPath, content, 'utf8');
    console.log(`\x1b[32mReplaced\x1b[0m ${search} in\x1b[33m ${filePath}\x1b[0m`);
  } catch (error) {
    console.error(`Error replacing in ${filePath}:`, error);
  }
}

/**
 * Delete lines in a file that match a pattern
 * @param {string} filePath - The path of the file to delete lines in
 * @param {RegExp} pattern - The pattern to match
 */
async function deleteLinesInFile(filePath, pattern) {
  const fullPath = join(projectRoot, filePath);
  try {
    let content = await readFile(fullPath, 'utf8');
    const lines = content.split('\n');
    const newContent = lines.filter((line) => !pattern.test(line)).join('\n');
    await writeFile(fullPath, newContent, 'utf8');
    console.log(`\x1b[32mRemoved\x1b[0m lines matching ${pattern} in\x1b[33m ${filePath}\x1b[0m`);
  } catch (error) {
    console.error(`Error deleting lines in ${filePath}:`, error);
  }
}

/**
 * Run the script
 */
async function run() {
  // Remove files and directories
  await removeFile('.env.example');
  await removeFile('commands/init.sh');
  await removeFile('apps/backend');
  await removeFile('apps/web');

  // Modify package.json
  await replaceInFile('package.json', / && .\/commands\/init.sh/g, '');

  // Modify .prettierignore
  await deleteLinesInFile('.prettierignore', /\/apps\/backend/);
  await deleteLinesInFile('.prettierignore', /\/apps\/web/);

  // Modify cspell.json
  await deleteLinesInFile('cspell.json', /\/apps\/backend/);
  await deleteLinesInFile('cspell.json', /\/apps\/web/);

  // Modify .lintstagedrc.js
  await deleteLinesInFile('.lintstagedrc.js', /svelte/);

  // Modify .markuplintrc.cjs
  await replaceInFile(
    '.markuplintrc.cjs',
    / {2}nodeRules: \[\s*\/\/ For Svelte[\s\S]*? {2}\],/,
    '  nodeRules: [],',
  );
  await deleteLinesInFile('.markuplintrc.cjs', /svelte/i);
  await deleteLinesInFile('.markuplintrc.cjs', /\/apps\/web/);

  // Modify .gitignore
  await deleteLinesInFile('.gitignore', /svelte/);

  // Modify package.json
  await deleteLinesInFile('package.json', /svelte/);

  // Modify prettier.config.js
  await replaceInFile('prettier.config.js', `'prettier-plugin-svelte', `, '');
  await deleteLinesInFile('prettier.config.js', /svelte/);

  // Modify .vscode/extensions.json
  await deleteLinesInFile('.vscode/extensions.json', /svelte/);

  // Modify .vscode/settings.json
  await deleteLinesInFile('.vscode/settings.json', /svelte/);

  // Modify packages/eslint-config/eslint.config.js
  await replaceInFile(
    'packages/eslint-config/eslint.config.js',
    / {2}\/\/ svelte\s*{[\s\S]*?rules: {[\s\S]*?},\s*},\n/,
    '',
  );
  await replaceInFile(
    'packages/eslint-config/eslint.config.js',
    `, '**/.svelte-kit/', '**/$generated/'`,
    '',
  );
  await deleteLinesInFile('packages/eslint-config/eslint.config.js', /svelte/i);

  // Modify packages/eslint-config/package.json
  await deleteLinesInFile('packages/eslint-config/package.json', /svelte/);

  console.log('Script completed.');
}

run().catch((error) => {
  console.error('An error occurred:', error);
});
