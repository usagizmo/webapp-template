const base = require('./next.js')

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    '@next/next/no-html-link-for-pages': 'off',
  },
}
