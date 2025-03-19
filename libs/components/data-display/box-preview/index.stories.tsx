import type { Meta, StoryObj } from '@storybook/react';

import BoxPreview from './index';

const meta: Meta<typeof BoxPreview> = {
  component: BoxPreview,
  args: {
    name: "Box 1",
    room: 'Kitchen',
    itemNames: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    itemCount: 33,
    filled: 20,
    sealed: false,
    colour: 'hotpink'
  },
  argTypes: {
    colour: {
      control: {
        type: 'select',
        options: ['orange',  'blue',  'turquoise', 'red', 'pink',  'indigo',  'purple',  'green',  'brown', 'hotpink']
      }
    }
  },
  parameters: {
    docs: {
      story: {
        inline: true,
        hideTitle: true
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof BoxPreview>;

export const Default: Story = {};

export const Sealed: Story = {
  args: {
    sealed: true
  }
};

export const HighlyFilled: Story = {
  args: {
    filled: 90
  }
};

export const OrangeColour: Story = {
  args: {
    colour: 'orange'
  }
};

export const RedColour: Story = {
  args: {
    colour: 'red'
  }
};

export const GreenColour: Story = {
  args: {
    colour: 'green'
  }
};
