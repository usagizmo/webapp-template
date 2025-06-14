import { base } from '@repo/eslint-config';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  ...base,
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    ...jsdoc.configs['flat/recommended-error'],
  },
];
