const withTM = require('next-transpile-modules')([
  'constants',
  'generated',
  'types',
  'utils',
])

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  eslint: {
    dirs: [
      'src/components',
      'src/factories',
      'src/hooks',
      'src/lib',
      'src/pages',
      'src/store',
    ],
  },
})

module.exports = nextConfig
