import { base, svelte } from '@repo/eslint-config';

export default [
  ...base,
  ...svelte,
  {
    ignores: ['.svelte-kit/**', 'dist/**'],
  },
];
