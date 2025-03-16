import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CheckboxGroup } from './index';

import options from '@mocks/options';

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  args: {
    options,
    name: 'form-group',
    groupLabel: 'Checkbox group',
    onChange: (e) => action('Selected options:')(e.target.value)
  },
  tags: ['autodocs'],
  parameters: {
    worksWith: 'InputFactory'
  }
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {};

export const VerticalLayout: Story = {
  args: {
    orientation: 'vertical'
  }
};

export const DefaultChecked: Story = {
  args: {
    name: 'form-group-checked',
    options: [
      ...options,
      {
        label: 'Option 4',
        value: '4',
        checked: true
      }
    ]
  }
};

export const DisabledOption: Story = {
  args: {
    name: 'form-group-disabled',
    options: [
      ...options,
      {
        label: 'Option 4',
        value: '4',
        disabled: true
      }
    ]
  }
};
