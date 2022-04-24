module.exports = {
  '*.{js,cjs,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{html}': ['htmlhint', 'prettier --write'],
}
