import type { Meta, StoryObj } from '@storybook/react';

import { LocationPane } from './index';
import type { Location } from '@typeDefs/location';
import type { Box } from '@typeDefs/box';
import type { Item } from '@typeDefs/item'; // Import Item type

// Mock Data
const mockLocation: Location = {
  id: 'loc-1',
  name: 'Garage',
  slug: 'garage',
  spaceId: 'space-1',
  address: '123 Storage Way, Boxville, ST 45678',
  type: 'Storage Unit',
  dateAdded: new Date(),
};

// Helper to create mock items
const createMockItem = (id: string, name: string, boxId: string): Item => ({
  id,
  name,
  slug: name.toLowerCase().replace(/ /g, '-'), // Generate simple slug
  boxId,
  locationId: null, // Assuming items are primarily in boxes for this mock
  dateAdded: new Date(),
  quantity: 1,
  // Add other required Item fields with default/mock values if needed
});

const mockBoxes: Box[] = [
  {
    id: 'box-1',
    name: 'Kitchen Stuff',
    slug: 'kitchen-stuff',
    locationId: 'loc-1',
    description: 'Plates, bowls, cutlery',
    sealed: false,
    dateAdded: new Date(),
    colour: 'blue',
    items: [
      createMockItem('item-1', 'Plate', 'box-1'),
      createMockItem('item-2', 'Bowl', 'box-1'),
      createMockItem('item-3', 'Fork', 'box-1'),
    ],
    room: 'Kitchen Area' // Added room based on BoxPreview props
  },
  {
    id: 'box-2',
    name: 'Winter Clothes',
    slug: 'winter-clothes',
    locationId: 'loc-1',
    sealed: true,
    dateAdded: new Date(),
    colour: 'red',
    items: [
      createMockItem('item-4', 'Scarf', 'box-2'),
      createMockItem('item-5', 'Hat', 'box-2'),
    ],
    room: 'Wardrobe Area' // Added room based on BoxPreview props
  },
  {
    id: 'box-3',
    name: 'Books',
    slug: 'books',
    locationId: 'loc-1',
    sealed: false,
    dateAdded: new Date(),
    colour: 'green',
    items: [
      createMockItem('item-6', 'Novel', 'box-3'),
      createMockItem('item-7', 'Textbook', 'box-3'),
      createMockItem('item-8', 'Cookbook', 'box-3'),
      createMockItem('item-9', 'Magazine', 'box-3'),
    ],
    room: 'Study Area' // Added room based on BoxPreview props
  },
];

// CSF3 Definition using Meta
const meta: Meta<typeof LocationPane> = {
  component: LocationPane,
  tags: ['autodocs'],
};
export default meta;

// Define the Story type
type Story = StoryObj<typeof LocationPane>;

// Default Story
export const Default: Story = {
  args: {
    locationData: mockLocation,
    boxes: mockBoxes,
  },
};

// Empty State Story
export const Empty: Story = {
  args: {
    locationData: {
      ...mockLocation,
      name: 'Empty Shed',
      address: '456 Nowhere Lane',
    },
    boxes: [],
  },
};

// Story with No Address
export const NoAddress: Story = {
  args: {
    locationData: {
      ...mockLocation,
      name: 'Upstairs Closet',
      address: undefined, // Ensure address is undefined
    },
    boxes: mockBoxes.slice(0, 1), // Show just one box
  },
};
