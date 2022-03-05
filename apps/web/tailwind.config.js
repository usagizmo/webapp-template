module.exports = {
  presets: [require('styles/tailwind.config')],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    '../ui/components/**/*.{js,ts,jsx,tsx}', // Is this okay?
  ],
}
