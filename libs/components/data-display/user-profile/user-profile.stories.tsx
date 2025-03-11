import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from './index';
import { User } from '@types/user';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  args: {
    user: {
      id: '1',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      imageUrl: '',
    } as User,
  },
};

export const WithImage: Story = {
  args: {
    user: {
      id: '2',
      username: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      imageUrl: 'https://i.pravatar.cc/300',
    } as User,
  },
};
