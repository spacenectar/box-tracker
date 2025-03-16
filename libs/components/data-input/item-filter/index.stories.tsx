import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import ItemFilter from './index';

type Item = {
  id: number;
  name: string;
};

const items = [
  {
    id: 1,
    name: 'Red Panda'
  },
  {
    id: 2,
    name: 'Otter'
  },
  {
    id: 3,
    name: 'Wolf'
  },
  {
    id: 4,
    name: 'Cat'
  },
  {
    id: 5,
    name: 'Raccoon'
  },
  {
    id: 6,
    name: 'Panda'
  }
];

const meta: Meta = {
  component: ItemFilter,
  args: {
    node: 'name',
    label: 'Filter Items by name',
    items
  },
  parameters: {
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ItemFilter>;

export const Default: Story = {
  render: (args) => {
    const [ItemList, setItemList] = useState<Item[]>(args.items as Item[]);

    return (
      <>
        <ItemFilter
          node={args.node}
          label={args.label}
          items={args.items}
          itemUpdater={(updatedItems) => {
            const recastItems = updatedItems as Item[];
            setItemList(recastItems);
            action('itemUpdater')(recastItems.map((item: Item) => item.name));
          }}
        />
        <br />
        <hr />
        <br />
        <ul data-testid="item-list">
          {ItemList.map((item: Item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const input = within(canvasElement).getByLabelText(
      'Filter Items by name'
    ) as HTMLInputElement;

    const itemList = within(canvasElement).getByTestId('item-list');

    await step('All items are visible', () => {
      expect(itemList.children).toHaveLength(6);
      expect(itemList).toHaveTextContent('Red Panda');
      expect(itemList).toHaveTextContent('Otter');
      expect(itemList).toHaveTextContent('Wolf');
      expect(itemList).toHaveTextContent('Cat');
      expect(itemList).toHaveTextContent('Raccoon');
      expect(itemList).toHaveTextContent('Panda');
    });

    await step('Filtering by "Raccoon" returns only Raccoon', async () => {
      await userEvent.type(input, 'Raccoon');
      expect(input.value).toBe('Raccoon');
      expect(itemList.children).toHaveLength(1);
      expect(itemList).toHaveTextContent('Raccoon');
    });

    await step('Filtering by "Panda" returns Panda and Red Panda', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, 'Panda');
      expect(input.value).toBe('Panda');

      expect(itemList.children).toHaveLength(2);

      expect(itemList).toHaveTextContent('Panda');
      expect(itemList).toHaveTextContent('Red Panda');
    });

    await step('Clearing the input restores all items', async () => {
      await userEvent.clear(input);
      expect(input.value).toBe('');

      expect(itemList.children).toHaveLength(6);

      expect(itemList).toHaveTextContent('Red Panda');
      expect(itemList).toHaveTextContent('Otter');
      expect(itemList).toHaveTextContent('Wolf');
      expect(itemList).toHaveTextContent('Cat');
      expect(itemList).toHaveTextContent('Raccoon');
      expect(itemList).toHaveTextContent('Panda');
    });
  }
};
