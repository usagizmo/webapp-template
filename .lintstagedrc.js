export default {
  '*': ['cspell --no-must-find-files', 'prettier --write --ignore-unknown'],
  '*.html': ['markuplint'],
  '*.{js,cjs,mjs,jsx,ts,tsx}': ['eslint --fix'],
  '*.svelte': ['markuplint', 'eslint --fix'],
};
