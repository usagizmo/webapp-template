module.exports = {
  presets: [require('tailwind-preset')],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
  ],
}
