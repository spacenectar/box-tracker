import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useArgs } from '@storybook/preview-api';
// Import component files
import Pagination from './index';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  parameters: {
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    page: 1,
    count: 10
  },
  render: () => {
    const [args, updateArgs] = useArgs();
    return (
      <Pagination
        count={args.count}
        page={args.page}
        onChange={(page) => {
          action('Go to page')(page);
          updateArgs({ page });
        }}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    const pagination = within(canvasElement).getByRole('navigation');
    const buttons = within(pagination).getAllByRole('button');
    const previousButton = buttons[0];
    const nextButton = buttons[buttons.length - 1];

    await step(
      'Pagination is rendered with the correct pages and the 1st page is selected',
      () => {
        expect(buttons.length).toEqual(9);
        expect(buttons[1]).toHaveAttribute('aria-current');
        expect(buttons[1]).toHaveTextContent('1');
        expect(buttons[2]).toHaveTextContent('2');
        expect(buttons[3]).toHaveTextContent('3');
        expect(buttons[4]).toHaveTextContent('4');
        expect(buttons[5]).toHaveTextContent('5');
        expect(buttons[6]).toHaveTextContent('…');
        expect(buttons[7]).toHaveTextContent('10');
      }
    );

    await step(
      'Previous button is disabled on first page and has correct label',
      () => {
        expect(previousButton).toBeDisabled();
        expect(previousButton).toHaveAttribute(
          'aria-label',
          'Go to previous page'
        );
      }
    );

    await step(
      'Next button is enabled on first page and has correct label',
      () => {
        expect(nextButton).toBeEnabled();
        expect(nextButton).toHaveAttribute('aria-label', 'Go to next page');
      }
    );

    await step('Clicking next button goes to next page', async () => {
      await userEvent.click(nextButton);
      await waitFor(() => expect(buttons[2]).toHaveAttribute('aria-current'));
    });

    await step('Clicking previous button goes to previous page', async () => {
      await userEvent.click(previousButton);
      await waitFor(() => expect(buttons[1]).toHaveAttribute('aria-current'));
    });

    await step('Clicking page button goes to that page', async () => {
      const pageButton = within(pagination).getByText('3');
      await userEvent.click(pageButton);
      await waitFor(() => expect(pageButton).toHaveAttribute('aria-current'));
    });

    await step(
      'Clicking page 5 button changes the button listing',
      async () => {
        await userEvent.click(buttons[5]);
        await waitFor(() => {
          expect(buttons[4]).toHaveAttribute('aria-current');
          expect(buttons[2]).toHaveTextContent('…');
          expect(buttons[3]).toHaveTextContent('4');
          expect(buttons[4]).toHaveTextContent('5');
          expect(buttons[5]).toHaveTextContent('6');
          expect(buttons[6]).toHaveTextContent('…');
          expect(buttons[7]).toHaveTextContent('10');
        });
      }
    );

    await step('Reset to first page', async () => {
      await userEvent.click(buttons[1]);
      await waitFor(() => expect(buttons[1]).toHaveAttribute('aria-current'));
    });
  }
};
