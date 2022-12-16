/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('tailwind-preset-base')],
  content: [
    './packages/renderer/src/**/*.{html,js,svelte,ts}',
    '../../packages/ui/components/**/*.svelte', // for using 'packages/ui'
  ],
};
