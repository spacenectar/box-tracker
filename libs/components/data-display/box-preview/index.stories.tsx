import type { Meta, StoryObj } from '@storybook/react';

import BoxPreview from './index';

// Use the same color choices as defined in the component
enum ColourChoices {
  ORANGE = 'orange',
  BLUE = 'blue',
  TURQUOISE = 'turquoise',
  RED = 'red',
  PINK = 'pink',
  INDIGO = 'indigo',
  PURPLE = 'purple',
  GREEN = 'green',
  BROWN = 'brown',
  HOTPINK = 'hotpink'
}

const meta: Meta<typeof BoxPreview> = {
  component: BoxPreview,
  args: {
    boxNumber: 1,
    location: 'Kitchen',
    itemNames: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    itemCount: 33,
    filled: 20,
    sealed: false,
    colour: ColourChoices.BLUE
  },
  argTypes: {
    colour: {
      control: {
        type: 'select',
        options: Object.values(ColourChoices)
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
    colour: ColourChoices.ORANGE
  }
};

export const RedColour: Story = {
  args: {
    colour: ColourChoices.RED
  }
};

export const GreenColour: Story = {
  args: {
    colour: ColourChoices.GREEN
  }
};
