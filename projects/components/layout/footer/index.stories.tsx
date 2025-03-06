import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import Footer from './index';

const meta: Meta<typeof Footer> = {
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Check if the logo is rendered
    await expect(canvas.getByAltText('Box Tracker Logo')).toBeInTheDocument();
  },
};
