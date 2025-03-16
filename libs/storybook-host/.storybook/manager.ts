import { addons } from '@storybook/manager-api';

import startCase from 'lodash/startCase.js';

import jackanoryTheme from './jackanory-theme';

addons.setConfig({
  sidebar: {
    renderLabel: ({ name, type }) => (type === 'story' ? name : startCase(name))
  },
  theme: jackanoryTheme
});
