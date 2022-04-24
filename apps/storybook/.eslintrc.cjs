const base = require('eslint-preset/typescript.js')

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'import/no-unresolved': 'off',
  },
}
