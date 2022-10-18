/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('tailwind-preset')],
  content: [
    '../web/src/pages/**/*.{js,ts,jsx,tsx}',
    '../web/src/components/**/*.{js,ts,jsx,tsx}',
  ],
}
