import type { Meta, StoryObj } from '@storybook/react';
import Search from './index';

const meta: Meta<typeof Search> = {
  component: Search,
  args: {
    name: 'search',
    placeholder: 'Search'
  },
  argTypes: {
    onSubmit: { action: 'onSubmit' }
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {};
