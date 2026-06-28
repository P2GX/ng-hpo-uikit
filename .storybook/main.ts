import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  // Explicitly target ONLY the src directory contents
  stories: [
    '../src/lib/**/*.mdx',
    '../src/lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],

  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/angular',
    options: {},
  },

  // turn off strict external type checking during the indexing pass
  typescript: {
    check: false,
  },

  docs: {
    autodocs: true
  }
};
export default config;