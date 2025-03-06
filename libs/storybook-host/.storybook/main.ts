import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '../../../projects/webapp/next.config.ts'
    }
  },
  stories: [
     {
      directory: './.docs',
      titlePrefix: 'Documentation',
      files: '**/*.mdx'
    },
    {
      titlePrefix: 'Library',
      directory: '../../../projects/components',
      files: '**/*.@(mdx|stories.@(ts|tsx))',
    },
    {
      titlePrefix: 'Webapp',
      directory: '../../../projects/webapp',
      files: '**/*.@(mdx|stories.@(ts|tsx))',
    }
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
    'msw-storybook-addon'
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },
  staticDirs: [
    {
      from: '../public',
      to: '/'
    },
    {
      from: '../../mocks',
      to: '/mocks'
    }
  ],
  webpackFinal: async (config) => {
  // Ensure config.resolve exists before assigning
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...config?.resolve?.alias,
    '@theme': path.resolve(__dirname, '../../../libs/theme'),
  };

  // NOTE: I don't care about the use of 'any' here as it's just a Storybook config
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?.module?.rules?.forEach((rule: any) => {
    if (rule.test && rule.test.toString().includes('scss') && Array.isArray(rule.use)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rule.use.forEach((loader: any) => {
        if (loader.loader && loader.loader.includes('sass-loader')) {
          loader.options = {
            ...loader.options,
            additionalData: `
              @use '@theme/vars' as *;
              @use '@theme/breakpoints' as bp;
              @use '@theme/typography' as type;
              @use '@theme/colours' as col;
              @use '@theme/utilities' as util;
              @use '@theme/animations' as animate;
            `
          };
        }
      });
    }
  });
  return config;
},
};

export default config;
