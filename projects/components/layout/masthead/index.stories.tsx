import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import Masthead from './index';

const meta: Meta<typeof Masthead> = {
  component: Masthead,
};

export default meta;

type Story = StoryObj<typeof Masthead>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Check if the logo is rendered
    await expect(canvas.getByAltText('Box Tracker Logo')).toBeInTheDocument();
    // Check if the navigation links are rendered
    await expect(canvas.getByText('Home')).toBeInTheDocument();
    await expect(canvas.getByText('About')).toBeInTheDocument();
    await expect(canvas.getByText('Contact')).toBeInTheDocument();
  },
};
