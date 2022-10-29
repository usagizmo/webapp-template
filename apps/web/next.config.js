const withTM = require('next-transpile-modules')([
  'generated',
  'types',
  'utils',
])

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
})

module.exports = nextConfig
