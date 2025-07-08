import { base, svelte } from '@repo/eslint-config';

export default [
  ...base,
  ...svelte,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['$lib/stores/*', '!$lib/stores/index.ts'],
              message: 'Import from `$lib/stores`',
            },
          ],
        },
      ],
    },
  },
];
