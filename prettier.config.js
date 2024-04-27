/** @type {import('prettier').Config}  */
const config = {
  singleQuote: true,
  printWidth: 100,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  tailwindFunctions: ['$derived'],
};

export default config;
