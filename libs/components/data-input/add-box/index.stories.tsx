import type { Meta, StoryObj } from '@storybook/react';

import { AddBox } from './index';

// Define Meta configuration without a title
const meta: Meta<typeof AddBox> = {
  component: AddBox,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

// Define the Story type
type Story = StoryObj<typeof AddBox>;

// Default Story
export const Default: Story = {};

// Example Disabled Story (optional)
export const Disabled: Story = {
  args: {
    disabled: true,
  }
};
