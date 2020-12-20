const { tailwindConfig } = require('@nextjs-template/postcss')

module.exports = {
  presets: [tailwindConfig],
  purge: {
    layers: ['utilities'],
    content: ['./pages/**/*.html', './pages/**/*.js'],
  },
}
