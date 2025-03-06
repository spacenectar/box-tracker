import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '../next.config.js',
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
            },
          }
        },
      ],
    });
    return config;
  },
};

export default config;
