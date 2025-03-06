import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
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
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '../../../projects/webapp/next.config.ts'
    }
  },
  staticDirs: [
    {
      from: '../public',
      to: '/'
    },
  ]
};

export default config;
