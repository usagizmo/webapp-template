import base from '@repo/tailwind-preset-base';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [base],
  content: [
    './src/**/*.{html,js,svelte,ts}',
    '../../packages/ui/components/**/*.svelte', // for using 'packages/ui'
  ],
};
