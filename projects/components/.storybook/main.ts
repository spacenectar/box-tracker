import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: [ {
      // 👇 The directory field sets the directory your stories
      directory: './.docs',
      // 👇 The titlePrefix field will generate automatic titles for your stories
      titlePrefix: 'Documentation',
      // 👇 Storybook will load all files that contain the mdx extension
      files: '**/*.mdx'
    }, '../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
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
    'msw-storybook-addon',
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
    config?.module?.rules?.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { modules: true },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sassOptions: {
              outputStyle: "expanded",
              additionalData: `
                @use '@theme/vars' as *;
                @use '@theme/breakpoints' as bp;
                @use '@theme/typography' as type;
                @use '@theme/colours' as col;
                @use '@theme/utilities' as util;
                @use '@theme/animations' as animate;
              `,
            }
          }
        },
      ],
    });
    return config;
  },
};

export default config;
