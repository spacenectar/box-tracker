import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '../../webapp/next.config.js',
    }
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
    'msw-storybook-addon'
  ],
  staticDirs: [
    {
      from: '../public',
      to: '/'
    },
  ],
  stories: [
     {
      // 👇 The directory field sets the directory your stories
      directory: '../../components/.storybook/.docs',
      // 👇 The titlePrefix field will generate automatic titles for your stories
      titlePrefix: 'Documentation',
      // 👇 Storybook will load all files that contain the mdx extension
      files: '**/*.mdx'
    },
    {
      titlePrefix: 'Library',
      directory: '../../components/',
      files: '**/*.@(mdx|stories.@(ts|tsx))',
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
