module.exports = {
  root: true,
  extends: ['@repo/eslint-config/javascript.cjs'],
  overrides: [
    {
      files: ['*.ts', '*.svelte'],
      extends: ['@repo/eslint-config/typescript.cjs'],
    },
  ],
};
