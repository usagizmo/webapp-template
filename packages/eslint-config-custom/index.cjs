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
    ecmaVersion: 2022,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2022: true,
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
        pathGroups: [
          {
            pattern: '$*/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '$houdini',
            group: 'parent',
            position: 'before',
          },
        ],
      },
    ],
    'jsdoc/require-jsdoc': [
      'error',
      {
        require: {
          MethodDefinition: true,
        },
      },
    ],
    'jsdoc/require-hyphen-before-param-description': 1,
    // It's hard to solve...
    'jsdoc/valid-types': 0,
    'jsdoc/no-undefined-types': 0,
    'jsdoc/check-tag-names': 0,
  },
};
