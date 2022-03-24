const base = require('eslint-preset/base.cjs')

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'import/no-unresolved': 'off',
  },
}
