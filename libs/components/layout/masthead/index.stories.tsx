import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import Masthead from './index';
import { User } from '@types/user';

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
    // Check if the login button is rendered
    await expect(canvas.getByText('Sign in')).toBeInTheDocument();
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      id: '1',
      username: 'JohnDoe1984',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      imageUrl: '/mocks/images/example-user.png',
    } as User,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Check if the user info is rendered
    await expect(canvas.getByText('JohnDoe1984')).toBeInTheDocument();
    // Check if the logout button is rendered
    await expect(canvas.getByText('Sign out')).toBeInTheDocument();
  },
};
