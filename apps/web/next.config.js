const withTM = require('next-transpile-modules')([
  'constants',
  'generated',
  'types',
  'ui',
  'utils',
])

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
})

module.exports = nextConfig
