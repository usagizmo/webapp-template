const { tailwindConfig } = require('@nextjs-template/postcss')

module.exports = {
  ...tailwindConfig,
  purge: {
    layers: ['utilities'],
    content: ['./pages/**/*.html', './pages/**/*.js'],
  },
}
