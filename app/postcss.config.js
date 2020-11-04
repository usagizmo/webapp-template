module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    },
    cssnano: process.env.NODE_ENV === 'production' ? {} : false,
  },
}
