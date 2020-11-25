const { tailwindConfig } = require('@nextjs-template/postcss')

module.exports = {
  ...tailwindConfig,
  purge: ['./mock/pages/**/*.html', './mock/pages/**/*.js'],
}
