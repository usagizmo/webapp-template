const base = require('eslint-preset/react.cjs')

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'import/no-unresolved': 'off',
  },
}
