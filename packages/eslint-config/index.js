import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import svelteEslintParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

export const base = [
  js.configs.recommended,
  // Import sorting
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  // Unused imports
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
  // Test files
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-description': 'off',
    },
  },
  // Config files
  {
    files: [
      '**/*.config.{js,ts}',
      '**/vite.config.{js,ts}',
      '**/svelte.config.{js,ts}',
      '**/eslint.config.{js,ts}',
    ],
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },
  eslintConfigPrettier,
  {
    ignores: [
      '**/*.min.*',
      '**/.svelte-kit/',
      '**/dist/',
      '**/build/',
      '**/$generated/',
      '**/node_modules/',
      '**/.DS_Store',
    ],
  },
];

export const node = [
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      globals: globals.node,
    },
    ...jsdoc.configs['flat/recommended-error'],
  },
];

export const browser = [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.browser,
    },
    ...jsdoc.configs['flat/recommended-error'],
  },
];

const typescriptCommonRules = {
  'jsdoc/require-returns-type': 'off',
  'jsdoc/require-param-type': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],
};

export const typescript = [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores: ['**/*.svelte.ts', '**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    ...jsdoc.configs['flat/recommended-typescript-error'],
    rules: typescriptCommonRules,
  },
];

export const svelte = [
  ...typescript,
  ...eslintPluginSvelte.configs['flat/recommended'],
  ...eslintPluginSvelte.configs['flat/prettier'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      globals: globals.browser,
      parser: svelteEslintParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.svelte.ts'],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
    },
    ...jsdoc.configs['flat/recommended-typescript-error'],
    rules: typescriptCommonRules,
  },
];
