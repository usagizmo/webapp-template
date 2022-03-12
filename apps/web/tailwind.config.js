const base = require('tailwind-config-base')

module.exports = {
  ...base,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
}
