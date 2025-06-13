import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import unusedImports from 'eslint-plugin-unused-imports';
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
    files: ['**/*.js', '**/*.ts', '**/*.svelte.ts'],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/check-access': 'error',
      'jsdoc/check-alignment': 'error',
    },
  },
  // unused-imports
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  // svelte
  {
    files: ['**/*.svelte'],
    ignores: ['**/*.svelte.js', '**/*.svelte.ts'],
    languageOptions: {
      parser: svelteEslintParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.svelte.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  eslintConfigPrettier,
  {
    ignores: ['**/*.min.*', '**/.svelte-kit/', '**/$generated/'],
  },
];
