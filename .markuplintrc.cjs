module.exports = {
  parser: {
    '\\.svelte$': '@markuplint/svelte-parser',
  },
  extends: ['markuplint:recommended'],
  excludeFiles: [
    './apps/web/src/app.html',
    './apps/web/src/routes/Comments.svelte', // TODO: remove this
  ],
  rules: {
    'character-reference': false,
    'ineffective-attr': false,
    'label-has-control': false,
    'require-accessible-name': false,
  },
};
