import type { Meta, StoryObj } from '@storybook/react';

// Import components
import { TableCell } from './index';

const meta: Meta<typeof TableCell> = {
  component: TableCell,
  args: {
    children: <span>Table Cell contents</span>,
    contextHeading: 'The context heading'
  },
  // parameters: {
  //   worksWith: 'TableFactory'
  // },
  decorators: [
    (Story) => (
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>{Story()}</tr>
        </tbody>
      </table>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof TableCell>;

export const Default: Story = {};

export const RenderTh: Story = {
  args: {
    th: true
  }
};
