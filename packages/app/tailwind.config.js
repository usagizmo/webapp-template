const { tailwindConfig } = require('@nextjs-template/postcss')

module.exports = {
  presets: [tailwindConfig],
  purge: ['./src/**/*.tsx'],
}
