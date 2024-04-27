export default {
  '*': ['cspell --no-must-find-files', 'prettier --write --ignore-unknown'],
  '*.html': ['markuplint', 'prettier --write'],
  '*.css': ['prettier --write'],
  '*.{js,cjs,mjs,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.svelte': ['markuplint', 'eslint --fix', 'prettier --write'],
};
