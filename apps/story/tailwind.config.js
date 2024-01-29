import base from '@repo/tailwind-preset-base';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [base],
  content: [
    './stories/**/*.svelte',
    '../../apps/web/src/**/*.{html,js,svelte,ts}', // for using 'apps/web'
  ],
};
