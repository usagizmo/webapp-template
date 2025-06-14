export default {
  extends: ['markuplint:recommended-svelte'],
  parser: {
    '\\.svelte$': '@markuplint/svelte-parser',
    '\\.html$': '@markuplint/svelte-parser/kit',
  },
  specs: {
    '\\.svelte$': '@markuplint/svelte-spec',
  },
  rules: {
    'no-orphaned-end-tag': false,
    'label-has-control': false,
    'ineffective-attr': false,
  },
  overrideMode: 'merge',
  overrides: {
    '**/app.html': {
      rules: {
        'required-h1': false,
      },
    },
  },
  nodeRules: [
    {
      selector: 'img',
      rules: {
        'required-attr': {
          options: {
            ignoreAttrs: ['width', 'height'],
          },
        },
      },
    },
  ],
  // Custom component mapping example
  pretenders: [
    // {
    //   selector: 'CustomList',
    //   as: 'ul',
    // },
    // {
    //   selector: 'CustomListItem',
    //   as: 'li',
    // },
  ],
};
