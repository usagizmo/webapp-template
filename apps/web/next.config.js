const withTM = require('next-transpile-modules')([
  'generated',
  'types',
  'utils',
])

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
})

module.exports = nextConfig
