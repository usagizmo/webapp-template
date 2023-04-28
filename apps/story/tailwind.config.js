import base from 'tailwind-preset-base';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [base],
  content: [
    './stories/**/*.svelte',
    '../../apps/web/src/lib/**/*.svelte', // for using 'apps/web'
    '../../packages/ui/components/**/*.svelte', // for using 'packages/ui'
  ],
};
