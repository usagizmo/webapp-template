export default {
  '*.{js,cjs,jsx,ts,tsx}': [
    'eslint --fix',
    'cspell --no-must-find-files',
    'prettier --write',
  ],
  '*.html': ['htmlhint', 'cspell --no-must-find-files', 'prettier --write'],
}
