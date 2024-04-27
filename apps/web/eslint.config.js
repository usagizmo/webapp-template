import config from '@repo/eslint-config';

export default [
  ...config,
  {
    ignores: ['.svelte-kit'],
  },
];
