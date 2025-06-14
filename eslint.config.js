import { base, node } from '@repo/eslint-config';

export default [
  ...base,
  ...node,
  {
    ignores: ['apps/**', 'packages/**'],
  },
];
