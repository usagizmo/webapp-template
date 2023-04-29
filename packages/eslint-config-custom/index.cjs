module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:svelte/recommended',
    'plugin:import/recommended',
    'plugin:jsdoc/recommended-error',
    'turbo',
    'prettier',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },

  plugins: ['unused-imports', 'jsdoc'],
  rules: {
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'import/no-unresolved': 'off', // It's hard to solve...
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: '$*/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '$houdini',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
  },
};
