import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ManageSpaces } from './index';
import { spaceApi } from '@/lib/services/space';
import { Space } from '@typeDefs/space';
import { Location } from '@typeDefs/location';
import { useEffect } from 'react';

// Mock data
const mockSpaces: Space[] = [
  {
    id: 'space-1',
    name: 'My Space',
    slug: 'my-space',
    locations: [
      { id: 'loc-1', name:'Address 1', slug: 'address-1', spaceId: 'space-1' } as Location,
      { id: 'loc-2', name: 'Address 2', slug: 'address-2', spaceId: 'space-1' } as Location
    ]
  },
  {
    id: 'space-2',
    name: 'Another Space',
    slug: 'another-space',
    locations: [
      { id: 'loc-3', name: 'Address 3', slug: 'address-3', spaceId: 'space-2' } as Location
    ]
  }
];

// Create a wrapper component that initializes the RTK Query cache
const SpaceApiProvider = ({ children }: { children: React.ReactNode }) => {
  // Create a mock store with auth state to prevent the token error
  const store = configureStore({
    reducer: {
      [spaceApi.reducerPath]: spaceApi.reducer,
      // Add mock auth reducer to provide the token
      auth: (state = { token: 'mock-token' }) => state
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(spaceApi.middleware),
  });

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

// Create a component that pre-fetches the data
const SpaceDataWrapper = ({ children }: { children: React.ReactNode }) => {
  // Use the query hook with skip: false to ensure it runs immediately
  const { refetch, isSuccess, isError, error } = spaceApi.endpoints.getSpaces.useQuery(undefined, {
    skip: false,
    // This forces RTK Query to always refetch from the network
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    // Force a refetch to ensure data is loaded
    refetch();
    
    // Log query status for debugging
    if (isSuccess) {
      console.log('Query succeeded');
    }
    if (isError) {
      console.error('Query failed:', error);
    }
  }, [refetch, isSuccess, isError, error]);

  return <>{children}</>;
};

// Create a decorator to wrap components with Redux Provider and prefetch data
const withReduxProvider = (Story: React.ComponentType) => (
  <SpaceApiProvider>
    <SpaceDataWrapper>
      <Story />
    </SpaceDataWrapper>
  </SpaceApiProvider>
);

// Define the handlers outside the meta to reuse them
const handlers = [
  // GET spaces
  http.get('/api/v1/space', () => {
    console.log('MSW intercepted GET /api/v1/space request, returning mock data');
    return HttpResponse.json(mockSpaces);
  }),
  
  // DELETE space
  http.delete('/api/v1/space/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ success: true, id });
  }),
  
  // UPDATE space
  http.put('/api/v1/space/:id', async ({ request, params }) => {
    const { id } = params;
    const data = await request.json();
    const { name } = data as { name: string };
    return HttpResponse.json({ 
      id, 
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
  })
];

const meta: Meta<typeof ManageSpaces> = {
  title: 'Partials/ManageSpaces',
  component: ManageSpaces,
  decorators: [withReduxProvider],
  parameters: {
    msw: {
      handlers
    }
  }
};

export default meta;
type Story = StoryObj<typeof ManageSpaces>;

// Default story showing the list of spaces
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for the spaces to load using findBy which automatically waits
    const mySpace = await canvas.findByText('My Space');
    expect(mySpace).toBeInTheDocument();
    
    const anotherSpace = await canvas.findByText('Another Space');
    expect(anotherSpace).toBeInTheDocument();
    
    // Check if the space details are displayed
    const twoLocations = await canvas.findByText('2 locations');
    expect(twoLocations).toBeInTheDocument();
    
    const oneLocation = await canvas.findByText('1 locations');
    expect(oneLocation).toBeInTheDocument();
  }
};

// Story for editing a space
export const EditSpace: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for the spaces to load using findBy which automatically waits
    const mySpace = await canvas.findByText('My Space');
    expect(mySpace).toBeInTheDocument();
    
    // Find and click the edit button for the first space
    const editButtons = await canvas.findAllByLabelText(/Edit .*/);
    await userEvent.click(editButtons[0]);
    
    // Check if the edit modal is open
    await expect(canvas.getByText('Edit Space')).toBeInTheDocument();
    
    // Change the space name
    const input = canvas.getByLabelText('Space Name');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated Space');
    
    // Click the save button
    await userEvent.click(canvas.getByText('Save Changes'));
  }
};

// Story for deleting a space
export const DeleteSpace: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for the spaces to load using findBy which automatically waits
    const anotherSpace = await canvas.findByText('Another Space');
    expect(anotherSpace).toBeInTheDocument();
    
    // Find and click the delete button for the second space
    const deleteButtons = await canvas.findAllByText('Delete');
    await userEvent.click(deleteButtons[1]);
    
    // Check if the delete confirmation modal is open
    await expect(canvas.getByText('Delete Space')).toBeInTheDocument(); // This is the modal title
    await expect(canvas.getByText(/Are you sure you want to delete the space "Another Space"/)).toBeInTheDocument();
    
    // Click the delete confirmation button
    const deleteButton = canvas.getByText('Confirm deletion');
    await userEvent.click(deleteButton);
  }
};

// Story for empty state
export const EmptyState: Story = {
  // Use the same decorator as the other stories to ensure consistent auth state
  decorators: [withReduxProvider],
  parameters: {
    msw: {
      handlers: [
        http.get('/api/v1/space', () => {
          console.log('MSW intercepted GET /api/v1/space request for EmptyState, returning empty array');
          return HttpResponse.json([]);
        })
      ]
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check if the empty state message is displayed - findBy automatically waits
    const emptyStateMessage = await canvas.findByText(
      "You don't have any spaces yet. Create your first space to get started."
    );
    expect(emptyStateMessage).toBeInTheDocument();
  }
};
