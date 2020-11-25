const { tailwindConfig } = require('@nextjs-template/postcss')

module.exports = {
  ...tailwindConfig,
  purge: ['./src/**/*.tsx'],
}
