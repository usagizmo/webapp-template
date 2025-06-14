/** @type {import('@markuplint/ml-config').Config} */
export default {
  extends: ['markuplint:recommended-static-html'],
  rules: {
    'use-list': false,
  },
  nodeRules: [
    {
      selector: 'link, code',
      rules: {
        'character-reference': false,
      },
    },
  ],
};
