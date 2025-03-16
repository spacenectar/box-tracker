import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

// Import component files
import Modal from './index';
import { DialogBox } from '../../feedback/dialog-box';
import { Button } from '../../data-input/button';

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    size: 'md',
    modalName: 'Test modal'
  },
  argTypes: {
    size: {
      control: {
        type: 'select'
      },
      options: ['sm', 'md', 'lg', 'xl']
    },
    isOpen: {
      control: {
        type: 'boolean'
      }
    },
    isAlert: {
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: ({ ...args }) => {
    const [showModal, setShowModal] = useState(false);

    const confirmAction = () => {
      action('confirmAction')();
      setShowModal(false);
    };

    const cancelAction = () => {
      action('cancelAction')();
      setShowModal(false);
    };

    return (
      <>
        <Modal
          {...args}
          isOpen={showModal}
          onDismiss={() => setShowModal(false)}
        >
          <DialogBox
            title="Test title"
            confirmAction={confirmAction}
            cancelAction={cancelAction}
            fitContainer
          />
        </Modal>
        <Button onClick={() => setShowModal(true)}>Show modal</Button>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const button = within(canvasElement).getByRole('button');

    await step('The Modal opens when the button is clicked', async () => {
      const body = canvasElement.ownerDocument.body;
      await userEvent.click(button);
      const modal = await within(body).findByTestId('modal');
      await expect(modal).toBeInTheDocument();
    });

    await step(
      'The Modal closes when the close button is clicked',
      async () => {
        const body = canvasElement.ownerDocument.body;
        const modal = await within(body).findByTestId('modal');
        const closeButton = await within(body).findAllByRole('button', {
          name: 'Close'
        });
        await userEvent.click(closeButton[0]);
        await expect(modal).not.toBeInTheDocument();
      }
    );
  }
};

export const AlertModal: Story = {
  render: Default.render,
  args: {
    isAlert: true
  }
};

export const SmallModal: Story = {
  render: Default.render,
  args: {
    size: 'sm'
  }
};

export const LargeModal: Story = {
  render: Default.render,
  args: {
    size: 'lg'
  }
};

export const ExtraLargeModal: Story = {
  render: Default.render,
  args: {
    size: 'xl'
  }
};
