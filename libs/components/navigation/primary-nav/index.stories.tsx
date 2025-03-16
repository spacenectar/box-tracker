import type { Meta, StoryObj } from '@storybook/react';
import { PrimaryNav } from './index';
import { ClerkProvider } from '@clerk/nextjs';

const meta: Meta<typeof PrimaryNav> = {
  component: PrimaryNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PrimaryNav>;

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
      authId: 'auth_123',
      username: 'johndoe',
      subscriber: false,
      dateRegistered: new Date(),
      dateLastLoggedIn: new Date(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      imageUrl: '',
    },
  },
};
