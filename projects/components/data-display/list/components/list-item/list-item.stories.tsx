import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';

import { ListItem } from './index';
import { List } from '../../index';

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  parameters: {
    previewLayout: 'vertical',
    controls: { exclude: ['onClick'] }
  },
  args: {
    children: 'List item',
    onClick: undefined
  },
  argTypes: {
    isActive: {
      control: {
        type: 'boolean'
      }
    },
    isLoading: {
      control: {
        type: 'boolean'
      }
    },
    type: {
      control: {
        type: 'select'
      },
      options: ['ordered', 'unordered', 'none']
    }
  }
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  decorators: [(Story) => <List>{Story()}</List>]
};

export const IsActive: Story = {
  args: {
    isActive: true
  },
  decorators: [(Story) => <List>{Story()}</List>],
  play: async ({ canvasElement, step }) => {
    const listItem = within(canvasElement).getByRole('listitem');
    await step('The list item has an "active" class', async () => {
      // Expect the list item to be active
      expect(listItem.getAttribute('class')).toContain('active');
    });
  }
};

export const IsClickable: Story = {
  args: {
    onClick: action('onClick')
  },
  decorators: [(Story) => <List>{Story()}</List>],
  play: async ({ canvasElement, step }) => {
    const listItem = within(canvasElement).getByRole('listitem');
    await step('The list item has a "clickable" class', async () => {
      // Expect the list item to be active
      expect(listItem.getAttribute('class')).toContain('clickable');
    });
  }
};

export const IsInOrderedList: Story = {
  decorators: [(Story) => <List type="ordered">{Story()}</List>],
  play: async ({ canvasElement, step }) => {
    const list = within(canvasElement).getByRole('list');
    await step('The list is rendered as an OL', async () => {
      // Expect the list to be an ordered list
      expect(list.tagName).toBe('OL');
    });
  }
};

export const IsInUnorderedList: Story = {
  decorators: [(Story) => <List type="unordered">{Story()}</List>],
  play: async ({ canvasElement, step }) => {
    const list = within(canvasElement).getByRole('list');
    await step('The list is rendered as an UL', async () => {
      // Expect the list to be an unordered list
      expect(list.tagName).toBe('UL');
    });
  }
};
