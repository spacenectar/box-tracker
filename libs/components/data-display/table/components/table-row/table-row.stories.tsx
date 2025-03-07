import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// Import components
import { TableRow } from './index';

const meta: Meta<typeof TableRow> = {
  component: TableRow,
  // parameters: {
  //   worksWith: 'TableFactory'
  // },
  decorators: [
    (Story) => (
      <table style={{ width: '100%' }}>
        <tbody>{Story()}</tbody>
      </table>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof TableRow>;

export const Default: Story = {
  args: {
    children: <td>Table Cell contents</td>
  }
};

export const ActiveRow: Story = {
  args: {
    ...Default.args,
    active: true
  }
};

export const SelectableRow: Story = {
  args: {
    ...Default.args,
    onClick: action('Row clicked')
  }
};
