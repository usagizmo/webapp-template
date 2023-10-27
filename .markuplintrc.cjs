module.exports = {
  parser: {
    '\\.svelte$': '@markuplint/svelte-parser',
  },
  extends: ['markuplint:recommended'],
  rules: {
    'character-reference': false,
    'ineffective-attr': false,
    'label-has-control': false,
    'require-accessible-name': false,
  },
  overrides: {
    './apps/web/src/routes/CommentForm.svelte': {
      nodeRules: [
        {
          selector: 'img',
          rules: {
            'invalid-attr': {
              options: {
                allowAttrs: ['src', 'alt'], // Without `width` and `height`
              },
            },
          },
        },
      ],
    },
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
