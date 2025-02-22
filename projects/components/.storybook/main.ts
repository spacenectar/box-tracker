import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '../../webapp/next.config.js',
    }
  },
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-interactions',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    'msw-storybook-addon'
  ],
  staticDirs: [
    {
      from: '../public',
      to: '/'
    },
  ],
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@theme': path.resolve(__dirname, '../../theme'),
    };
    return config;
  },
};

export default config;
