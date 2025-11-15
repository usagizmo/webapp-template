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
              group: ['$lib/helpers/**', '@repo/shared/helpers/**'],
              message: 'Access Helpers layer via Stores/LocalStores',
            },
          ],
        },
      ],
    },
  },
  // Helpers and Utility layers cannot depend on Stores layer
  {
    files: ['src/lib/helpers/**/*.ts', 'src/lib/utility/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['$lib/stores', '$lib/stores/**'],
              message: 'Pass values as arguments to keep Helpers/Utility pure functions',
            },
          ],
        },
      ],
    },
  },
];
