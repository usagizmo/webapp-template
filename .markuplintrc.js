export default {
  parser: {
    '\\.svelte$': '@markuplint/svelte-parser',
  },
  extends: ['markuplint:recommended'],
  excludeFiles: [
    // TODO: Once the overrides option is fixed, remove these lines
    // ref. https://github.com/markuplint/markuplint/issues/1119
    './apps/web/src/app.html',
    // TODO: for Svelte 5 (preview)
    './apps/web/**/*.svelte',
  ],
  rules: {
    'character-reference': false,
    'ineffective-attr': false,
    'label-has-control': false,
    'require-accessible-name': false,
    'use-list': false,
  },
  nodeRules: [
    // For Svelte
    {
      selector: 'textarea',
      rules: {
        'invalid-attr': {
          options: {
            allowAttrs: ['value'],
          },
        },
      },
    },
    {
      selector: 'input[type="file"]',
      rules: {
        'invalid-attr': {
          options: {
            allowAttrs: ['files'],
          },
        },
      },
    },
  ],
};
