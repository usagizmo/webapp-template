module.exports = {
  '*.{js,cjs,jsx,ts,tsx}': ['eslint --fix', 'cspell', 'prettier --write'],
  '*.html': ['htmlhint', 'cspell', 'prettier --write'],
}
