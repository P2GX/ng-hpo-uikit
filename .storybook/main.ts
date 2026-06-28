import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  // Explicitly target ONLY the src directory contents
  stories: [
    '../src/lib/**/*.mdx',
    '../src/lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links'
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  // turn off strict external type checking during the indexing pass
  typescript: {
    check: false,
  }
};
export default config;