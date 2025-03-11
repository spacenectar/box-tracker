import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './index';

const meta: Meta<typeof Navigation> = {
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

const navItems = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

export const Default: Story = {
  args: {
    navItems,
  },
};

export const WithUser: Story = {
  args: {
    navItems,
    user: {
      id: '1',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      imageUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
};
