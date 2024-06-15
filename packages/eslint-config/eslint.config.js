import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteEslintParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  ...eslintPluginSvelte.configs['flat/prettier'],
  // simple-import-sort
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  // jsdoc
  {
    files: ['**/*.js'],
    ...jsdoc.configs['flat/recommended-error'],
  },
  {
    files: ['**/*.ts'],
    ...jsdoc.configs['flat/recommended-typescript-error'],
  },
  // svelte
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteEslintParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      // TODO: In progress for Svelte 5
      // https://github.com/sveltejs/eslint-plugin-svelte/issues/652
      'svelte/valid-compile': 'off',
    },
  },
  eslintConfigPrettier,
  {
    ignores: ['**/.svelte-kit/', '**/$generated/'],
  },
];
