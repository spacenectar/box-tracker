import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './index';
import icons from './components';

const meta: Meta<typeof Icon> = {
  component: Icon,
  args: {
    use: 'edit',
    size: 50
  },
  argTypes: {
    use: {
      control: {
        type: 'select',
        options: Object.keys(icons)
      }
    },
    fill: {
      control: {
        type: 'color'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {};

export const CustomFill = {
  args: {
    fill: 'rebeccapurple'
  }
};
