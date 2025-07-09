import { base, svelte } from '@repo/eslint-config';

export default [
  ...base,
  ...svelte,
  // Direct import from Stores layer is prohibited
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
  // Direct dependency on Helpers in Components layer is prohibited
  {
    files: ['src/lib/components/**/*.svelte', 'src/routes/**/*.svelte'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['$lib/helpers/**'],
              message: 'Access Helpers layer via Stores/Composables',
            },
          ],
        },
      ],
    },
  },
];
