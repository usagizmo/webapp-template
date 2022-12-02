export default {
  '*': ['cspell --no-must-find-files', 'prettier --ignore-unknown --write'],
  '*.{js,cjs,mjs,jsx,ts,tsx}': ['eslint --fix'],
  '*.svelte': ['markuplint', 'eslint --fix'],
  '*.html': ['markuplint'],
};
