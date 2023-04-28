/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/svelte-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
