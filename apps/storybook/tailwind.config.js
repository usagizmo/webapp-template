const base = require('tailwind-config-base')

module.exports = {
  ...base,
  content: [
    '../web/src/pages/**/*.{js,ts,jsx,tsx}',
    '../web/src/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
  ],
}
