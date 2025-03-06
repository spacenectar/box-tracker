import type { Meta, StoryObj } from '@storybook/react';
import Page from './page';

const meta: Meta<typeof Page> = {
  component: Page,
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {}
};
