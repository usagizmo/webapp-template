module.exports = {
  plugins: {
    tailwindcss: {},
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
