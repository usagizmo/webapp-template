const purgeList =
  process.env.BUILD_TYPE === 'tailwind'
    ? ['./pinegrow/pages/**/*.html']
    : ['./src/components/**/*.tsx', './pages/**/*.tsx']

module.exports = {
  purge: process.env.NODE_ENV === 'production' ? purgeList : false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  corePlugins: {},
}
