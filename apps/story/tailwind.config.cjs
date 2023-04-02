/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('tailwind-preset-base')],
  content: [
    './stories/**/*.svelte',
    '../../apps/web/lib/**/*.svelte', // for using 'apps/web'
    '../../packages/ui/components/**/*.svelte', // for using 'packages/ui'
  ],
};
