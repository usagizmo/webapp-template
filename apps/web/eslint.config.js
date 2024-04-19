import config from '@repo/eslint-config';

export default [
  ...config,
  {
    ignores: ['.svelte-kit', 'src/lib/$generated'],
  },
];
