import globals from 'globals';

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from 'eslint-config-prettier';

import svelteEslintParser from 'svelte-eslint-parser';
import tseslintParser from '@typescript-eslint/parser';

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs['flat/prettier'],
  {
    files: ['*.svelte', '**/*.svelte'],
    languageOptions: {
      parser: svelteEslintParser,
      parserOptions: {
        parser: tseslintParser,
      },
    },
  },
  eslintConfigPrettier,
];
