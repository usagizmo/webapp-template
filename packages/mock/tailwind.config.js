const { tailwindConfig } = require('@nextjs-template/postcss')

module.exports = {
  ...tailwindConfig,
  purge: ['./pages/**/*.html', './pages/**/*.js'],
}
